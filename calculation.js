import { PayMode, ValueMode, Variables } from './constants.js';
import gold from './gold.js';
import { getGoldPrice } from './goldPrice.js';
import variables from './variables.js';
import { roundValue } from './helpers.js';

export const buyGold = async ({ mode, value, rate = null, tax = null }) => {
  if (!tax) tax = await variables.get(Variables.BUY_GOLD_GST);
  if (!rate) rate = await getGoldPrice().buyPrice;

  let tokens = 0;
  let amount = 0;
  let taxAmount = 0;
  let totalAmount = 0;

  switch (mode) {
    case ValueMode.TOKEN:
      tokens = value;
      amount = rate * tokens;
      taxAmount = amount * (tax / 100);
      totalAmount = amount + taxAmount;
      break;
    case ValueMode.FIAT:
      taxAmount = (value * tax) / 100;
      amount = value;
      tokens = amount / rate;
      totalAmount = amount + taxAmount;
      break;
  }

  return {
    tokens,
    rate: roundValue(rate, 2),
    amount: roundValue(amount, 2),
    tax,
    taxAmount: roundValue(taxAmount, 2),
    totalAmount: roundValue(totalAmount),
  };
};

export const sellGold = async ({ mode, value, rate = null, tax = null }) => {
  if (!rate) rate = getGoldPrice().sellPrice;
  if (!tax) tax = await variables.get(Variables.SELL_GOLD_GST);

  let tokens = 0;
  let amount = 0;
  let taxAmount = 0;
  let payableAmount = 0;

  switch (mode) {
    case ValueMode.TOKEN:
      tokens = value;
      amount = tokens * rate;
      taxAmount = amount * (tax / 100);
      payableAmount = amount - taxAmount;
      break;
    case ValueMode.FIAT:
      taxAmount = value / (1 - tax / 100) - value;
      amount = value + taxAmount;
      tokens = amount / rate;
      payableAmount = value;
      break;
  }

  return {
    tokens,
    rate: roundValue(rate, 2),
    tax,
    taxAmount: roundValue(taxAmount, 2),
    payableAmount: roundValue(payableAmount, 2),
  };
};

export const giftGold = async ({
  accountId,
  mode,
  payMode,
  rate = null,
  value,
}) => {
  const { buyPrice, sellPrice } = getGoldPrice();

  if (!rate) rate = buyPrice;

  const [tax, commissionTax] = await variables.getMultiple([
    Variables.BUY_GOLD_GST,
    Variables.COMMISSION_GST,
  ]);

  let weight = 0;
  let amountToPay = 0;
  let giftingFeeAmount = 0;
  let giftingFeeTaxAmount = 0;
  let giftingFeeTotalAmount = 0;

  let buyData = {
    rate: 0,
    amount: 0,
    tax,
    taxAmount: 0,
    totalAmount: 0,
  };

  switch (mode) {
    case ValueMode.FIAT:
      weight = value / rate;
      break;
    case ValueMode.TOKEN:
      weight = roundValue(value, 4, 'up');
      break;
  }

  switch (payMode) {
    case PayMode.GOLD_BANK:
      giftingFeeAmount = await variables.getComparedValue(
        Variables.GIFT_GOLD_TRANSACTION_CHARGE,
        weight * rate
      );
      giftingFeeTaxAmount = giftingFeeAmount * (commissionTax / 100);
      giftingFeeTotalAmount = giftingFeeAmount + giftingFeeTaxAmount;

      amountToPay = giftingFeeTotalAmount;

      break;
    case PayMode.PAYMENT_GATEWAY:
      buyData.rate = buyPrice;
      buyData.amount = weight * buyPrice;
      buyData.taxAmount = buyData.amount * (tax / 100);
      buyData.totalAmount = buyData.amount + buyData.taxAmount;

      amountToPay = buyData.totalAmount;
      break;
  }

  const payload = {
    mode: payMode,
    giftWeight: weight,
    giftValue: weight * buyPrice,
    giftingFeeAmount,
    giftingFeeTax: commissionTax,
    giftingFeeTaxAmount,
    giftingFeeTotalAmount,
    buyData,
    totalAmount: amountToPay,
  };

  return payload;
};
