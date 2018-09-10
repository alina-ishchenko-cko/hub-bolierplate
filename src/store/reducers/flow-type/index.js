// @flow

export type LoginLookUps = {
  loading: boolean,
  success: boolean,
  error: boolean,
  countries: Array<Object>,
  currencies: Array<Object>,
  paymentMethods: Array<Object>,
};

export type LoginData = {
  loading: boolean,
  success: boolean,
  error: boolean,
  accountId: number,
  accountTypeId: number,
  accountTypeName: string,
  displayCurrencyId: number,
  displayCurrencyName: string,
  displayCurrencySymbol: string,
  email: string,
  isActive: boolean,
  lastLoginDate: string,
  name: string,
  permissions: Array<Object>,
  phone: {
    countryCode: string,
    number: string,
  },
  timezone: string,
  token: string,
  userId: number,
  isReadOnly: boolean,
  isMerchantAdmin: boolean,
  isSuperAdmin: boolean,
  isGodUser: boolean,
  twoFactorEnabled: boolean,
};

export type Account = {
  loading: boolean,
  error: boolean,
  assetsLoading: boolean,
  assetsError: boolean,
  assetsSuccess: boolean,
  accounts: Array<Object>,
  businesses: Object,
};

export type Selected = {
  account: {
    id: ?number,
    title: string,
  },
  business: {
    id: ?number,
    title: string,
  },
  channel: {
    id: ?number,
    title: string,
  },
};

export type AccountChannel = {
  loading: boolean,
  error: boolean,
  currencies: Array<number>,
};

export type TransactionKPI = {
  loading: boolean,
  error: boolean,
  averageSaleAmount: number,
  totalRevenueAmount: number,
  totalSalesCount: number,
  chargebacks: {
    revenuePercentage: number,
    salesPercentage: number,
    totalAmount: number,
    totalCount: number,
  },
  refunds: {
    revenuePercentage: number,
    salesPercentage: number,
    totalAmount: number,
    totalCount: number,
  },
};

export type TransactionList = {
  loading: boolean,
  error: boolean,
  success: boolean,
  startIndex: number,
  totalRows: number,
  headers: Array<string>,
  datas: Array<string>,
};

export type TransactionPayment = {
  loading: boolean,
  error: boolean,
  errorMsg: string,
  success: boolean,
};

export type Actions = {
  void: {
    loading: boolean,
    error: boolean,
    success: boolean,
    status: string,
    batch: {
      loading: boolean,
      error: boolean,
      success: boolean,
    },
  },
  capture: {
    loading: boolean,
    error: boolean,
    success: boolean,
    status: string,
    batch: {
      loading: boolean,
      error: boolean,
      success: boolean,
    },
  },
  refund: {
    loading: boolean,
    error: boolean,
    success: boolean,
    status: string,
    batch: {
      loading: boolean,
      error: boolean,
      success: boolean,
    },
  },
  blacklist: {
    loading: boolean,
    error: boolean,
    success: boolean,
    status: string,
  },
};

export type BlackListData = {
  loading: boolean,
  error: boolean,
  success: boolean,
  email: boolean,
  emailValue: string,
  cardNumberValue: string,
  phoneNumberValue: string,
  phoneNumber: boolean,
  cardNumber: boolean,
  ipAddressValue: string,
  ipAddress: boolean,
  isLocalBlackList: boolean,
};

export type tDataDetails = {
  arn: string,
  authorizationCode: string,
  authorizationDate: string,
  billingDescriptor: string,
  chargeId: string,
  longResponseCode: string,
  shortResponseCode: string,
  trackId: string,
  transactionIndicator: string,
};

export type tIndicator = {
  currencySymbol: string,
  paymentMethodName: string,
  transactionDate: string,
  transactionStatus: string,
  transactionValue: number,
};

export type tPaymentMethods = {
  avsCheck: string,
  avsDescription: string,
  bankCountry: string,
  cardHolder: string,
  cardId: string,
  cardProduct: string,
  cardWalletType: number,
  ccNumber: string,
  customerId: string,
  customerName: string,
  cvvCheck: string,
  cvvDescription: string,
  cvvPresent: boolean,
  expiryMonth: number,
  expiryYear: number,
  issuingBank: string,
  paymentMethod: string,
};

export type tPurchases = {
  captureTransactionId: string,
  currencyId: number,
  currencySymbol: string,
  customerIp: string,
  customerIpCountryIso3: string,
  description: string,
  maxRefundAmount: number,
  product: Array<Object>,
  shippingAddress: {
    addressLine1: string,
    addressLine2: string,
    city: string,
    country: string,
    phone: { number: string },
    postCode: string,
    recipientName: string,
    state: string,
    userDefined: string,
  },
  userData: Object,
};

export type CUSTOMER_DETAILS = {
  details: {
    loading: boolean,
    error: boolean,
  },
  transactions: {
    loading: boolean,
    error: boolean,
    data: [],
  },
  cardActions: {
    update: {
      loading: boolean,
      error: boolean,
      success: boolean,
    },
    delete: {
      loading: boolean,
      error: boolean,
      success: boolean,
    },
    default: {
      loading: boolean,
      error: boolean,
      success: boolean,
    },
  },
  associatedPaymentPlans: {
    loading: boolean,
    error: boolean,
    data: Array<Object>,
  },
  actions: {
    changeStatus: {
      loading: boolean,
      error: boolean,
    },
    delete: {
      loading: boolean,
      error: boolean,
    },
    edit: {
      loading: boolean,
      error: boolean,
    },
    updateDetails: {
      loading: boolean,
      error: boolean,
    },
    createPayment: {
      loading: boolean,
      error: boolean,
    },
    addCreditCard: {
      loading: boolean,
      error: boolean,
    },
    addPaymentPlan: {
      loading: boolean,
      error: boolean,
    },
  },
};

export type CUSTOMER_INDICATORS = {
  loading: false,
  error: false,
  uniqueCustomers: 0,
  returningCustomers: 0,
  averageSpend: 0,
};
