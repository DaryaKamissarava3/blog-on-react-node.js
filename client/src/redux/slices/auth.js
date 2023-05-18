import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLogin = createAsyncThunk('api/user/fetchLogin', async (params) => {
  const {data} = await axios.post('/api/user/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk('api/user/fetchRegister', async (params) => {
  const {data} = await axios.post('/api/user/registration', params);
  return data;
});

export const fetchAuth = createAsyncThunk('api/user/fetchAuth', async () => {
  const {data} = await axios.get('/api/user/auth');
  return data;
});

export const fetchOneUser = createAsyncThunk('api/user/fetchOneUser', async (params) => {
  const {data} = await axios.get('/api/user/getUser',params);
  return data;
});

export const fetchAllUsers = createAsyncThunk('api/user/fetchAllUsers', async () => {
  const {data} = await axios.get('/api/user/getUsers');
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
  user:{
    item:[],
    status:'loading',
  },
  users:{
    items:[],
    status: 'loading',
  },
  currentId:null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchLogin.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchAllUsers.pending]: (state) => {
      state.users.items = [];
      state.users.status = 'loading';
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.users.items = action.payload;
      state.users.status = 'loaded';
    },
    [fetchAllUsers.rejected]: (state) => {
      state.users.items = [];
      state.users.status = 'error';
    },
    [fetchOneUser.pending]: (state) => {
      state.user.item = [];
      state.user.status = 'loading';
    },
    [fetchOneUser.fulfilled]: (state, action) => {
      state.user.item = action.payload;
      state.user.status = 'loaded';
    },
    [fetchOneUser.rejected]: (state) => {
      state.user.item = [];
      state.user.status = 'error';
    },
  }
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;