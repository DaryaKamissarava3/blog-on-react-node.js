import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/auth";
import {postsReducer} from "./slices/posts";
import {commentReducer} from "./slices/comment";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts:postsReducer,
    comments:commentReducer
  }
});

export default store;