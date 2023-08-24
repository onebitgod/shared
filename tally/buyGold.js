import { createVoucher, importData } from './index.js';

export const buyGoldEntry = async (data) => {
  const {
    customerId,
    custodianId,
    transactionId,
    invoiceId,
    paymentId,
    paymentFee,
    amount,
    tax,
    totalAmount,
    tcs,
    tds,
    commissionAmount,
    commissionTax,
  } = data;

  await importData({
    ledgers: [
      {
        $: { action: 'create' },
        name: customerId,
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

  const journalEntry1 = await createVoucher({
    id: transactionId,
    type: 'journal',
    date: new Date(),
    items: [
      {
        ledger: 'Razor Pay A/c',
        type: 'debit',
        amount: totalAmount - paymentFee,
        billAllocations: [
          {
            name: paymentId,
            type: 'New Ref',
            amount: totalAmount - paymentFee,
          },
        ],
      },
      {
        ledger: 'RazorPay Settlement Charges A/c',
        type: 'debit',
        amount: paymentFee,
        billAllocations: [
          {
            name: `bk_${paymentId}`,
            type: 'New Ref',
            amount: paymentFee,
          },
        ],
      },
      {
        ledger: customerId,
        type: 'credit',
        amount: amount,
        billAllocations: [
          {
            name: transactionId,
            type: 'New Ref',
            amount: amount,
          },
        ],
      },
      {
        ledger: 'SGST on Gold A/c',
        type: 'credit',
        amount: tax.sgst,
        billAllocations: [
          {
            name: transactionId,
            type: 'New Ref',
            amount: tax.sgst,
          },
        ],
      },
      {
        ledger: 'CGST on Gold A/c',
        type: 'credit',
        amount: tax.cgst,
        billAllocations: [
          {
            name: transactionId,
            type: 'New Ref',
            amount: tax.cgst,
          },
        ],
      },
      {
        ledger: 'IGST on Gold A/c',
        type: 'credit',
        amount: tax.igst,
        billAllocations: [
          {
            name: transactionId,
            type: 'New Ref',
            amount: tax.igst,
          },
        ],
      },
    ],
  });

  console.log(journalEntry1);

  if (journalEntry1.errors)
    console.error('[buyGold] journalEntry1: ', journalEntry1.errorMessage);

  const journalEntry2 = await createVoucher({
    id: `${transactionId}_income`,
    type: 'journal',
    date: new Date(),
    narration: 'Accounts settled',
    items: [
      {
        ledger: customerId,
        type: 'debit',
        amount: amount,
        billAllocations: [
          {
            name: transactionId,
            type: 'Agst Ref',
            amount: amount,
          },
        ],
      },
      {
        ledger: 'SGST on Gold A/c',
        type: 'debit',
        amount: tax.sgst,
        billAllocations: [
          {
            name: transactionId,
            type: 'Agst Ref',
            amount: tax.sgst,
          },
        ],
      },
      {
        ledger: 'CGST on Gold A/c',
        type: 'debit',
        amount: tax.cgst,
        billAllocations: [
          {
            name: transactionId,
            type: 'Agst Ref',
            amount: tax.cgst,
          },
        ],
      },
      {
        ledger: 'IGST on Gold A/c',
        type: 'debit',
        amount: tax.igst,
        billAllocations: [
          {
            name: transactionId,
            type: 'Agst Ref',
            amount: tax.igst,
          },
        ],
      },
      {
        ledger: 'TCS-SGST Payable',
        type: 'credit',
        amount: tcs.sgst,
        billAllocations: [
          {
            name: `TDS-GST-${transactionId}`,
            type: 'New Ref',
            amount: tcs.sgst,
          },
        ],
      },
      {
        ledger: 'TCS-CGST Payable',
        type: 'credit',
        amount: tcs.cgst,
        billAllocations: [
          {
            name: `TDS-GST-${transactionId}`,
            type: 'New Ref',
            amount: tcs.cgst,
          },
        ],
      },
      {
        ledger: 'TCS-IGST Payable',
        type: 'credit',
        amount: tcs.igst,
        billAllocations: [
          {
            name: `TDS-GST-${transactionId}`,
            type: 'New Ref',
            amount: tcs.igst,
          },
        ],
      },
      {
        ledger: 'TDS-IT-1940 A/c',
        type: 'credit',
        amount: tds.total,
        billAllocations: [
          {
            name: `TDS-IT-${transactionId}`,
            type: 'New Ref',
            amount: tds.total,
          },
        ],
      },
      {
        ledger: custodianId,
        type: 'credit',
        amount: totalAmount - tcs.total - tds.total,
        billAllocations: [
          {
            name: invoiceId,
            type: 'New Ref',
            amount: totalAmount - tcs.total - tds.total,
          },
        ],
      },
    ],
  });

  if (journalEntry2.errors)
    console.error('[buyGold] journalEntry2: ', journalEntry2.errorMessage);

  const journalEntry3 = await createVoucher({
    type: 'journal',
    date: new Date(),
    items: [
      {
        ledger: custodianId,
        type: 'debit',
        amount: paymentFee + commissionAmount + commissionTax.total,
        billAllocations: [
          {
            name: invoiceId,
            type: 'Agst Ref',
            amount: paymentFee + commissionAmount + commissionTax.total,
          },
        ],
      },
      {
        ledger: 'RazorPay Settlement Charges A/c',
        type: 'credit',
        amount: paymentFee,
        billAllocations: [
          {
            name: `bk_${paymentId}`,
            type: 'Agst Ref',
            amount: paymentFee,
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

  if (journalEntry3)
    console.error('[buyGold] journalEntry3: ', journalEntry3.errorMessage);

  const journalEntry4 = await createVoucher({
    type: 'journal',
    date: new Date(),
    ledger: 'ICICI Bank A/c',
    items: [
      {
        ledger: 'Razor Pay A/c',
        type: 'credit',
        amount: totalAmount - paymentFee,
        billAllocations: [
          {
            name: paymentId,
            type: 'Agst Ref',
            amount: totalAmount - paymentFee,
          },
        ],
      },
      {
        ledger: custodianId,
        type: 'debit',
        amount:
          totalAmount -
          paymentFee -
          commissionAmount -
          commissionTax.total -
          tcs.total -
          tds.total,
        billAllocations: [
          {
            name: invoiceId,
            type: 'Agst Ref',
            amount:
              totalAmount -
              paymentFee -
              commissionAmount -
              commissionTax.total -
              tcs.total -
              tds.total,
          },
        ],
      },
      {
        ledger: 'ICICI Bank A/c',
        type: 'debit',
        amount: commissionAmount + commissionTax.total + tcs.total + tds.total,
      },
    ],
  });

  if (journalEntry4)
    console.error('[buyGold] journalEntry4: ', journalEntry4.errorMessage);

  console.log('[buyGold]: done');
};
