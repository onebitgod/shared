import mongoose from 'mongoose';

export const ObjectId = mongoose.Schema.Types.ObjectId;

export const PURE_GOLD_PRODUCT_DESCRIPTION = '24KT Pure Gold';

export const AccountType = {
  CUSTOMER: 'customer',
  BUSINESS: 'business',
  MERCHANT: 'merchant',
  MERCHANT_STAFF: 'merchant_staff',
};

export const MerchantModules = {
  ECOM: 'ecom',
  VERIFIER: 'verifier',
  REFINER: 'refiner',
  RETAILER: 'retailer',
  LEASE_PARTNER: 'lease_partner',
  CUSTODIAN: 'custodian',
  HUB: 'hub',
};

export const serviceTypes = {
  AUTH: 'auth',
  COMMON: 'common',
  CUSTOMER: 'customer',
  BUSINESS: 'business',
  MERCHANT: 'merchant',
};

export const Application = {
  CUSTOMER: 'customer',
  BUSINESS: 'business',
  MERCHANT: 'merchant',
  CAPTAIN: 'captain',
};

export const ValueType = {
  QUANTITY: 'quantity',
  amount: 'amount',
};

export const ValueMode = {
  FIAT: 'fiat',
  TOKEN: 'token',
};

export const PayMode = {
  GOLD_BANK: 'gold_bank',
  PAYMENT_GATEWAY: 'payment_gateway',
};

export const PENDING_PAYMENT = 'pending_payment';

export const PAYMENT_GATEWAY = {
  RAZORPAY: 'razorpay',
  PHONEPE: 'phonepe',
};

export const PHONEPE_PAY_MODE = {
  WEB_PAGE: 'WEB_PAGE',
  UPI_QR: 'upi_qr',
  UPI_INTENT: 'upi_intent',
  UPI_COLLECT: 'upi_collect',
  CARD: 'card',
  NET_BANKING: 'net_banking',
};

export const Variables = {
  BUY_GOLD_GST: 'buy_gold_gst',
  SELL_GOLD_GST: 'sell_gold_gst',
  COMMISSION_GST: 'commission_gst',
  SGST: 'sgst',
  CGST: 'cgst',
  BUY_AMOUNT_LIMIT_NON_KYC: 'buy_amount_limit_non_kyc',
  SELL_AMOUNT_LIMIT_NON_KYC: 'sell_amount_limit_non_kyc',
  APPOINTMENT_MINIMUM_WEIGHT: 'appointment_minimum_weight',
  BANK_TRANSFER_HOURS: 'bank_transfer_hours',
  BID_BUY_PAYMENT_TIME: 'bid_buy_payment_time',
  DECLARATION_TAX: 'declaration_tax',
  GIFT_GOLD_TRANSACTION_CHARGE: 'gift_gold_transaction_charge',
  GIP_BONUS_PERCENTAGE: 'gip_bonus_percentage',
  GIP_HANDLING_PERCENTAGE: 'gip_handling_percentage',
  GIP_HOLD_PERCENTAGE: 'gip_hold_percentage',
  JOINING_BONUS: 'joining_bonus',
  PROXIMITY_DISTANCE: 'proximity_distance',
  REFERRAL_BONUS: 'referral_bonus',
  SELL_RESERVE_REDEEMABLE_PERCENTAGE: 'sell_reserve_redeemable_percentage',
  VERIFIER_FACILITY_CHARGE: 'verifier_facility_charge',
  VERIFIER_VISITING_CHARGE: 'verifier_visiting_charge',
  VERIFIER_VEHICLE_AMOUNT: 'verifier_vehicle_amount',
  VERIFIER_VEHICLE_ZONAL_RADIUS: 'verifier_vehicle_zonal_radius',
  VERIFIER_VEHICLE_ESTIMATED_DAYS: 'verifier_vehicle_estimated_days',
  BG_LIMIT_PERCENTAGE: 'bg_limit_percentage',
  LEASE_PARTNER_INTEREST: 'lease_partner_interest',
  COMMISSION_ON_LEASE: 'commission_on_lease',
  BUY_BADLA: 'buy_badla',
  SELL_BADLA: 'sell_badla',
};

export const ModuleName = {
  INSTANT: 'instant',
  GIP: 'gip',
  SELL_RESERVE: 'sell_reserve',
  APPOINTMENT: 'appointment',
  GPI: 'gpi',
  GIFT_GOLD: 'gift_gold',
  ECOM: 'ecom',
  BID_BUY: 'bid_buy',
  UPLOAD: 'upload',
};

export const ActionName = {
  INSTANT_BUY_GOLD: 'instant_buy_gold',
  INSTANT_SELL_GOLD: 'instant_sell_gold',
  GIP_INITIATE: 'gip_initiate',
  GIP_INSTALLMENT: 'gip_installment',
  GIP_SKIP_INSTALLMENT: 'gip_skip_installment',
  GIP_CANCEL: 'gip_cancel',
  GIP_BONUS: 'bonus',
  GIP_HANDLING_CHARGE: 'gip_handling_charge',
  SELL_RESERVE: 'sell_reserve',
  SELL_RESERVE_HOLD: 'sell_reserve_hold',
  BUY_RESERVE: 'buy_reserve',
  GIFT_GOLD: 'gift_gold',
  UPLOAD_GOLD: 'upload_gold',
  UPLOAD_RELEASE: 'upload_release',
  UPLOAD_INTEREST: 'upload_interest',
  BUSINESS_SETTLEMENT: 'business_settlement',
  BID_BUY_HOLD: 'bid_buy_hold',
  BID_BUY_TRANSFER: 'bid_buy_transfer',
  APPOINTMENT_CREATE: 'appointment_create',
};

export const AuthError = {
  NO_TOKEN: 10001,
  INVALID_TOKEN: 10002,
  TOKEN_EXPIRED: 10003,
  ACCOUNT_DELETED: 10004,
  DEVICE_DELETED: 10005,
};

export const ErrorCode = {
  CUSTOMER_NOT_FOUND: 11,
  ADDRESS_REQUIRED: 12,
  MERCHANT_NOT_FOUND: 13,
  KYC_REQUIRED: 14,
  INVALID_QUOTE: 21,
  QUOTE_ALREADY_PROCESSED: 22,
  QUOTE_EXPIRED: 23,
  BANK_ACCOUNT_NOT_FOUND: 24,
};

export const StateName = {
  AN: 'Andaman and Nicobar Islands',
  AP: 'Andhra Pradesh',
  AR: 'Arunachal Pradesh',
  AS: 'Assam',
  BR: 'Bihar',
  CG: 'Chandigarh',
  CH: 'Chhattisgarh',
  DN: 'Dadra and Nagar Haveli',
  DD: 'Daman and Diu',
  DL: 'Delhi',
  GA: 'Goa',
  GJ: 'Gujarat',
  HR: 'Haryana',
  HP: 'Himachal Pradesh',
  JK: 'Jammu and Kashmir',
  JH: 'Jharkhand',
  KA: 'Karnataka',
  KL: 'Kerala',
  LA: 'Ladakh',
  LD: 'Lakshadweep',
  MP: 'Madhya Pradesh',
  MH: 'Maharashtra',
  MN: 'Manipur',
  ML: 'Meghalaya',
  MZ: 'Mizoram',
  NL: 'Nagaland',
  OR: 'Odisha',
  PY: 'Puducherry',
  PB: 'Punjab',
  RJ: 'Rajasthan',
  SK: 'Sikkim',
  TN: 'Tamil Nadu',
  TS: 'Telangana',
  TR: 'Tripura',
  UP: 'Uttar Pradesh',
  UK: 'Uttarakhand',
  WB: 'West Bengal',
};

export const ReportPreference = {
  MERCHANT_FINANCIAL: [
    { label: 'Invoice Number', value: 'invoiceNumber' },
    { label: 'Date', value: 'createdAt' },
    { label: 'Billed To', value: 'billedTo' },
    { label: 'Total Amount', value: 'totalAmount' },
    { label: 'Status', value: 'status' },
  ],
};

export const MimeToType = {
  'image/png': 'image',
  'image/jpg': 'image',
  'image/jpeg': 'image',
  'application/pdf': 'pdf',
  'application/zip': 'zip',
  'application/json': 'json',
  'text/plain': 'text',
};
