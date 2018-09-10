import * as cs from '../cardService';
// Default card format #### ####
const defaultFormat = /(\d{1,4})/g;

// List of card options
const mockCards = [
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

describe('cardService', () => {
  it('should match the card options', () => {
    expect(cs.cards).toEqual(mockCards);
  });

  it('should detect card from card number - number input', () => {
    const cardData = cs.cardFromNumber(4242424242424242);
    expect(cardData.type).toEqual('visa');
  });

  it('should detect card from card number - string input', () => {
    const cardData = cs.cardFromNumber('4242424242424242');
    expect(cardData.type).toEqual('visa');
  });

  it('should be True if selected', () => {
    const mockData = {
      selectionStart: 1,
      selectionEnd: 3,
    };
    expect(cs.hasTextSelected(mockData)).toEqual(true);
  });

  it('should be False if NOT selected', () => {
    let mockData = {
      selectionStart: 1,
      selectionEnd: 1,
    };
    expect(cs.hasTextSelected(mockData)).toEqual(false);

    mockData = {
      selectionStart: null,
    };
    expect(cs.hasTextSelected(mockData)).toEqual(false);
  });

  it('should be False for invalid card', () => {
    const cardData = cs.validateCardNumber('4212424242424242');
    expect(cardData).toEqual(false);
  });

  it('should be True for valid card', () => {
    const cardData = cs.validateCardNumber('4242424242424242');
    expect(cardData).toEqual(true);
  });

  it('should be False for invalid expiry date', () => {
    const cardData = cs.isCardDateValid('01', '01');
    expect(cardData).toEqual(false);
  });

  it('should be True for valid expiry date', () => {
    let tempDate = new Date();
    let mockYear = tempDate.getFullYear() + 1;
    mockYear = mockYear.toString().substr(-2);
    const cardData = cs.isCardDateValid('01', mockYear);
    expect(cardData).toEqual(true);
  });

  it('should be False for invalid CVC', () => {
    const cardData = cs.validateCardCVC('20', 'visa');
    expect(cardData).toEqual(false);
  });

  it('should be True for valid CVC', () => {
    const cardData = cs.validateCardCVC('220', 'visa');
    expect(cardData).toEqual(true);
  });

  it('should format card number', () => {
    const cardData = cs.formatCardNumber('4242424242424242');
    expect(cardData).toEqual('4242 4242 4242 4242');
  });
});
