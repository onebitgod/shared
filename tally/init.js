import { importData } from './index.js';

export const init = async () => {
  const ledgers = [];
  const groups = [];

  // create groups
  groups.push({
    name: 'GST',
    parent: 'Duties & Taxes',
  });

  groups.push({
    name: 'TCS',
    parent: 'Duties & Taxes',
  });

  groups.push({
    name: 'TDS',
    parent: 'Duties & Taxes',
  });

  groups.push({
    name: 'Merchants',
    parent: 'Current Liabilities',
  });

  groups.push({
    name: 'Customers',
    parent: 'Current Liabilities',
  });

  // ICICI Bank
  ledgers.push({
    $: { action: 'create' },
    name: 'ICICI Bank A/c',
    parent: 'Bank Accounts',
    countryOfResidence: 'India',
    currencyName: 'INR',
    openingBalance: 0,
    isBankLedger: 'Yes',
    bankAccHolderName: 'Amol Bansal',
    bankDetails: '77711199999999',
    ifsCode: 'ICICI0001111',
    bankingConfigBank: 'ICICI Bank (India)',
    branchName: 'Lucknow',
  });

  // Razorpay A/c
  ledgers.push({
    $: { action: 'create' },
    name: 'Razor Pay A/c',
    parent: 'Current Liabilities',
    isBillWise: 'Yes',
  });

  ledgers.push({
    $: { action: 'create' },
    name: 'RazorPay Settlement Charges A/c',
    parent: 'Indirect Expenses',
    isBillWise: 'Yes',
  });

  // Bank Charges A/c
  ledgers.push({
    $: { action: 'create' },
    name: 'Bank Charges A/c',
    parent: 'Indirect Expenses',
    taxClassificationDetails: {
      gstTypeOfSupply: 'Services',
    },
    isBillWise: 'Yes',
  });

  // TCS Payable
  ledgers.push({
    $: { action: 'create' },
    name: 'TCS Payable',
    parent: 'TCS',
    isBillWise: 'Yes',
  });

  ledgers.push({
    $: { action: 'create' },
    name: 'TCS-SGST Payable',
    parent: 'TCS',
    isBillWise: 'Yes',
  });

  ledgers.push({
    $: { action: 'create' },
    name: 'TCS-CGST Payable',
    parent: 'TCS',
    isBillWise: 'Yes',
  });

  ledgers.push({
    $: { action: 'create' },
    name: 'TCS-IGST Payable',
    parent: 'TCS',
    isBillWise: 'Yes',
  });

  // TDS
  ledgers.push({
    $: { action: 'create' },
    name: 'TDS-IT-1940 A/c',
    parent: 'TDS',
    isBillWise: 'Yes',
  });

  // GST
  ledgers.push({
    $: { action: 'create' },
    name: 'GST',
    parent: 'GST',
    taxType: 'GST',
    isBillWise: 'Yes',
  });

  ledgers.push({
    $: { action: 'create' },
    name: 'SGST on Gold A/c',
    parent: 'GST',
    taxType: 'GST',
    isBillWise: 'Yes',
  });

  ledgers.push({
    $: { action: 'create' },
    name: 'CGST on Gold A/c',
    parent: 'GST',
    taxType: 'GST',
    isBillWise: 'Yes',
  });

  ledgers.push({
    $: { action: 'create' },
    name: 'IGST on Gold A/c',
    parent: 'GST',
    taxType: 'GST',
    isBillWise: 'Yes',
  });

  // Commission Income
  ledgers.push({
    $: { action: 'create' },
    name: 'Commission Income',
    parent: 'Direct Incomes',
    isBillWise: 'Yes',
  });

  ledgers.push({
    $: { action: 'create' },
    name: 'SGST on Commission',
    parent: 'Direct Incomes',
    isBillWise: 'Yes',
  });

  ledgers.push({
    $: { action: 'create' },
    name: 'CGST on Commission',
    parent: 'Direct Incomes',
    isBillWise: 'Yes',
  });

  ledgers.push({
    $: { action: 'create' },
    name: 'IGST on Commission',
    parent: 'Direct Incomes',
    isBillWise: 'Yes',
  });

  console.log('groups', await importData({ group: groups }));
  console.log('ledgers', await importData({ ledgers }));
};
