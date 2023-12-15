import { configureStore } from '@reduxjs/toolkit';
import {
  addDeviceComparing,
  compareReducer,
  fetchCompareingDevcies,
  removeAllComparing,
  removeDeviceComparing,
} from './compareSlice';

describe('compare slice', () => {
  describe('async actions', () => {
    test('should handle fetchCompareingDevcies.fulfilled', () => {
      const initialState = { devicesIds: [], devices: [] };
      const payload = [
        { id: 1, name: 'Device 1' },
        { id: 2, name: 'Device 2' },
      ];
      const newState = compareReducer(initialState, fetchCompareingDevcies.fulfilled(payload));

      expect(newState.devices).toEqual(payload);
    });

    test('should handle fetchCompareingDevcies.rejected', () => {
      const initialState = { devicesIds: [], devices: [{ id: 1, name: 'Device 1' }] };
      const newState = compareReducer(initialState, fetchCompareingDevcies.rejected);

      expect(newState.devices).toEqual([]);
    });
  });

  describe('reducer', () => {
    let store;

    beforeEach(() => {
      store = configureStore({ reducer: { compare: compareReducer } });
    });

    test('should handle addDeviceComparing', () => {
      const deviceId = 1;
      store.dispatch(addDeviceComparing(deviceId));

      let state = store.getState().compare;
      expect(state.devicesIds).toContainEqual(deviceId);

      store.dispatch(addDeviceComparing(deviceId));

      state = store.getState().compare;
      expect(state.devicesIds).not.toContainEqual(deviceId);
    });

    test('should handle removeDeviceComparing', () => {
      const deviceId = 1;
      store.dispatch(addDeviceComparing(deviceId));
      store.dispatch(removeDeviceComparing(deviceId));

      let state = store.getState().compare;

      expect(state.devicesIds).not.toContainEqual(deviceId);
    });

    test('should handle removeAllComparing', () => {
      store.dispatch(addDeviceComparing(1));
      store.dispatch(addDeviceComparing(2));
      store.dispatch(addDeviceComparing(3));
      store.dispatch(removeAllComparing());

      let state = store.getState().compare;

      expect(state.devicesIds).toEqual([]);
      expect(state.devices).toEqual([]);
    });
  });
});
