import Custody, { CustodyType } from './models/custody.js';
import Invoice, { InvoiceType } from './models/invoice.js';
import { ModuleName, PURE_GOLD_PRODUCT_DESCRIPTION } from './constants.js';
import Settlement, {
  SettlementDirection,
  SettlementStatus,
} from './models/settlement.js';
import Transaction, { TransactionStatus } from './models/transaction.js';
import {
  generateInvoiceNumber,
  generateQrCode,
  roundValue,
} from './helpers.js';
import { getS3Url, sendResponse } from 'shared/index.js';

import Account from './models/account.js';
import Commission from './models/commission.js';
import CommissionSetting from './models/commissionSetting.js';
import { EventEmitter } from 'events';
import Wallet from './models/wallet.js';
import { getGoldPrice } from './goldPrice.js';
import mongoose from 'mongoose';

class Gold extends EventEmitter {
  constructor() {
    super();
    this.description = PURE_GOLD_PRODUCT_DESCRIPTION;
  }

  noop(tokens) {
    return {};
  }

  async getBalance(accountId) {
    const walletData = await Wallet.aggregate()
      .match({ account: new mongoose.Types.ObjectId(accountId) })
      .group({ _id: null, amount: { $sum: '$redeemable' } });
    return roundValue(walletData[0]?.amount ?? 0);
  }

  buildWalletFilter(accountId, custodianId) {
    const filter = { account: accountId };
    if (custodianId) filter['custodian'] = custodianId;

    return filter;
  }

  async buy({
    accountId,
    custodianId,
    tokens,
    rate = null,
    tax,
    moduleName,
    actionName = '',
    walletUpdates = this.noop,
  }) {
    if (!rate) rate = getGoldPrice().buyPrice;

    const [custodian, commissionSetting] = await Promise.all([
      Account.findById(custodianId),
      CommissionSetting.findOne({ account: custodianId }),
    ]);
    if (!custodian) throw new Error('custodian not found');

    const amountWithoutTax = roundValue(tokens * rate);
    const taxAmount = roundValue(amountWithoutTax * (tax / 100));
    const totalAmount = roundValue(amountWithoutTax + taxAmount);

    const commissionAmount = roundValue(
      amountWithoutTax * (commissionSetting?.custodian?.buy ?? 0)
    );
    const settlementAmount = roundValue(amountWithoutTax - commissionAmount);

    const createdAt = new Date();

    const transaction = new Transaction({
      from: custodianId,
      to: accountId,
      custodian: custodianId,
      rate,
      tokens,
      amount: amountWithoutTax,
      taxAmount,
      grossAmount: totalAmount,
      moduleName,
      actionName,
      status: TransactionStatus.COMPLETED,
      createdAt,
    });

    const commission = new Commission({
      from: custodianId,
      amount: commissionAmount,
      transaction: transaction._id,
      createdAt,
    });

    const settlement = new Settlement({
      direction: SettlementDirection.OUTGOING,
      amount: settlementAmount,
      account: custodianId,
      transaction: transaction._id,
      status: SettlementStatus.PENDING,
      createdAt,
    });

    const invoice = new Invoice({
      invoiceNumber: generateInvoiceNumber(),
      type: InvoiceType.SALE,
      moduleName,
      category: 'custody',
      billFrom: custodianId,
      billTo: accountId,
      items: [
        {
          description: this.description,
          quantity: tokens,
          rate,
          tax,
          taxAmount,
          totalAmount: amountWithoutTax,
        },
      ],
      taxAmount,
      totalAmount,
      transaction: transaction._id,
      settlement: settlement._id,
      createdAt,
    });

    const custody = new Custody({
      type: CustodyType.GIVEN,
      account: accountId,
      custodian: custodianId,
      transaction: transaction._id,
      tokens,
      createdAt,
    });

    // @ts-ignore
    transaction.invoice = invoice._id;

    await transaction.save();
    await commission.save();
    await settlement.save();
    await invoice.save();
    await custody.save();

    const walletUpdate = {};

    switch (moduleName) {
      case ModuleName.INSTANT:
        Object.assign(walletUpdate, {
          redeemable: tokens,
          total: tokens,
          'modules.instant.redeemable': tokens,
          'modules.instant.total': tokens,
        });
        break;
      case ModuleName.GIP:
        Object.assign(walletUpdate, {
          hold: tokens,
          total: tokens,
          'modules.gip.redeemable': tokens,
          'modules.gip.total': tokens,
        });
        break;
    }

    const wallet = await Wallet.findOneAndUpdate(
      { account: accountId, custodian: custodianId },
      {
        $inc: {
          ...walletUpdate,
          ...walletUpdates(tokens),
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    this.emit('buy', { transaction, invoice });

    return {
      transactionId: transaction._id,
      tokens: transaction.tokens,
      rate,
      amount: totalAmount,
      description: this.description,
      invoiceUrl: `/common/invoices/${invoice._id}`,
      certificateUrl: `/common/certificates/${custody._id}`,
      custodian: {
        id: custodian._id,
        name: custodian.name,
        image: custodian.image,
      },
      balance: roundValue(wallet.redeemable, 3),
      createdAt,
    };
  }

  async sell({
    accountId,
    custodianId = null,
    tokens,
    rate = null,
    tax,
    moduleName,
    actionName = '',
    walletUpdates = this.noop,
    settlementHold = false,
  }) {
    if (!rate) rate = getGoldPrice().sellPrice;
    tokens = roundValue(tokens, 3);
    const wallets = await Wallet.find(
      this.buildWalletFilter(accountId, custodianId)
    )
      .lean()
      .populate('custodian')
      .sort({ total: 1, createdAt: 1 });
    const transactions = [];
    const invoices = [];
    const settlements = [];
    const custodies = [];
    const walletUpdateOps = [];
    const custodyReleases = [];

    let tokensToRelease = tokens;
    let totalTokens = 0;
    let date = new Date();

    for (const wallet of wallets) {
      totalTokens += wallet.total;

      if (tokensToRelease === 0) break;
      if (wallet.redeemable === 0) continue;

      const releaseTokens = roundValue(
        wallet.redeemable >= tokensToRelease
          ? tokensToRelease
          : wallet.redeemable,
        3
      );

      const amount = roundValue(releaseTokens * rate);

      tokensToRelease -= releaseTokens;

      const transaction = new Transaction({
        from: accountId,
        to: wallet.custodian._id,
        custodian: wallet.custodian._id,
        rate,
        tokens: releaseTokens,
        amount,
        taxAmount: 0,
        grossAmount: amount,
        moduleName,
        actionName,
        status: TransactionStatus.COMPLETED,
        createdAt: date,
      });

      const custody = new Custody({
        type: CustodyType.RELEASE,
        account: transaction.from,
        custodian: transaction.to,
        transaction: transaction._id,
        tokens: releaseTokens,
        createdAt: date,
      });

      const settlement = new Settlement({
        direction: SettlementDirection.INCOMING,
        amount,
        account: transaction.to,
        transaction: transaction._id,
        status: settlementHold
          ? SettlementStatus.HOLD
          : SettlementStatus.PENDING,
        createdAt: date,
      });

      const subtotal = roundValue(rate * releaseTokens);
      const taxAmount = roundValue(subtotal * (1 + tax / 100));
      const total = roundValue(subtotal + taxAmount);

      // to-do: gst
      const invoice = new Invoice({
        invoiceNumber: generateInvoiceNumber(),
        type: InvoiceType.PURCHASE,
        moduleName,
        category: 'custody',
        billFrom: transaction.to,
        billTo: transaction.from,
        items: [
          {
            description: this.description,
            quantity: releaseTokens,
            tax,
            taxAmount,
            subtotal,
            total,
          },
        ],
        totalAmount: total,
        transaction: transaction._id,
        settlement: settlement._id,
        createdAt: date,
      });

      const walletIncrements = {};

      switch (moduleName) {
        case ModuleName.INSTANT:
          Object.assign(walletIncrements, {
            redeemable: -releaseTokens,
            total: -releaseTokens,
            'modules.instant.redeemable': -releaseTokens,
            'modules.instant.total': -releaseTokens,
          });
          break;
        case ModuleName.GIP:
          Object.assign(walletIncrements, {
            hold: -releaseTokens,
            total: -releaseTokens,
            'modules.gip.hold': -releaseTokens,
            'modules.gip.total': -releaseTokens,
          });
          break;
        case ModuleName.SELL_RESERVE:
          Object.assign(walletIncrements, {
            hold: releaseTokens,
            redeemable: -releaseTokens,
            'modules.reserve.hold': releaseTokens,
            'modules.instant.redeemable': -releaseTokens,
            'modules.reserve.total': releaseTokens,
          });
      }

      walletUpdateOps.push({
        updateOne: {
          filter: { _id: wallet._id },
          update: {
            $inc: {
              ...walletIncrements,
              ...walletUpdates(releaseTokens),
            },
          },
        },
      });

      custodyReleases.push({
        // @ts-ignore
        id: transaction.to,
        transactionId: transaction._id,
        // @ts-ignore
        name: wallet.custodian?.name,
        // @ts-ignore
        image: getS3Url(wallet.custodian?.image),
        tokens: releaseTokens,
        balance: wallet.total - releaseTokens,
        invoiceUrl: `/common/invoices/${invoice._id}`,
        certificateUrl: `/common/certificates/${custody._id}`,
        createdAt: date,
      });

      transactions.push(transaction);
      invoices.push(invoice);
      settlements.push(settlement);
      custodies.push(custody);
    }

    if (tokensToRelease !== 0) {
      throw new Error('you do not have enough balance');
    }

    await Transaction.bulkSave(transactions);
    await Custody.bulkSave(custodies);
    await Invoice.bulkSave(invoices);
    await Settlement.bulkSave(settlements);
    await Wallet.bulkWrite(walletUpdateOps);

    this.emit('sell', { transactions, invoices });

    return {
      amount: roundValue(rate * tokens),
      tokens,
      rate,
      time: 24,
      description: this.description,
      custodyReleases,
      balance: roundValue(totalTokens - tokens, 3),
    };
  }

  // @ts-ignore
  async transfer(from, to, tokens) { }
}

export default new Gold();
