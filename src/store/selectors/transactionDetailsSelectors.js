import * as React from 'react';
import moment from 'moment';
import { createSelector } from 'reselect';
import { assetsPath } from 'utils/ui.util';
import CkoCurrencyFormat from 'components/ui/CkoCurrencyFormat';

export const getIndicatorsObject = transactionDetails =>
  transactionDetails.indicators || {};

export const getIndicators = createSelector(
  [getIndicatorsObject],
  indicators => {
    const {
      currencySymbol,
      paymentMethodName,
      transactionValue,
      transactionDate,
      transactionStatus,
    } = indicators;
    return [
      {
        title: 'Value',
        value: (
          <CkoCurrencyFormat prefix={currencySymbol} value={transactionValue} />
        ),
        subInfo: (
          <img
            style={{ height: 24, float: 'right' }}
            alt="payment method"
            src={`${assetsPath}/tx_logos/${paymentMethodName}.png`}
          />
        ),
      },
      {
        title: 'Status',
        value: transactionStatus,
        subInfo: new moment(transactionDate).format('DD/MM/YYYY HH:mm:ss'),
      },
    ];
  }
);
