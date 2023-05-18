import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('api/post/fetchPosts', async () => {
  const {data} = await axios.get('/api/post');
  return data;
});

export const fetchOnePost = createAsyncThunk('api/post/fetchOnePost', async (id) => {
  const {data} = await axios.get(`/api/post/${id}`);
  return data;
});


const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  post: {
    item: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [fetchOnePost.pending]: (state) => {
      state.post.item = [];
      state.post.status = 'loading';
    },
    [fetchOnePost.fulfilled]: (state, action) => {
      state.post.item = action.payload;
      state.post.status = 'loaded';
    },
    [fetchOnePost.rejected]: (state) => {
      state.post.item = [];
      state.post.status = 'error';
    },
  }
});

export const postsReducer = postsSlice.reducer;