import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../helpers/axios';
import jwt_decode from 'jwt-decode';

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
  await axios.post('/auth/login', { ...params });
});

export const fetchCode = createAsyncThunk('auth/fetchCode', async ({ numbers }) => {
  const { data } = await axios.post('/verifyCode', { numbers });
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
  waitingCode: false,
  inValid: false,
  inValidCode: false,
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
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.waitingCode = true;
      state.inValid = false;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
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
      state.admin = null;
      state.status = 'error';
    });
    builder.addCase(fetchCode.pending, (state) => {
      state.status = 'loading';
      state.admin = null;
    });
    builder.addCase(fetchCode.fulfilled, (state, action) => {
      state.status = 'success';
      state.admin = action.payload;
    });
    builder.addCase(fetchCode.rejected, (state) => {
      state.status = 'error';
      state.admin = null;
      state.inValidCode = true;
    });
  },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
