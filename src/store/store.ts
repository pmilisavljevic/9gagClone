import { configureStore } from "@reduxjs/toolkit";
import userSlice from "src/store/userSlice";
import postsSlice from "./postsSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice,
  },
});
