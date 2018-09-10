export default function getTransactionFilters(
  currencies,
  paymentMethods
): Array<IFieldsData> {
  return [
    {
      key: 'ccName',
      value: 'ccName',
      type: 'string',
      actions: ['CONTAINS', 'EQUALS', 'BEGINS', 'ENDS'],
      label: 'Customer',
    },
    {
      key: 'ccNumber',
      value: 'ccNumber',
      type: 'card_number',
      actions: ['CONTAINS', 'BEGINS', 'ENDS'],
      label: 'Card Number',
    },
    {
      key: 'currencySymbol',
      value: 'currencySymbol',
      type: 'currencies',
      label: 'Currency',
      selectionOptions: currencies.map(currency => ({
        key: currency.currencyId,
        value: currency.name,
        label: currency.name,
      })),
    },
    {
      key: 'customerEmail',
      value: 'customerEmail',
      type: 'string',
      actions: ['CONTAINS', 'EQUALS', 'BEGINS', 'ENDS'],
      label: 'Customer Email',
    },
    {
      key: 'scheme',
      value: 'scheme',
      type: 'payment_methods',
      label: 'Payment Method',
      selectionOptions: paymentMethods.map((scheme, index) => ({
        key: `${scheme.name}-${index}`,
        value: scheme.name,
        label: scheme.name.toUpperCase(),
      })),
    },
    {
      key: 'trackId',
      value: 'trackId',
      type: 'string',
      actions: ['CONTAINS', 'EQUALS', 'BEGINS', 'ENDS'],
      label: 'Track ID',
    },
    {
      key: 'amount',
      value: 'amount',
      type: 'value',
      actions: [
        'CONTAINS',
        'EQUALS',
        'BEGINS',
        'ENDS',
        'GT',
        'GTE',
        'LT',
        'LTE',
      ],
      label: 'Value',
    },
  ];
}
