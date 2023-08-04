import { createSlice } from '@reduxjs/toolkit';

const getComparingFromLS = () => {
  const data = localStorage.getItem('compare');
  const items = data ? JSON.parse(data) : [];

  return items;
};

const initialState = {
  devices: getComparingFromLS(),
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addDeviceComparing: (state, action) => {
      let findItem = state.devices.find((device) => device.id === action.payload.id);

      if (!findItem) {
        state.devices.push(action.payload);
      } else {
        state.devices = state.devices.filter((device) => device.id !== action.payload.id);
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
