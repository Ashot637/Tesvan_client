import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../helpers/axios';

export const fetchDevices = createAsyncThunk(
  'devices/fetchDevices',
  async ({
    page,
    brandId,
    categorieId,
    minPrice,
    maxPrice,
    sortName,
    sortFollowing,
    activeFilters,
  }) => {
    const { data } = await axios.get('/devices/filter', {
      params: {
        page,
        brandId,
        categorieId,
        minPrice,
        maxPrice,
        sortName,
        sortFollowing,
        ...activeFilters,
      },
    });

    return data;
  },
);

export const fetchFilters = createAsyncThunk('devices/fetchFilters', async ({ categorieId }) => {
  const { data } = await axios.get('/devices/filters', { params: { categorieId } });

  return data;
});

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
  activeFilters: {},
  filters: [],
  pagination: 0,
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
    setActiveFilters: (state, action) => {
      state.activeFilters = {
        ...state.activeFilters,
        [action.payload.title]: action.payload.description,
      };
    },
    removeFilter: (state, action) => {
      let obj = state.activeFilters;
      delete obj[action.payload.title];
      state.activeFilters = obj;
    },
    removeAllFilters: (state) => {
      state.activeFilters = {};
      state.brandId = 0;
      state.minPrice = 0;
      state.maxPrice = 2000000;
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
      state.devices = action.payload.result;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(fetchFilters.pending, (state) => {
      state.status = 'loading';
      state.filters = [];
    });
    builder.addCase(fetchFilters.rejected, (state) => {
      state.status = 'error';
      state.filters = [];
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.status = 'success';
      state.filters = action.payload;
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
  setActiveFilters,
  removeFilter,
  removeAllFilters,
} = devicesSlice.actions;
