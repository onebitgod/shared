import Axios from 'axios';
import qs from 'qs';

const supplyChainBaseUrl = 'http://34.131.225.34:5000';
const walletBaseUrl = 'http://34.131.157.178:5000';

const axios = Axios.create();

const handleAxiosError = (err) => {
  const message =
    err?.response?.data?.message || err.message || err.response?.statusText;
  console.error(err.response?.data || err.message);
  throw new Error(message);
};

export const queryEvents = async (
  filter,
  pageSize = 1000000,
  bookmark = ''
) => {
  return axios
    .post(supplyChainBaseUrl + '/paginationResults', {
      selector: filter,
      pageSize,
      bookmark,
    })
    .then((res) => res.data.data.results?.map((item) => item.Record));
};

export const getEvent = async (filter) => {
  return queryEvents(filter, 1).then((data) => data[0] ?? null);
};

export const createEvent = async (data) => {
  return axios.post(supplyChainBaseUrl + '/events/createEvent', data);
};

export const updateEvent = async (id, data) => {
  return axios.put(supplyChainBaseUrl + '/events/updateEvent', {
    id,
    data,
  });
};

export const deleteEvent = async (id) => {
  return axios.delete(supplyChainBaseUrl + '/events/' + id);
};

export const batchUpdateEvent = async (ids, data) => {
  return axios.post(supplyChainBaseUrl + '/events/batchUpdateEvent', {
    ids,
    ...data,
  });
};

export const countEvents = async (filter) => {
  const data = await queryEvents(filter);

  return data.length;
};

export const getMeta = async (data) => {
  return axios
    .post(`${supplyChainBaseUrl}/paginationResults/getOverview`, {
      selectors: data,
    })
    .then((res) => res.data.data);
};

export const createWallet = (type, accountId) => {
  return axios
    .post(`${walletBaseUrl}/wallet/createWallet`, {
      walletAddress: accountId,
      type,
    })
    .catch(handleAxiosError);
};

export const createAdminWallet = (payload) => {
  return axios
    .post(`${walletBaseUrl}/wallet/createAdminWallet`, payload)
    .catch(handleAxiosError);
};

export const getWallet = (accountId) => {
  return axios
    .get(`${walletBaseUrl}/balance/${accountId}`)
    .then((res) => res.data.data)
    .catch(handleAxiosError);
};

export const getInterest = (accountId, filter) => {
  return axios
    .get(
      `${walletBaseUrl}/balance/interest/${accountId}?${qs.stringify(filter)}`
    )
    .then((res) => ({
      ...res.data.data,
      total:
        res.data.data.instant.total +
        res.data.data.gip.total +
        res.data.data.uploaded.total,
    }))
    .catch((err) => {
      return {
        total: 0,
        instant: { total: 0, custodians: {} },
        gip: { total: 0, custodians: {} },
        uploaded: { total: 0, custodians: {} },
      };
      handleAxiosError(err);
    });
};

export const getGipInterest = (accountId) => {
  return axios
    .get(`${walletBaseUrl}/balance/all-gip-interest/${accountId}`)
    .then((res) => res.data.data)
    .catch((err) => {
      return { total: 0, gipInterestData: {} };
      handleAxiosError(err);
    });
};

export const updateMerchantWallet = (accountId, payload) => {
  return axios
    .post(`${walletBaseUrl}/wallet/updateMerchantWallet`, {
      accountId,
      data: payload,
    })
    .then((res) => res.data.data)
    .catch(handleAxiosError);
};

export const mintWallet = async (accountId, tokens) => {
  return axios.post(`${walletBaseUrl}/mint`, {
    walletAddress: accountId,
    tokens,
  });
};

export const buyTokens = (data) => {
  const payload = {
    accountId: data.accountId,
    custodianId: data.custodianId,
    totalTokens: data.tokens,
    fromState: data.leased ? 'leased' : 'nonLeased',
    toUserState: data.toState,
    isLeased: data.lease ?? false,
    hubId: data.hubId,
    gipId: data.gipId,
    slab: data.slab,
    transactionDate: new Date(),
  };

  return axios
    .post(`${walletBaseUrl}/transactions/buy`, payload)
    .then((res) => res.data.data)
    .catch(handleAxiosError);
};

export const sellTokens = (data) => {
  const payload = {
    accountId: data.accountId,
    custodianId: data.custodianId,
    tokens: data.tokens,
  };

  return axios
    .post(`${walletBaseUrl}/transactions/sell`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch(handleAxiosError);
};

export const selfTransfer = (data) => {
  return axios
    .post(`${walletBaseUrl}/transactions/selfTransfer`, {
      accountId: data.accountId,
      custodianId: data.custodianId,
      tokens: data.tokens,
      fromState: data.fromState,
      toState: data.toState,
    })
    .then((res) => res.data.data)
    .catch(handleAxiosError);
};

export const transferTokens = (data) => {
  return axios
    .post(`${walletBaseUrl}/transactions/transfer`, {
      fromAccountId: `${data.fromAccountId}`,
      toAccountId: `${data.toAccountId}`,
      tokens: data.tokens,
      fromState: {
        instant: { nonLeased: data.tokens },
      },
      toState: {
        instant: { nonLeased: data.tokens },
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch(handleAxiosError);
};

export const breakLease = (accountId, payload) => {
  return axios
    .post(`${walletBaseUrl}/transactions/breakLease/${accountId}`, payload)
    .then((res) => res.data.data)
    .catch(handleAxiosError);
};

export const getLeaseTransactions = (accountId, type) => {
  return axios
    .get(
      `${walletBaseUrl}/transactions/getTransactionData/${accountId}/${type}`
    )
    .then((res) => res.data.data)
    .catch((err) => {
      if (err.response?.data?.message.startsWith('Account does not exist'))
        return [];
      return handleAxiosError(err);
    });
};
