import Account from '../models/account.js';
import { StateName } from '../constants.js';
import { importData } from './index.js';

export const importAccounts = async () => {
  const data = await Account.find({}).lean();

  const payloadData = {
    ledger: [],
  };

  for (const account of data) {
    if (!account.name) continue;

    payloadData.ledger.push({
      $: { action: 'create' },
      name: `${account.name} (${account._id})`,
      parent: 'Current Liabilities',
      countryOfResidence: 'India',
      ledStateName: StateName[account.state],
      ledgerMobile: account.mobile,
      isBillWise: 'Yes',
    });
  }

  return importData(payloadData);
};
