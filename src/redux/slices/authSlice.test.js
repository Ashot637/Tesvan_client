import { authReducer, fetchLogin, fetchAuthMe, fetchCode } from './authSlice';

describe('auth slice', () => {
  describe('fetchLogin', () => {
    test('should handle fetchLogin.fulfilled', () => {
      const initialState = {
        admin: null,
        status: 'waiting',
        waitingCode: false,
        inValid: false,
        inValidCode: false,
      };
      const payload = { id: 1, name: 'John' };
      const newState = authReducer(initialState, fetchLogin.fulfilled(payload));

      expect(newState.waitingCode).toEqual(true);
      expect(newState.inValid).toEqual(false);
    });

    test('should handle fetchLogin.rejected', () => {
      const initialState = {
        admin: null,
        status: 'waiting',
        waitingCode: false,
        inValid: false,
        inValidCode: false,
      };
      const newState = authReducer(initialState, fetchLogin.rejected);

      expect(newState.inValid).toEqual(true);
    });
  });

  describe('fetchAuthMe', () => {
    test('should handle fetchAuthMe.pending', () => {
      const initialState = {
        admin: null,
        status: 'waiting',
        waitingCode: false,
        inValid: false,
        inValidCode: false,
      };
      const newState = authReducer(initialState, fetchAuthMe.pending);

      expect(newState.status).toEqual('loading');
      expect(newState.admin).toEqual(null);
    });

    test('should handle fetchAuthMe.rejected', () => {
      const initialState = {
        admin: null,
        status: 'waiting',
        waitingCode: false,
        inValid: false,
        inValidCode: false,
      };
      const newState = authReducer(initialState, fetchAuthMe.rejected);

      expect(newState.status).toEqual('error');
      expect(newState.admin).toEqual(null);
    });

    test('should handle fetchAuthMe.fullfiled', () => {
      const initialState = {
        admin: null,
        status: 'waiting',
        waitingCode: false,
        inValid: false,
        inValidCode: false,
      };
      const payload = { id: 1, name: 'John' };
      const newState = authReducer(initialState, fetchAuthMe.fulfilled(payload));

      expect(newState.status).toEqual('success');
      expect(newState.admin).toEqual(payload);
    });
  });

  describe('fetchCode', () => {
    test('should handle fetchCode.pending', () => {
      const initialState = {
        admin: null,
        status: 'waiting',
        waitingCode: false,
        inValid: false,
        inValidCode: false,
      };
      const newState = authReducer(initialState, fetchCode.pending);

      expect(newState.status).toEqual('loading');
      expect(newState.admin).toEqual(null);
    });

    test('should handle fetchCode.rejected', () => {
      const initialState = {
        admin: null,
        status: 'waiting',
        waitingCode: false,
        inValid: false,
        inValidCode: false,
      };
      const newState = authReducer(initialState, fetchCode.rejected);

      expect(newState.status).toEqual('error');
      expect(newState.admin).toEqual(null);
      expect(newState.inValidCode).toEqual(true);
    });

    test('should handle fetchCode.fullfiled', () => {
      const initialState = {
        admin: null,
        status: 'waiting',
        waitingCode: false,
        inValid: false,
        inValidCode: false,
      };
      const payload = { id: 1, name: 'John' };
      const newState = authReducer(initialState, fetchCode.fulfilled(payload));

      expect(newState.status).toEqual('success');
      expect(newState.admin).toEqual(payload);
    });
  });
});
