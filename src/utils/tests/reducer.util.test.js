import * as util from '../reducer.util';

describe('Reducer Utils', () => {
  describe('buildReducer()', () => {
    let handler;
    let DEFAULT_STATE;
    beforeEach(() => {
      DEFAULT_STATE = {
        success: false,
      };

      handler = {
        ACTION_PENDING: (state, action) => ({
          ...state,
          success: true,
          data: [...action.payload.data],
        }),
      };
    });

    it('should return default state', () => {
      const actionResponse = {
        type: 'ACTION_SUCCESS',
        payload: {
          data: [1, 2, 3, 4],
        },
      };

      const mockReducer = util.buildReducer(handler, DEFAULT_STATE);
      const mockStore = mockReducer(DEFAULT_STATE, actionResponse);
      expect(mockStore).toEqual({
        success: false,
      });
    });

    it('should return updated state', () => {
      const actionResponse = {
        type: 'ACTION_PENDING',
        payload: {
          data: [1, 2, 3, 4],
        },
      };

      const mockReducer = util.buildReducer(handler, DEFAULT_STATE);
      const mockStore = mockReducer(DEFAULT_STATE, actionResponse);
      expect(mockStore).toEqual({
        success: true,
        data: [1, 2, 3, 4],
      });
    });
  });
});
