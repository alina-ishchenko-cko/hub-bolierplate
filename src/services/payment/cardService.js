// @flow
import moment from 'moment';

// Default card format #### ####
const defaultFormat = /(\d{1,4})/g;

// List of card options
export const cards: Array<Object> = [
  {
    type: 'maestro',
    pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
    format: defaultFormat,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'dinersclub',
    pattern: /^(36|38|30[0-5])/,
    format: defaultFormat,
    length: [14],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'laser',
    pattern: /^(6706|6771|6709)/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'jcb',
    pattern: /^35/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'unionpay',
    pattern: /^62/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: false,
  },
  {
    type: 'discover',
    pattern: /^(6011|65|64[4-9]|622)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'mastercard',
    pattern: /^(5[1-5]|2[221-720])/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true,
  },
  {
    type: 'amex',
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [3, 4],
    luhn: true,
  },
  {
    type: 'visa',
    pattern: /^4/,
    format: defaultFormat,
    length: [13, 14, 15, 16],
    cvcLength: [3],
    luhn: true,
  },
];

// Removes ant extra spaces
function trim(str: string | number): string {
  return str.toString().replace(/^\s+|\s+$/g, '');
}

const luhnCheck = (num: number): boolean => {
  let digit,
    digits = num
      .toString()
      .split('')
      .reverse(),
    sum = 0,
    odd = true;

  digits.forEach(x => {
    digit = parseInt(x, 10);

    if ((odd = !odd)) digit *= 2; // eslint-disable-line

    if (digit > 9) {
      digit -= 9;
    }

    sum += digit;
  });
  return sum % 10 === 0;
};

/**
 * Find card from card type name
 * @param {string} type
 * @returns {object}
 */
export const cardFromType = (type: string): ?Object => {
  const foundCard = cards.find(card => card.type === type);
  return foundCard || undefined;
};

/**
 * Detect card type from card numer
 * @param {string|number} num
 * @returns {object}
 */
export const cardFromNumber = (num: string | number): ?Object => {
  if (!num) {
    return null;
  }
  num = num.toString().replace(/\D/g, '');
  const foundCard = cards.find(card => card.pattern.test(num) === true);
  return foundCard || null;
};

/**
 * Check if text is selected
 * @param {object} elm
 * @returns {boolean}
 */
export const hasTextSelected = (elm: Object): boolean => {
  if (elm.selectionStart !== null && elm.selectionStart !== elm.selectionEnd) {
    return true;
  }
  return false;
};

/**
 * Validate the card number
 * @param {string|number} num
 * @returns {boolean}
 */
export function validateCardNumber(num: any): boolean {
  if (!num) {
    return false;
  }

  let card;
  num = num.toString().replace(/\s+|-/g, '');
  if (!/^\d+$/.test(num)) {
    return false;
  }
  card = cardFromNumber(num);

  return card
    ? card.length.indexOf(num.length) >= 0 &&
        (card.luhn === false || luhnCheck(num))
    : false;
}

/**
 * Validate card expiry date
 * @param {object|number} month
 * @param {object|number} year
 * @returns {boolean}
 */
export function isCardDateValid(month: any, year: any): boolean {
  if (typeof month === 'object' && month.hasOwnProperty('month')) {
    year = month.year;
    month = month.month;
  }
  if (!(month && year)) {
    return false;
  }

  month = trim(month);
  year = trim(year);
  if (!/^\d+$/.test(month)) {
    return false;
  }
  if (!/^\d+$/.test(year)) {
    return false;
  }
  if (parseInt(month, 10) > 12) {
    return false;
  }
  if (year.length === 2) {
    year =
      moment()
        .format('YYYY')
        .substr(0, 2) + year;
  }

  const expirationFormat = `${year}-${month}-1`;
  const expirationDate = moment(expirationFormat, 'YYYY-M-D');
  const today = moment();
  return !today.isAfter(expirationDate);
}

/**
 * Validate CVC number
 * @param {string|number} cvc
 * @param {string} type
 * @returns {boolean}
 */
export function validateCardCVC(cvc: string | number, type: string): boolean {
  let card;
  cvc = trim(cvc);
  if (!/^\d+$/.test(cvc)) {
    return false;
  }
  if (type) {
    card = cardFromType(type);
    return card ? card.cvcLength.indexOf(cvc.length) >= 0 : false;
  }
  return cvc.length >= 3 && cvc.length <= 4;
}

/**
 * Format card number
 * @param {string} num
 * @returns {string}
 */
export function formatCardNumber(num: string): string {
  let card = cardFromNumber(num),
    groups,
    upperLength,
    ref,
    result;
  if (!card) {
    return num;
  }
  upperLength = card.length[card.length.length - 1];
  num = num.replace(/\D/g, '');
  num = num.slice(0, +upperLength + 1 || 9e9);
  if (card.format.global) {
    result =
      (ref = num.match(card.format)) !== null // eslint-disable-line
        ? // $FlowFixMe
          ref.join(' ')
        : undefined;
  } else {
    groups = card.format.exec(num);
    if (groups !== null) {
      groups.shift();
    }
    result = groups !== null ? groups.join(' ') : undefined;
  }

  return result || '';
}
