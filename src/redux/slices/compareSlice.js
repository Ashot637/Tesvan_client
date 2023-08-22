import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../helpers/axios';

export const fetchCompareingDevcies = createAsyncThunk(
  'compare/fetchCompareingDevcies',
  async ({ ids }) => {
    const { data } = await axios.post('/devices/ids', { ids });
    return data;
  },
);

const getComparingFromLS = () => {
  const data = localStorage.getItem('compare');
  const items = data ? JSON.parse(data) : [];

  return items;
};

const initialState = {
  devicesIds: getComparingFromLS(),
  devices: [],
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addDeviceComparing: (state, action) => {
      let findItem = state.devicesIds.find((id) => id === action.payload);

      if (!findItem) {
        state.devicesIds.push(action.payload);
      } else {
        state.devicesIds = state.devicesIds.filter((id) => id !== action.payload);
      }
    },
    removeDeviceComparing: (state, action) => {
      state.devicesIds = state.devicesIds.filter((id) => id !== action.payload);
      state.devices = state.devices.filter((device) => device.id !== action.payload);
    },
    removeAllComparing: (state) => {
      state.devicesIds = [];
      state.devices = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCompareingDevcies.fulfilled, (state, action) => {
      state.devices = action.payload;
    });
    builder.addCase(fetchCompareingDevcies.rejected, (state) => {
      state.devices = [];
    });
  },
});

export const compareReducer = compareSlice.reducer;

export const { addDeviceComparing, removeDeviceComparing, removeAllComparing } =
  compareSlice.actions;
