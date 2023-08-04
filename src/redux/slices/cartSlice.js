import { createSlice } from '@reduxjs/toolkit';

const getCartFromLs = () => {
  const data = localStorage.getItem('cartItems');
  const items = data ? JSON.parse(data) : [];

  return items;
};

const initialState = {
  devices: getCartFromLs(),
  isOpen: false,
  notificationShow: false,
  addedDevice: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDevice: (state, action) => {
      let findItem = state.devices.find((device) => device.id === action.payload.id);

      if (findItem) {
        if (
          action.payload.count === findItem.count &&
          action.payload.count + 1 <= +findItem.quantity
        ) {
          findItem.count++;
        } else {
          if (findItem.count + action.payload.count <= +findItem.quantity) {
            findItem.count += action.payload.count;
            state.addedDevice = action.payload;
          } else {
            findItem.count = findItem.quantity;
            state.addedDevice = {
              ...action.payload,
              count: findItem.quantity,
            };
          }
        }
      } else {
        state.addedDevice = {
          ...action.payload,
          count: action.payload.count
            ? action.payload.count > action.payload.quantity
              ? action.payload.quantity
              : action.payload.count
            : 1,
        };
        state.devices.push({
          ...action.payload,
          count: action.payload.count
            ? action.payload.count > action.payload.quantity
              ? action.payload.quantity
              : action.payload.count
            : 1,
        });
      }

      state.notificationShow = true;
    },
    removeDevice: (state, action) => {
      state.devices = state.devices.filter((device) => device.id !== action.payload);
    },
    removeAll: (state) => {
      state.devices = [];
    },
    minusDevice(state, action) {
      const findItem = state.devices.find((device) => device.id === action.payload);

      if (findItem && findItem.count > 1) {
        findItem.count--;
      }
    },
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
      state.notificationShow = false;
    },
    setNotificationShow: (state, action) => {
      state.notificationShow = action.payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addDevice,
  removeDevice,
  removeAll,
  toggleIsOpen,
  minusDevice,
  setNotificationShow,
} = cartSlice.actions;
