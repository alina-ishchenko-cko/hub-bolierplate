// @flow
import { LOGIN_TYPE } from 'store/constants';
import { ENTITY_TYPE } from 'config';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { userSession } from 'services/localDataApi';

type dispatchAlias = (Object | Function) => {};

/**
 * Action to delete an associated card
 * @param {Promise} promiseReq Ajax request promise
 * @param {String} pendingType action type
 * @param {Object} success action type
 * @param {String} error action type
 * @param {Boolean} signoutOn401 should signout if 401 response
 * @return {Function}
 */
export function dispatchResponse(
  promiseReq: Promise<Object>,
  pendingType?: string | null | Object = {},
  success: string | Object = {},
  error: string = '',
  signoutOn401: boolean = true,
  showProgress: boolean = false
): Function {
  return function(dispatch: dispatchAlias) {
    if (showProgress) {
      dispatch(hideLoading());
      dispatch(showLoading());
    }

    if (pendingType) {
      dispatch(
        typeof pendingType === 'string' ? { type: pendingType } : pendingType
      );
    }

    return promiseReq
      .then(checkStatus)
      .then(dispatchSuccess(success, dispatch, showProgress))
      .catch(dispatchError(error, dispatch, signoutOn401));
  };
}

/**
 * Handles the request status code.
 * If > 300 then throw error
 * @param {Object|String} response request response data
 * @returns {Object}
 */
export function checkStatus(response: {
  status: number,
  statusText: string,
}): Object {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error: Object = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Handles the request success response
 * @param {Object|String} success action type
 * @param {Function} dispatch callback function to dispatch the data
 * @returns {Function}
 */
export function dispatchSuccess(
  success: string | Object,
  dispatch: dispatchAlias,
  showProgress: boolean
): Function {
  return ({ data }) => {
    if (showProgress) dispatch(hideLoading());

    // Save last request date and time
    userSession.save();

    if (typeof success === 'string') {
      dispatch({ type: success });
    } else {
      dispatch({
        ...success,
        payload: { data },
      });
    }
  };
}

/**
 * Handles the request error response
 * @param {object|string} error action type
 * @param {function} dispatch callback function to dispatch the data
 * @param {boolean} signoutOn401 should signout if 401 response
 * @returns {function}
 */
export function dispatchError(
  error: string | Object,
  dispatch: dispatchAlias,
  signoutOn401: boolean = true
): Function {
  return (errorData: Object) => {
    if (
      signoutOn401 &&
      errorData.response &&
      errorData.response.status.toString() === '401'
    ) {
      return dispatch({ type: LOGIN_TYPE.SIGN_OUT, sessionEnd: true });
    }

    return dispatch({
      type: error,
      payload: {
        data: errorData.response ? errorData.response.data : errorData,
      },
    });
  };
}

/**
 * Creates the entity object which contains
 * id, typeId and type;
 * @param {object} dataObj
 * @returns {object}
 */
export function getEntity(dataObj: {
  channelId: ?number,
  businessId: ?number,
  accountId: ?number,
}): Object {
  const entityObj = {};
  if (!dataObj) {
    return {};
  }

  if (dataObj.channelId) {
    entityObj.id = dataObj.channelId;
    entityObj.typeId = ENTITY_TYPE.CHANNEL;
    entityObj.type = 'channels';
  } else if (dataObj.businessId) {
    entityObj.id = dataObj.businessId;
    entityObj.typeId = ENTITY_TYPE.BUSINESS;
    entityObj.type = 'businesses';
  } else if (dataObj.accountId) {
    entityObj.id = dataObj.accountId;
    entityObj.typeId = ENTITY_TYPE.ACCOUNT;
    entityObj.type = 'accounts';
  }
  return entityObj;
}

export function dispatchBatchResponse(
  promiseReq: Function,
  batchParams: Array<any>,
  config: Object
): Function {
  return function(dispatch: dispatchAlias) {
    let requestIndex = 0;
    const batchLength = batchParams.length - 1;

    dispatch({ type: config.pending });

    const promiseRecursion = () => {
      const promiseParams = batchParams[requestIndex];
      if (requestIndex <= batchLength) {
        promiseReq(...promiseParams)
          .then(data => {
            requestIndex++;
            promiseRecursion();
          })
          .catch(errorData => {
            return dispatch({ type: config.error });
          });
      } else {
        return dispatch({ type: config.success });
      }
    };

    return promiseRecursion();
  };
}
