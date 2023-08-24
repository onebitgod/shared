import axios from 'axios';
import dayjs from 'dayjs';
import xml from 'xml2js';

const baseUrl = 'http://34.131.236.193:9000';
const companyName = 'test';
const builder = new xml.Builder();

export const cleanXml = (xmlString) => {
  return xmlString.replace(/^<\?xml.*\?>/, '');
};

export const convertToCase = (data, caseName = 'uppercase') => {
  const finalData = {};
  for (const key in data) {
    const casedKey =
      caseName === 'uppercase' ? key.toUpperCase() : key.toLowerCase();

    if (key === '$') {
      finalData[key] = data[key];
    } else if (Array.isArray(data[key])) {
      finalData[casedKey] = data[key].map((item) => convertToCase(item));
    } else if (typeof data[key] === 'object') {
      finalData[casedKey] = convertToCase(data[key]);
    } else {
      finalData[casedKey] = data[key];
    }
  }

  return finalData;
};

export const tallyRequest = async (data) => {
  const xmlString = cleanXml(builder.buildObject(convertToCase(data)));

  return axios
    .get(baseUrl, {
      headers: {
        'Content-Type': 'application/xml',
      },
      data: xmlString,
    })
    .then((res) => xml.parseStringPromise(res.data))
    .catch((err) => Promise.reject(err.response?.data || err.message));
};

export const importData = (data, options = {}) => {
  return tallyRequest({
    envelope: {
      header: {
        tallyRequest: 'Import Data',
      },
      body: {
        importData: {
          requestDesc: {
            reportName: options.reportName ?? 'All masters',
            staticVariables: {
              svCurrentCompany: companyName,
            },
          },
          requestData: {
            tallyMessage: {
              $: {
                'xmlns:UDF': 'TallyUDF',
              },
              ...data,
            },
          },
        },
      },
    },
  }).then((parsed) => {
    const payload = Object.keys(parsed.RESPONSE).reduce(
      (prev, item) => {
        const fieldName =
          item === 'LINEERROR' ? 'errorMessage' : item.toLowerCase();
        const fieldValue =
          item === 'LINEERROR'
            ? parsed.RESPONSE[item][0]
            : Number(parsed.RESPONSE[item][0]);

        prev[fieldName] = fieldValue;

        return prev;
      },
      { errors: 0, errorMessage: '' }
    );

    return payload;
  });
};

export const createVoucher = async (data) => {
  return importData({
    voucher: {
      $: {
        action: 'create',
        vchType: data.type,
      },
      date: dayjs(data.date).format('YYYYMMDD'),
      voucherTypeName: data.type,
      voucherNumber: data.id,
      narration: data.narration,
      partyLedgerName: data.ledger,
      'allLedgerEntries.list': data.items.map(
        ({
          ledger,
          type,
          amount,
          isPartyLedger,
          billAllocations,
          bankAllocations,
          ...rest
        }) => ({
          ledgerName: ledger,
          amount: -amount,
          isDeemedPositive: type === 'credit' ? 'No' : 'Yes',
          isPartyLedger: isPartyLedger ? 'Yes' : 'No',
          'billAllocations.list':
            billAllocations?.map((bill) => ({
              ...bill,
              amount: type === 'credit' ? bill.amount : -bill.amount,
              billType: bill.type,
              billCreditPeriod: bill.period
                ? {
                    $: {
                      P: `${bill.period} Days`,
                    },
                    _: `${bill.period} Days`,
                  }
                : undefined,
            })) || [],
          'bankAllocations.list': bankAllocations ?? [],
          ...rest,
        })
      ),
    },
  });
};
