import { configureStore } from '@reduxjs/toolkit';
import {
  setDevices,
  addDevice,
  removeDevice,
  removeAll,
  toggleIsOpen,
  minusDevice,
  setNotificationShow,
  cartReducer,
} from './cartSlice';

describe('cart slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { cart: cartReducer } });
  });

  describe('reducers', () => {
    test('should handle setDevices', () => {
      const devices = [
        { id: 1, name: 'Device 1' },
        { id: 2, name: 'Device 2' },
      ];
      store.dispatch(setDevices(devices));

      expect(store.getState().cart.devices).toEqual(devices);
    });

    test('should handle addDevice with 1 count', () => {
      const device = { id: 1, name: 'Device 1', quantity: 5 };
      store.dispatch(addDevice(device));

      let state = store.getState().cart;

      expect(state.devices).toContainEqual({
        ...device,
        count: 1,
      });
      expect(state.addedDevice).toEqual({
        ...device,
        count: 1,
      });
      expect(state.notificationShow).toBeTruthy();
    });

    test('should handle addDevice with other count', () => {
      const device = { id: 1, name: 'Device 1', quantity: 5, count: 2 };
      store.dispatch(addDevice(device));

      let state = store.getState().cart;

      expect(state.devices).toContainEqual({
        ...device,
        count: 2,
      });
      expect(state.addedDevice).toEqual({
        ...device,
        count: 2,
      });
      expect(state.notificationShow).toBeTruthy();

      store.dispatch(addDevice({ ...device, count: device.quantity - 1 }));

      state = store.getState().cart;

      expect(state.devices).toContainEqual({
        ...device,
        count: device.quantity,
      });
    });

    test('should handle removeDevice', () => {
      const device = { id: 1, name: 'Device 1', quantity: 5 };
      store.dispatch(addDevice(device));

      store.dispatch(removeDevice(device.id));

      const state = store.getState().cart;

      expect(state.devices).not.toContainEqual(expect.objectContaining({ id: device.id }));
    });

    test('should handle removeAll', () => {
      store.dispatch(removeAll());

      const state = store.getState().cart;

      expect(state.devices).toHaveLength(0);
    });

    test('should handle minusDevice', () => {
      const device = { id: 1, name: 'Device 1', count: 2 };
      store.dispatch(setDevices([device]));

      store.dispatch(minusDevice(1));

      const state = store.getState().cart;

      expect(state.devices[0].count).toBe(1);
    });

    test('should handle toggleIsOpen', () => {
      store.dispatch(toggleIsOpen(true));

      const state = store.getState().cart;

      expect(state.isOpen).toBeTruthy();
      expect(state.notificationShow).toBeFalsy();
    });

    test('should handle setNotificationShow', () => {
      store.dispatch(setNotificationShow(true));

      const state = store.getState().cart;

      expect(state.notificationShow).toBeTruthy();
    });
  });
});
