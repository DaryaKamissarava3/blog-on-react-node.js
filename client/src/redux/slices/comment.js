import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk('api/comment/fetchComments', async () => {
  const {data} = await axios.get('/api/comment');
  return data;
});

export const fetchOneComment = createAsyncThunk('api/comment/fetchOneComment', async (id) => {
  const {data} = await axios.get(`/api/comment/${id}`);
  return data;
});

const initialState = {
  comments: {
    items: [],
    status: 'loading',
  },
  comment: {
    item: [],
    status: 'loading',
  },
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: { },
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    },
    [fetchOneComment.pending]: (state) => {
      state.comment.item = [];
      state.comment.status = 'loading';
    },
    [fetchOneComment.fulfilled]: (state, action) => {
      state.comment.item = action.payload;
      state.comment.status = 'loaded';
    },
    [fetchOneComment.rejected]: (state) => {
      state.comment.item = [];
      state.comment.status = 'error';
    },

  }
});

export const commentReducer = commentSlice.reducer;