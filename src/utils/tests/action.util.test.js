import * as helper from '../action.util';
import { LOGIN_TYPE } from 'store/constants';
import moment from 'moment';
import { ENTITY_TYPE } from 'config';

describe('Actions Utils', () => {
  describe('dispatchResponse()', () => {
    it('should return PENDING and SUCCESS types', () => {
      const promiseReq = new Promise((resolve, reject) => {
        resolve({
          status: 200,
        });
      });

      const response = helper.dispatchResponse(
        promiseReq,
        'PENDING',
        'SUCCESS',
        'ERROR'
      );

      return response(data => {
        if (data.type && data.type === 'PENDING') {
          expect(data).toEqual({ type: 'PENDING' });
        } else {
          expect(data).toEqual({ type: 'SUCCESS' });
        }
      });
    });

    it('should return PENDING and ERROR types', () => {
      const promiseReq = new Promise((resolve, reject) => {
        reject('Oops!');
      });

      const response = helper.dispatchResponse(
        promiseReq,
        'PENDING',
        'SUCCESS',
        'ERROR'
      );

      return response(data => {
        if (data.type && data.type === 'PENDING') {
          expect(data).toEqual({ type: 'PENDING' });
        } else {
          expect(data).toEqual({ payload: { data: 'Oops!' }, type: 'ERROR' });
        }
      });
    });

    it('should return PENDING and SUCCESS response obj', () => {
      const promiseReq = new Promise((resolve, reject) => {
        resolve({ status: 200, data: 'Hello' });
      });

      const response = helper.dispatchResponse(
        promiseReq,
        'PENDING',
        { type: 'SUCCESS' },
        'ERROR'
      );

      return response(data => {
        if (data.type && data.type === 'PENDING') {
          expect(data).toEqual({ type: 'PENDING' });
        } else {
          expect(data).toEqual({ payload: { data: 'Hello' }, type: 'SUCCESS' });
        }
      });
    });
  });

  describe('getEntity()', () => {
    it('should return empty string as default', () => {
      expect(helper.getEntity()).toEqual({});
    });

    it('should return params for channelSelected', () => {
      const obj = { channelId: 1002 };
      let expectVal = {
        id: 1002,
        typeId: ENTITY_TYPE.CHANNEL,
        type: 'channels',
      };
      expect(helper.getEntity(obj)).toEqual(expectVal);
    });

    it('should return params for channelSelected', () => {
      const obj = { businessId: 1003 };
      let expectVal = {
        id: 1003,
        typeId: ENTITY_TYPE.BUSINESS,
        type: 'businesses',
      };
      expect(helper.getEntity(obj)).toEqual(expectVal);
    });

    it('should return params for accountSelected', () => {
      const obj = { accountId: 1004 };
      let expectVal = {
        id: 1004,
        typeId: ENTITY_TYPE.ACCOUNT,
        type: 'accounts',
      };
      expect(helper.getEntity(obj)).toEqual(expectVal);
    });

    it('should select the channel property', () => {
      const obj = {
        channelId: 1004,
        businessId: 1003,
      };
      const expectVal = {
        id: 1004,
        typeId: ENTITY_TYPE.CHANNEL,
        type: 'channels',
      };
      expect(helper.getEntity(obj)).toEqual(expectVal);
    });

    it('should select the business property', () => {
      const obj = {
        accountId: 1004,
        businessId: 1003,
      };
      let expectVal = {
        id: 1003,
        typeId: ENTITY_TYPE.BUSINESS,
        type: 'businesses',
      };
      expect(helper.getEntity(obj)).toEqual(expectVal);
    });
  });

  describe('checkStatus', () => {
    it('should NOT throw error when status 200', () => {
      const checkStatus = helper.checkStatus({ status: 200, data: { id: 1 } });
      expect(checkStatus).toEqual({ status: 200, data: { id: 1 } });
    });

    it('should NOT throw error when status 201', () => {
      const checkStatus = helper.checkStatus({ status: 201, data: { id: 1 } });
      expect(checkStatus).toEqual({ status: 201, data: { id: 1 } });
    });

    it('should Throw error when status 401', () => {
      expect(() => {
        helper.checkStatus({ status: 401, statusText: 'Oops!' });
      }).toThrow('Oops!');
    });
  });

  describe('dispatchSuccess', () => {
    it('should call dispatch success string', () => {
      const dispatch = jest.fn();
      const dispatchSuccess = helper.dispatchSuccess(
        'SHOW_LIST_SUCCESS',
        dispatch
      );
      dispatchSuccess({});
      expect(dispatch).toHaveBeenCalledWith({ type: 'SHOW_LIST_SUCCESS' });
    });

    it('should call dispatch with correct args', () => {
      const dispatch = jest.fn();
      const dispatchSuccess = helper.dispatchSuccess(
        { type: 'SHOW_LIST_SUCCESS' },
        dispatch
      );
      dispatchSuccess({ data: { id: 1 } });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SHOW_LIST_SUCCESS',
        payload: { data: { id: 1 } },
      });
    });
  });

  describe('dispatchError', () => {
    it('should call dispatch error and signout on 401', () => {
      const dispatch = jest.fn();
      const dispatchError = helper.dispatchError('SHOW_LIST_ERROR', dispatch);
      dispatchError({
        response: {
          status: 401,
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: LOGIN_TYPE.SIGN_OUT,
        sessionEnd: true,
      });
    });

    it('should call dispatch error with error data', () => {
      const dispatch = jest.fn();
      const dispatchError = helper.dispatchError('SHOW_LIST_ERROR', dispatch);
      dispatchError({
        message: 'Oops!',
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SHOW_LIST_ERROR',
        payload: { data: { message: 'Oops!' } },
      });
    });

    it('should call dispatch error with error response', () => {
      const dispatch = jest.fn();
      const dispatchError = helper.dispatchError('SHOW_LIST_ERROR', dispatch);
      dispatchError({
        response: {
          data: 'Oops!',
          status: 200,
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SHOW_LIST_ERROR',
        payload: { data: 'Oops!' },
      });
    });
  });
});
