import { createSlice } from '@reduxjs/toolkit';

const getCartFromLs = () => {
  const localItems = localStorage.getItem('cartItems');
  let cartItems = localItems ? JSON.parse(localItems) : [];
  return cartItems;
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

      if (!state.isOpen) {
        state.notificationShow = true;
      }
    },
    setDevices: (state, action) => {
      state.devices = action.payload;
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
    toggleIsOpen: (state, action) => {
      if (action.payload === false) {
        state.isOpen = action.payload;
      } else {
        state.isOpen = !state.isOpen;
      }
      state.notificationShow = false;
    },
    setNotificationShow: (state, action) => {
      state.notificationShow = action.payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  setDevices,
  addDevice,
  removeDevice,
  removeAll,
  toggleIsOpen,
  minusDevice,
  setNotificationShow,
} = cartSlice.actions;
