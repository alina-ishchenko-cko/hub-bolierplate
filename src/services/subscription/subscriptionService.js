import find from 'lodash/find';
import pick from 'lodash/pick';
import assign from 'lodash/assign';
import some from 'lodash/some';
import keys from 'lodash/keys';
import includes from 'lodash/includes';
import { currencyService } from 'services/currency/currencyService';

/**
 * List of Frequency values for payment subscriptions.
 * @type {array}
 */
export const frequencies = [
  { name: 'Daily', noun: 'Day', code: '1d', unit: 'd' },
  { name: 'Weekly', noun: 'Week', code: '1w', unit: 'w' },
  { name: 'Monthly', noun: 'Month', code: '1m', unit: 'm' },
  { name: 'Every 3 Months', noun: 'Month', code: '3m', unit: 'm' },
  { name: 'Every 6 Months', noun: 'Month', code: '6m', unit: 'm' },
  { name: 'Yearly', noun: 'Year', code: '1y', unit: 'y' },
  { name: 'Custom', noun: undefined, code: undefined, unit: undefined }
];

export const getFrequencyString = cycle => {
  // Get all leading digits
  const regex = /^(\d+)/;
  const unit = cycle.slice(-1);
  let frequencyString = 'Unknown';

  const found = find(frequencies, frequency => unit === frequency.unit);

  if (found) {
    const result = regex.exec(cycle);

    if (result) {
      if (result[0] > 1) {
        frequencyString = `Every ${result[0]} ${found.noun}s`;
      } else {
        frequencyString = `Every ${found.noun}`;
      }
    }
  }

  return frequencyString;
};

export const convertCentsWorth = (
  toCents,
  object,
  currency,
  valueFields = ['value']
) => {
  // if (!_(object).keys().some(k => _(valueFields).includes(k))) {
  if (!some(keys(object), k => includes(valueFields, k))) {
    // return the original if no value fields exist on the object
    return object;
  }

  const theCurrency = currency || object.currency;
  const currencyObject = currencyService.wrap(theCurrency);

  const updatedValues = toCents
    ? currencyObject.convertToCents(pick(object, valueFields))
    : currencyObject.convertFromCents(pick(object, valueFields));

  return assign({}, object, updatedValues);
};
