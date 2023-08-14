import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../helpers/axios';
import jwt_decode from 'jwt-decode';

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
  const { data } = await axios.post('/auth/login', { ...params });
  const res = jwt_decode(data);
  localStorage.setItem('token', data);
  return res;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.post('/auth');
  const res = jwt_decode(data);
  localStorage.setItem('token', data);
  return res;
});

const initialState = {
  admin: null,
  status: 'waiting',
  inValid: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = 'loading';
      state.admin = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = 'success';
      state.admin = action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = 'error';
      state.admin = null;
      state.inValid = true;
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = 'loading';
      state.admin = null;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = 'success';
      state.admin = action.payload;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = 'error';
      state.admin = null;
    });
  },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
