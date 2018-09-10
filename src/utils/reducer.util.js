// @flow
type Handler = {
  [string]: (state: Object, action: Object) => {},
};

/**
 * Construct's the reducer methods
 * @param {Object} handler
 * @param {Object} defaultState
 */
export function buildReducer(handler: Handler, defaultState: Object) {
  return function reducer(state: Object = defaultState, action: Object) {
    // Check if handler type is an function
    if (action !== void 0 && typeof handler[action.type] === 'function') {
      return handler[action.type](state, action);
    }
    return state;
  };
}
