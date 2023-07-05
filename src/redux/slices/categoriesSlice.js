import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../helpers/axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const { data } = await axios.get('/categories');

  return data;
});

const initialState = {
  categories: [],
  status: 'waiting',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = 'loading';
      state.categories = [];
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.status = 'error';
      state.categories = [];
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = 'success';
      state.categories = action.payload;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
