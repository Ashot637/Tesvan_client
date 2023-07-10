import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  devices: [],
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addDeviceComparing: (state, action) => {
      let findItem = state.devices.find((device) => device.id === action.payload.id);

      if (!findItem) {
        state.devices.push(action.payload);
      }
    },
    removeDeviceComparing: (state, action) => {
      state.devices = state.devices.filter((device) => device.id !== action.payload);
    },
    removeAllComparing: (state) => {
      state.devices = [];
    },
  },
});

export const compareReducer = compareSlice.reducer;

export const { addDeviceComparing, removeDeviceComparing, removeAllComparing } =
  compareSlice.actions;
