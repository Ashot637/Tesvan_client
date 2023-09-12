import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../helpers/axios';

export const fetchDevices = createAsyncThunk(
  'devices/fetchDevices',
  async ({
    page,
    brandIds,
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
        brandIds,
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
  brandIds: [],
  categorieId: 0,
  minPrice: 0,
  maxPrice: 2000000,
  status: 'waiting',
  sortType: {
    label: 'highToLow',
    following: 'DESC',
    name: 'price',
  },
  sortList: [
    {
      label: 'lowToHigh',
      following: 'ASC',
      name: 'price',
    },
    {
      label: 'highToLow',
      following: 'DESC',
      name: 'price',
    },
    {
      label: 'oldest',
      following: 'ASC',
      name: 'id',
    },
    {
      label: 'newest',
      following: 'DESC',
      name: 'id',
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
      if (state.brandIds.includes(action.payload)) {
        state.brandIds = state.brandIds.filter((id) => id !== action.payload);
      } else {
        state.brandIds = [...state.brandIds, action.payload];
      }
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
    setActiveFilters: (state, action) => {
      if (state.activeFilters[action.payload.title]) {
        state.activeFilters = {
          ...state.activeFilters,
          [action.payload.title]: [
            ...state.activeFilters[action.payload.title],
            action.payload.description,
          ],
        };
      } else {
        state.activeFilters = {
          ...state.activeFilters,
          [action.payload.title]: [action.payload.description],
        };
      }
    },
    removeFilter: (state, action) => {
      if (state.activeFilters[action.payload.title].length === 1) {
        delete state.activeFilters[action.payload.title];
      } else {
        state.activeFilters = {
          ...state.activeFilters,
          [action.payload.title]: state.activeFilters[action.payload.title].filter(
            (desc) => desc !== action.payload.description,
          ),
        };
      }
    },
    removeAllFilters: (state) => {
      state.activeFilters = {};
      state.brandIds = [];
      state.minPrice = 0;
      state.maxPrice = 2000000;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.pending, (state) => {
      state.status = 'loading';
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
    });
    builder.addCase(fetchFilters.rejected, (state) => {
      state.status = 'error';
      state.filters = [];
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.filters = action.payload;
    });
  },
});

export const devicesReducer = devicesSlice.reducer;

export const {
  setPage,
  setBrandId,
  setCategorieId,
  setMinPrice,
  setMaxPrice,
  setSortType,
  setActiveFilters,
  removeFilter,
  removeAllFilters,
} = devicesSlice.actions;
