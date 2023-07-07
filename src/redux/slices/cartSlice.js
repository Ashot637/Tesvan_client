import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  devices: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDevice: (state, action) => {
      let findItem = state.devices.find((device) => device.id === action.payload.id);

      if (findItem) {
        if (action.payload.count === findItem.count) {
          findItem.count++;
        } else {
          findItem.count += action.payload.count;
        }
      } else {
        state.devices.push({
          ...action.payload,
          count: action.payload.count || 1,
        });
      }

      state.isOpen = true;
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
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const { addDevice, removeDevice, removeAll, toggleIsOpen, minusDevice } = cartSlice.actions;
