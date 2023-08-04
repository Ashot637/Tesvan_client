import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../helpers/axios';

export const fetchDevices = createAsyncThunk(
  'devices/fetchDevices',
  async ({ page, brandId, categorieId, minPrice, maxPrice, sortName, sortFollowing }) => {
    const { data } = await axios.get('/devices', {
      params: { page, brandId, categorieId, minPrice, maxPrice, sortName, sortFollowing },
    });

    return data;
  },
);

const initialState = {
  devices: [],
  page: 1,
  brandId: 0,
  categorieId: 0,
  categorieLabel: '',
  minPrice: 0,
  maxPrice: 2000000,
  status: 'waiting',
  sortType: {
    label: 'Price (DESC)',
    following: 'DESC',
    name: 'price',
  },
  sortList: [
    {
      label: 'Price (DESC)',
      following: 'DESC',
      name: 'price',
    },
    {
      label: 'Price (ASC)',
      following: 'ASC',
      name: 'price',
    },
  ],
  screenSizeId: null,
  screenSizesList: ['6”', '13”', '15”', '15.6”', '16”', '17.3”'],
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setBrandId: (state, action) => {
      state.brandId = action.payload;
    },
    setCategorieId: (state, action) => {
      state.categorieId = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setCategorieLabel: (state, action) => {
      state.categorieLabel = action.payload;
    },
    setScreenSizeId: (state, action) => {
      state.screenSizeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.pending, (state) => {
      state.status = 'loading';
      state.devices = [];
    });
    builder.addCase(fetchDevices.rejected, (state) => {
      state.status = 'error';
      state.devices = [];
    });
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.status = 'success';
      if (state.screenSizeId !== null) {
        let devices = action.payload.filter((device) =>
          device.info.some(
            (i) =>
              i.title === 'Screen size' &&
              i.description === state.screenSizesList[state.screenSizeId],
          ),
        );
        state.devices = devices;
      } else {
        state.devices = action.payload;
      }
    });
  },
});

export const devicesReducer = devicesSlice.reducer;

export const {
  setPage,
  setBrandId,
  setCategorieId,
  setCategorieLabel,
  setMinPrice,
  setMaxPrice,
  setSortType,
  setScreenSizeId,
} = devicesSlice.actions;
