export default function getCustomerFilters(): Array<IFieldsData> {
  return [
    {
      key: 'id',
      value: 'id',
      type: 'string',
      actions: ['CONTAINS', 'EQUALS', 'BEGINS', 'ENDS'],
      label: 'User ID',
    },
    {
      key: 'customerEmail',
      value: 'customerEmail',
      type: 'string',
      actions: ['CONTAINS', 'EQUALS', 'BEGINS', 'ENDS'],
      label: 'Email',
    },
    {
      key: 'orderHistory',
      value: 'orderHistory',
      type: 'number',
      actions: ['GT', 'GTE', 'LT', 'LTE', 'EQUALS'],
      label: '№ of orders',
    },
    {
      key: 'ltv',
      value: 'ltv',
      type: 'number',
      actions: ['GT', 'GTE', 'LT', 'LTE', 'EQUALS'],
      label: 'Life time value',
    },
    {
      key: 'lastOrderValue',
      value: 'lastOrderValue',
      type: 'number',
      actions: ['GT', 'GTE', 'LT', 'LTE', 'EQUALS'],
      label: 'Last order value',
    },
    {
      key: 'scheme',
      value: 'scheme',
      type: 'string',
      actions: ['CONTAINS', 'EQUALS', 'BEGINS', 'ENDS'],
      label: 'Usual payment method',
    },
  ];
}
