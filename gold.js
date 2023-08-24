import Custody, { CustodyType } from './models/custody.js';
import Invoice, { InvoiceType } from './models/invoice.js';
import {
  ModuleName,
  PURE_GOLD_PRODUCT_DESCRIPTION,
  Variables,
} from './constants.js';
import Settlement, {
  SettlementDirection,
  SettlementStatus,
} from './models/settlement.js';
import Transaction, { TransactionStatus } from './models/transaction.js';
import {
  breakLease,
  buyTokens,
  getWallet,
  selfTransfer,
  sellTokens,
  transferTokens,
} from './bc.js';
import {
  cloneModel,
  generateInvoiceNumber,
  getActionNameToState,
  getTaxBifurcation,
  prefixKeys,
  roundValue,
} from './helpers.js';

import Account from './models/account.js';
import Commission from './models/commission.js';
import { EventEmitter } from 'events';
import WalletTrack from './models/walletTrack.js';
import { getGoldPrice, getGoldPriceSources } from './goldPrice.js';
import { getS3Url } from 'shared/index.js';
import variables from './variables.js';
import Merchant from './models/merchant.js';

class Gold extends EventEmitter {
  constructor() {
    super();
    this.description = PURE_GOLD_PRODUCT_DESCRIPTION;
    this.hsn = '71081300';
  }

  async getBalance(accountId, field = 'redeemable') {
    return getWallet(accountId).then((data) => {
      if (data.walletType === 'merchant' || data.walletType === 'custodian') {
        return data.custodian.limit - data.custodian.total;
      }

      switch (field) {
        case 'total':
          return data.totalTokens;
          break;
        case 'redeemable':
          return data.totalTokensBreakdown.instant.nonLeased;
          break;
        case 'onHold':
          return data.leasedTotalsBreakdown.onHold;
          break;
        case 'available':
          return data.totalTokens - data.totalTokensBreakdown.onHold;
          break;
        default:
          throw new Error('please specify field');
      }
    });
  }

  async getSellDetails(wallet) {
    const priceList = await getGoldPriceSources();

    const custodians = Object.entries(wallet.custodians)
      .reduce((prev, [key, value]) => {
        prev.push({
          _id: key,
          weight: value.instant.nonLeased,
          amount:
            priceList.find((item) => item._id === key).sellPrice *
            value.instant.nonLeased,
        });
        return prev;
      }, [])
      .sort((a, b) => a.weight - b.weight);

    return custodians;
  }

  buildWalletFilter(accountId, custodianId) {
    const filter = { account: accountId };
    if (custodianId) filter['custodian'] = custodianId;

    return filter;
  }

  async buy({
    accountId,
    custodianId,
    gipId = null,
    lease = false,
    paymentId = null,
    paymentFee = 0,
    tokens,
    rate = null,
    tax = null,
    state,
    moduleName,
    actionName = '',
    walletUpdates = {},
  }) {
    if (!rate) rate = getGoldPrice().buyPrice;
    if (!tax) tax = await variables.get(Variables.BUY_GOLD_GST);

    const [custodian, merchant, commissionTax] = await Promise.all([
      Account.findById(custodianId),
      Merchant.findOne({ account: custodianId }),
      variables.get(Variables.COMMISSION_GST),
    ]);
    if (!custodian) throw new Error('custodian not found');

    const hubId =
      merchant.custodian.isActive && merchant.hub.isActive
        ? custodian._id
        : merchant.connectedHub || process.env.HUB_ACCOUNT_ID;

    const stateData = getActionNameToState(
      actionName,
      tokens,
      walletUpdates,
      lease
    );

    const tokenData = await buyTokens({
      accountId,
      custodianId: custodian._id,
      tokens,
      toState: stateData.toState,
      lease,
      hubId,
      gipId,
      slab: lease ? await variables.getSlab(stateData.slabName) : null,
    });

    const amount = tokens * rate;
    const taxAmount = amount * (tax / 100);
    const totalAmount = amount + taxAmount;
    const commissionAmount =
      amount * ((merchant?.custodian?.commissions?.buy ?? 0) / 100);
    const commissionTaxAmount = commissionAmount * (commissionTax / 100);
    const settlementAmount =
      totalAmount - paymentFee - commissionAmount - commissionTaxAmount;
    const createdAt = new Date();

    const transaction = new Transaction({
      from: custodianId,
      to: accountId,
      custodian: custodianId,
      account: accountId,
      payment: paymentId,
      custody: rate,
      tokens,
      amount: roundValue(amount, 2),
      tax,
      taxAmount: roundValue(taxAmount, 2),
      grossAmount: roundValue(totalAmount, 2),
      moduleName,
      actionName,
      status: TransactionStatus.COMPLETED,
      createdAt,
    });

    const commission = new Commission({
      from: custodianId,
      amount: roundValue(commissionAmount, 2),
      tax: commissionTax,
      taxAmount: roundValue(commissionTaxAmount, 2),
      totalAmount: roundValue(commissionAmount + commissionTaxAmount, 2),
      transaction: transaction._id,
      createdAt,
    });

    const settlement = new Settlement({
      direction: SettlementDirection.OUTGOING,
      amount: roundValue(settlementAmount, 2),
      account: custodianId,
      transaction: transaction._id,
      status: SettlementStatus.PENDING,
      createdAt,
    });

    const invoiceTaxDetails = await getTaxBifurcation({
      taxPercentage: tax,
      taxAmount,
      isSameState: state === custodian.state,
    });

    const invoice = new Invoice({
      invoiceNumber: generateInvoiceNumber(),
      type: InvoiceType.SALE,
      actionName,
      moduleName,
      category: 'custody',
      billFrom: custodianId,
      billTo: accountId,
      items: [
        {
          description: this.description,
          hsn: this.hsn,
          quantity: tokens,
          rate,
          tax,
          taxAmount: roundValue(taxAmount, 2),
          taxDetails: invoiceTaxDetails,
          amount: roundValue(amount, 2),
          grossAmount: roundValue(totalAmount, 2),
        },
      ],
      taxAmount: roundValue(taxAmount, 2),
      taxDetails: invoiceTaxDetails,
      totalAmount: roundValue(totalAmount, 2),
      payment: paymentId,
      transaction: transaction._id,
      settlement: settlement._id,
      commission: commission._id,
      createdAt,
    });

    const custody = new Custody({
      type: CustodyType.GIVEN,
      account: accountId,
      custodian: hubId,
      transaction: transaction._id,
      invoice: invoice._id,
      tokens,
      createdAt,
    });

    const commissionInvoiceTaxDetails = await getTaxBifurcation({
      taxPercentage: commissionTax,
      taxAmount: commissionTaxAmount,
      isSameState: custodian.state === process.env.MYGOLD_BILLING_STATE,
    });

    const commissionInvoice = new Invoice({
      invoiceNumber: generateInvoiceNumber(),
      type: InvoiceType.SERVICE,
      actionName,
      moduleName,
      category: 'custody',
      billFrom: process.env.MYGOLD_ACCOUNT_ID || '6426d11495e2341a2f724985',
      billTo: custodianId,
      items: [
        {
          description: `Commission of sale (${tokens} ${this.description})`,
          hsn: '996211',
          quantity: 1,
          rate: roundValue(commissionAmount, 2),
          amount: roundValue(commissionAmount, 2),
          tax: commissionTax,
          taxAmount: roundValue(commissionTaxAmount, 2),
          taxDetails: commissionInvoiceTaxDetails,
          grossAmount: roundValue(commissionAmount + commissionTaxAmount, 2),
        },
      ],
      taxAmount: roundValue(commissionTaxAmount, 2),
      taxDetails: commissionInvoiceTaxDetails,
      totalAmount: roundValue(commissionAmount + commissionTaxAmount, 2),
    });

    transaction.invoice = invoice._id;
    transaction.custody = custody._id;
    invoice.custody = custody._id;
    commission.invoice = commissionInvoice._id;

    await Promise.all([
      transaction.save(),
      settlement.save(),
      invoice.save(),
      custody.save(),
      commissionAmount && commission.save(),
      commissionAmount && commissionInvoice.save(),
    ]);

    await WalletTrack.updateOne(
      { account: accountId },
      {
        $inc: {
          ...prefixKeys(stateData.updates, 'total.'),
          ...prefixKeys(stateData.updates, `custodians.${custodianId}.`),
        },
      },
      { upsert: true }
    );

    this.emit('buy', { transaction, invoice });

    return {
      transactionId: transaction._id,
      invoiceId: invoice._id,
      tokens: transaction.tokens,
      rate,
      amount: roundValue(totalAmount, 2),
      description: this.description,
      invoiceUrl: `/common/invoices/${invoice._id}`,
      certificateUrl: `/common/certificates/${custody._id}`,
      custodian: {
        id: custodian._id,
        name: custodian.name,
        image: custodian.image,
      },
      balance: tokenData.balance,
      createdAt,
    };
  }

  async sell({
    accountId,
    custodianId = null,
    bankAccountId = null,
    tokens,
    rate = null,
    tax = null,
    fromState = null,
    state,
    moduleName,
    actionName = '',
    walletUpdates = {},
    settlementHold = false,
  }) {
    if (!rate) rate = getGoldPrice().sellPrice;
    if (!tax) tax = await variables.get(Variables.SELL_GOLD_GST);

    const stateData = getActionNameToState(actionName, tokens, walletUpdates);

    const tokenData = await sellTokens({
      accountId,
      custodianId,
      tokens,
      fromState,
    });

    const custodians = await Account.find({
      _id: tokenData.deductions.map((item) => item.custodianId),
    }).lean();

    const transactions = [];
    const invoices = [];
    const settlements = [];
    const custodies = [];
    const custodyReleases = [];
    const walletTrackUpdate = {};

    const date = new Date();

    for (const item of tokenData.deductions) {
      const custodian = custodians.find((e) => e._id.equals(item.custodianId));
      const amount = item.total * rate;
      const taxAmount = amount * (tax / 100);
      const grossAmount = amount + taxAmount;

      const transaction = new Transaction({
        from: accountId,
        to: custodian._id,
        custodian: custodian._id,
        account: accountId,
        rate,
        tokens: item.total,
        amount: roundValue(amount, 2),
        tax,
        taxAmount: roundValue(taxAmount, 2),
        grossAmount: roundValue(grossAmount, 2),
        bankAccount: bankAccountId,
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
        tokens: item.total,
        createdAt: date,
      });

      const settlement = new Settlement({
        direction: SettlementDirection.INCOMING,
        amount: roundValue(amount, 2),
        account: transaction.to,
        transaction: transaction._id,
        status: settlementHold
          ? SettlementStatus.HOLD
          : SettlementStatus.PENDING,
        createdAt: date,
      });

      const invoiceTaxDetails = await getTaxBifurcation({
        taxPercentage: tax,
        taxAmount,
        isSameState: state === custodian.state,
      });

      const invoice = new Invoice({
        invoiceNumber: generateInvoiceNumber(),
        type: InvoiceType.PURCHASE,
        actionName,
        moduleName,
        category: 'custody',
        billFrom: transaction.to,
        billTo: transaction.from,
        items: [
          {
            description: this.description,
            hsn: this.hsn,
            quantity: item.total,
            rate,
            tax,
            taxAmount: roundValue(taxAmount, 2),
            taxDetails: invoiceTaxDetails,
            amount: roundValue(amount, 2),
            grossAmount: roundValue(grossAmount, 2),
          },
        ],
        taxAmount: roundValue(taxAmount, 2),
        taxDetails: invoiceTaxDetails,
        totalAmount: roundValue(grossAmount, 2),
        transaction: transaction._id,
        custody: custody._id,
        settlement: settlement._id,
        createdAt: date,
      });

      Object.assign(
        walletTrackUpdate,
        prefixKeys(stateData.updates, `custodians.${item.custodianId}.`)
      );

      custodyReleases.push({
        id: transaction.to,
        transactionId: transaction._id,
        invoiceId: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
        name: custodian?.name,
        image: getS3Url(custodian?.image),
        tokens: item.total,
        amount: invoice.totalAmount,
        balance: item.balance,
        invoiceUrl: `/common/invoices/${invoice._id}`,
        certificateUrl: `/common/certificates/${custody._id}`,
        createdAt: date,
        dueDate: date,
      });

      transaction.invoice = invoice._id;
      transaction.custody = custody._id;

      transactions.push(transaction);
      invoices.push(invoice);
      settlements.push(settlement);
      custodies.push(custody);
    }

    await Transaction.bulkSave(transactions);
    await Custody.bulkSave(custodies);
    await Invoice.bulkSave(invoices);
    await Settlement.bulkSave(settlements);

    await WalletTrack.updateOne(
      { account: accountId },
      {
        $inc: {
          ...prefixKeys(stateData.updates, 'total.'),
          ...walletTrackUpdate,
        },
      },
      { upsert: true }
    );

    this.emit('sell', { transactions, invoices });

    return {
      amount: roundValue(rate * tokens * (1 - tax / 100), 2),
      tokens,
      rate,
      tax,
      taxAmount: transactions.reduce(
        (prev, item) => (prev += item.taxAmount),
        0
      ),
      time: await variables.get(Variables.BANK_TRANSFER_HOURS, null, 48),
      description: this.description,
      custodyReleases,
      balance: tokenData.totalBalance,
    };
  }

  async transfer({
    senderId,
    receiverId,
    custodianId = null,
    tokens,
    moduleName,
    actionName,
  }) {
    const data = await transferTokens({
      fromAccountId: senderId,
      toAccountId: receiverId,
      custodianId,
      tokens,
    });

    const custodians = await Account.find({
      _id: data.deductions.map((item) => item.custodianId),
    }).lean();

    const transactions = [];
    const custodies = [];
    const custodyReleases = [];
    const createdAt = new Date();

    for (const item of data.deductions) {
      const custodian = custodians.find((e) => e._id.equals(item.custodianId));

      const transaction1 = new Transaction({
        from: senderId,
        to: receiverId,
        custodian: item.custodianId,
        tokens: item.tokens,
        amount: 0,
        taxAmount: 0,
        grossAmount: 0,
        moduleName,
        actionName,
        createdAt,
      });
      const transaction2 = cloneModel(Transaction, transaction1);

      const custody1 = new Custody({
        type: CustodyType.RELEASE,
        transferredTo: receiverId,
        custodian: item.custodianId,
        transaction: transaction1._id,
        tokens: item.tokens,
        createdAt,
      });
      const custody2 = cloneModel(Custody, custody1);

      transaction1.account = senderId;
      transaction1.custody = custody1._id;

      transaction2.account = receiverId;
      transaction1.custody = custody2._id;

      transactions.push(transaction1, transaction2);
      custodies.push(custody1, custody2);

      custodyReleases.push({
        id: transaction1.to,
        transactionId: transaction1._id,
        name: custodian?.name,
        image: getS3Url(custodian?.image),
        tokens: item.tokens,
        balance: item.balance,
        invoiceUrl: '',
        certificateUrl: `/common/certificates/${custody1._id}`,
        createdAt,
      });
    }

    await Transaction.bulkSave(transactions);
    await Custody.bulkSave(custodies);

    return {
      tokens,
      balance: data.balance,
      custodies: custodyReleases,
      createdAt,
    };
  }

  async selfTransfer({
    accountId,
    custodianId = null,
    tokens,
    fromState,
    toState,
    moduleName = null,
    actionName = null,
  }) {
    const stateData = getActionNameToState(actionName, tokens);

    const data = await selfTransfer({
      accountId,
      custodianId,
      tokens,
      fromState,
      toState,
    });

    const keys = data.deductions.reduce((prev, curr) => {
      prev = {
        ...prev,
        ...prefixKeys(stateData.updates, `custodians.${curr.custodianId}.`),
      };
      return prev;
    }, {});

    await WalletTrack.updateOne(
      { account: accountId },
      {
        $inc: {
          ...prefixKeys(stateData.updates, 'total.'),
          ...keys,
        },
      }
    );

    return data;
  }

  async breakLease(accountId, payload) {
    return breakLease(accountId, payload);
  }
}

export default new Gold();
