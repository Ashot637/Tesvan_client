import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../helpers/axios';

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async ({ categorieId = 0 }) => {
  const { data } = await axios.get('/brands', { params: { categorieId } });

  return data;
});

const initialState = {
  brands: [],
  status: 'waiting',
};

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, (state) => {
      state.status = 'loading';
      state.brands = [];
    });
    builder.addCase(fetchBrands.rejected, (state) => {
      state.status = 'error';
      state.brands = [];
    });
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.status = 'success';
      state.brands = action.payload;
    });
  },
});

export const brandsReducer = brandSlice.reducer;
