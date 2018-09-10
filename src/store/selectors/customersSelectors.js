import * as React from 'react';
import { createSelector } from 'reselect';
import CkoCurrencyFormat from 'components/ui/CkoCurrencyFormat';

export const getIndicatorsObject = ({ customers }) => customers.indicators;
export const getCurrencySymbol = ({ login }) => {
  if (login.userData && login.userData.currency)
    return login.userData.currency.name;
};

export const getIndicators = createSelector(
  [getIndicatorsObject, getCurrencySymbol],
  ({ data = {}, loading }, currencySymbol) => {
    const {
      uniqueCustomers,
      returningCustomers,
      averageSpend,
      uniqueVisitors = 'SOON'
    } = data;
    const dataObj = [
      {
        title: 'Customers',
        value: uniqueCustomers
      },
      {
        title: 'Returning Customers',
        value: `${returningCustomers}%`
      },
      {
        title: 'Average Spend',
        value: (
          <CkoCurrencyFormat prefix={currencySymbol} value={averageSpend} />
        )
      },
      {
        title: 'Unique Visitors',
        value: uniqueVisitors
      }
    ];

    return {
      data: dataObj,
      loading
    };
  }
);
