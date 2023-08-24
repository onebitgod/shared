import { axios, roundValue } from './index.js';

import dayjs from 'dayjs';

const apiUrl = process.env.SEQUEL_API_URL;
const apiToken = process.env.SEQUEL_API_TOKEN;
const storeCode = process.env.SEQUEL_STORE_CODE;

export const createShipment = async ({
  fromAddress,
  toAddress,
  netWeight,
  netValue,
  packageCount = 1,
}) => {
  const shipment = await axios.post(`${apiUrl}/api/shipment/create`, {
    token: apiToken,
    location: 'domestic',
    shipmentType: 'D&J',
    serviceType: 'valuable',
    fromStoreCode:
      typeof fromAddress === 'string'
        ? fromAddress
        : {
          consignee_name: fromAddress.name,
          address_line1: fromAddress.fullAddress,
          pinCode: `${fromAddress.postalCode}`,
          auth_receiver_name: fromAddress.name,
          auth_receiver_phone: fromAddress.mobile,
        },
    toAddress:
      typeof toAddress === 'string'
        ? toAddress
        : {
          consignee_name: toAddress.name,
          address_line1: toAddress.fullAddress,
          pinCode: `${toAddress.postalCode}`,
          auth_receiver_name: toAddress.name,
          auth_receiver_phone: toAddress.mobile,
        },
    net_weight: `${netWeight}`,
    net_value: `${roundValue(netValue, 0)}`,
    no_of_packages: `${packageCount}`,
  });

  switch (shipment.status) {
    // @ts-ignore
    case 'true':
      return {
        docketNo: shipment.data.docket_number,
        brnNo: shipment.data.brn,
        estimatedDeliveryDate: dayjs(
          shipment.data.estiimated_delivery,
          'DD-MM-YYYY'
        ).toDate(),
        trackingUrl: `${process.env.SEQUEL_API_URL}/track/${shipment.data.docket_number}`,
      };
    // @ts-ignore
    case 'false':
      console.error(shipment);
      // @ts-ignore
      throw new Error(Object.values(shipment.errorInfo)[0]);
  }
};

export const cancelShipment = async (docketNo) => { };

export const fetchDeliveryAddress = async (origin, destination) => {
  const data = await axios.post(`${apiUrl}/api/shipment/calculateEDD`, {
    token: apiToken,
    origin_pincode: `${origin}`,
    destination_pincode: `${destination}`,
    pickup_date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
  });

  console.log(JSON.stringify(data));
  const etd = dayjs(data.data?.estimated_delivery, 'DD-MM-YYYY');

  return {
    // @ts-ignore
    available: data.status === 'true',
    estimatedDeliveryDate: etd.isValid() ? etd.toDate() : '',
    shippingAmount: 700,
  };
};

export const isPostalCodeServiceable = async (code) => {
  return [];
};
