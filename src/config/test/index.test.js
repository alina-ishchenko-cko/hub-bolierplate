import * as React from 'react';
import * as config from '../index';
import responseCodes from '../responseCodes.json';

describe('Config', () => {
  it('should contain ACTIONS_OVERVIEW', () => {
    const data = [
      {
        id: 1,
        name: 'Capture',
        supportBatch: true,
      },
      {
        id: 2,
        name: 'Void',
        supportBatch: true,
      },
      {
        id: 3,
        name: 'Refund',
        supportBatch: true,
      },
      {
        id: 4,
        name: 'Blacklist',
        requiresReadPermissionOnly: true,
      },
    ];
    expect(config.ACTIONS_OVERVIEW).toEqual(data);
  });

  it('should contain ERROR_CODES', () => {
    const data = {
      TOKEN_EXPIRED: 83023,
      PASSWORD_DONT_MATCH: 83026,
      PASSWORD_RESET_REQUIRED: 83015,
      PASSWORD_EXPIRED: 83008,
      INVALID_LOGIN: 83011,
      PASSWORD_ALREADY_USED: 83017,
      EMAIL_NOT_REGISTERED: 83043,
    };
    expect(config.ERROR_CODES).toEqual(data);
  });

  it('should contain RESPONSE_CODES', () => {
    const data = responseCodes;
    expect(config.RESPONSE_CODES).toEqual(data);
  });

  it('should contain ERROR_CODE_TITLE', () => {
    const data = {
      '83023': 'Token Expired',
      '83026': 'Password Error',
      '83015': 'Password Reset Required',
      '83008': 'Password Expired',
      '83011': 'Invalid Login',
      '83017': 'Password Already Used',
      '83043': 'Invaild Email Address',
      '83016': 'Too Many Login Attempts',
      '82001': 'Internal Error',
    };
    expect(config.ERROR_CODE_TITLE).toEqual(data);
  });

  it('should contain PASSWORD', () => {
    const data = {
      UPPER_CASE: /(?=(?:.*[A-Z]){1,})/,
      LOWER_CASE: /(?=(?:.*[a-z]){1,})/,
      SPECIAL_CHARACTERS: /(?=(?:.*[`~!<>€£@#$%^&*()_\-|'+=]){1,})/,
      LENGTH: /^.{8,15}$/,
      NUMBER: /(?=(?:.*[0-9]){1,})/,
    };
    expect(config.PASSWORD).toEqual(data);
  });

  it('should contain ENTITY_TYPE', () => {
    const data = {
      GATEWAY: 1,
      ACCOUNT: 2,
      PROPERTY: 3,
      BUSINESS: 3,
      CHANNEL: 4,
    };
    expect(config.ENTITY_TYPE).toEqual(data);
  });

  it('should contain ACTIONS_ENUMS', () => {
    const data = {
      CAPTURE: 1,
      VOID: 2,
      BLACKLIST: 4,
      REFUND: 8,
    };
    expect(config.ACTIONS_ENUMS).toEqual(data);
  });

  it('should contain ACCOUNT_TYPE', () => {
    const data = {
      GOD: 1,
      SUPER_ADMIN: 2,
      MERCHANT_ADMIN: 3,
      MERCHANT_USER: 4,
    };
    expect(config.ACCOUNT_TYPE).toEqual(data);
  });

  it('should contain OPERATION', () => {
    const data = {
      CREATE: 1,
      READ: 2,
      UPDATE: 4,
      DELETE: 8,
    };
    expect(config.OPERATION).toEqual(data);
  });
});
