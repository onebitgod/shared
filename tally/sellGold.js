import { createVoucher, importData } from './index.js';

export const sellGoldEntry = async (data) => {
  const {
    accountId,
    custodianId,
    transactionId,
    invoiceId,
    amount,
    commissionAmount,
    commissionTax,
  } = data;

  const custodianAmount = amount + commissionAmount + commissionTax.total;

  await importData({
    ledgers: [
      {
        $: { action: 'create' },
        name: accountId,
        parent: 'Customers',
        isBillWise: 'Yes',
      },
      {
        $: { action: 'create' },
        name: custodianId,
        parent: 'Merchants',
        isBillWise: 'Yes',
      },
    ],
  });

  const payment = await createVoucher({
    type: 'payment',
    ledger: 'ICICI Bank A/c',
    date: new Date(),
    items: [
      {
        ledger: accountId,
        type: 'debit',
        amount,
        billAllocations: [
          {
            name: transactionId,
            type: 'New Ref',
            amount,
          },
        ],
      },
      {
        ledger: 'ICICI Bank A/c',
        type: 'credit',
        amount,
      },
    ],
  });

  if (payment.errors)
    console.error('[sellGold] payment: ', payment.errorMessage);

  const journalEntry1 = await createVoucher({
    type: 'journal',
    date: new Date(),
    items: [
      {
        ledger: custodianId,
        type: 'debit',
        amount: custodianAmount,
        billAllocations: [
          {
            name: invoiceId,
            type: 'New Ref',
            amount: custodianAmount,
          },
        ],
      },
      {
        ledger: accountId,
        type: 'credit',
        amount,
        billAllocations: [
          {
            name: transactionId,
            type: 'Agst Ref',
            amount,
          },
        ],
      },
      {
        ledger: 'Commission Income',
        type: 'credit',
        amount: commissionAmount,
      },
      {
        ledger: 'SGST on Commission',
        type: 'credit',
        amount: commissionTax.sgst,
      },
      {
        ledger: 'CGST on Commission',
        type: 'credit',
        amount: commissionTax.cgst,
      },
      {
        ledger: 'IGST on Commission',
        type: 'credit',
        amount: commissionTax.igst,
      },
    ],
  });

  if (journalEntry1.errors)
    console.error('[sellGold]: journalEntry1: ', journalEntry1.errorMessage);

  const receipt = await createVoucher({
    type: 'receipt',
    date: new Date(),
    ledger: 'ICICI Bank A/c',
    items: [
      {
        ledger: custodianId,
        type: 'credit',
        amount: -custodianAmount,
        billAllocations: [
          {
            name: invoiceId,
            type: 'Agst Ref',
            amount: custodianAmount,
          },
        ],
      },
      {
        ledger: 'ICICI Bank A/c',
        type: 'debit',
        amount: -custodianAmount,
      },
    ],
  });

  if (receipt.errors)
    console.error('[sellGold]: receipt: ', receipt.errorMessage);
};
