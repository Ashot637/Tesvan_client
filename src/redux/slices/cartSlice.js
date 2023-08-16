import { createSlice } from '@reduxjs/toolkit';
import axios from '../../helpers/axios';

const getCartFromLs = () => {
  const localItems = localStorage.getItem('cartItems');
  let cartItems = localItems ? JSON.parse(localItems) : [];
  // if (cartItems.length) {
  //   const ids = [...cartItems].map((item) => item.id);
  //   axios.post('/devices/ids', { ids }).then(({ data }) => {
  //     cartItems = cartItems.map((item) => {
  //       return { ...item, quantity: data.find((d) => +d.id === +item.id).quantity };
  //     });
  //   });
  // }
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
