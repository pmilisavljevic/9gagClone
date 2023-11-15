import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { PostDto, getPosts, postPost } from "src/services/client";
import { InitialPostType } from "src/store/types";

const initialState: InitialPostType = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await getPosts();

  return response.data;
});

export const submitPost = createAsyncThunk(
  "posts/submitPost",
  async (formData: PostDto) => {
    try {
      const response = await postPost(formData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: fuck
});

function fuck  (builder: ActionReducerMapBuilder<InitialPostType>) {
  builder
  .addCase(fetchPosts.pending, (state) => {
    state.loading = true;
  })
  .addCase(fetchPosts.fulfilled, (state, action) => {
    state.posts = action.payload;
    state.loading = false;
  })
  .addCase(fetchPosts.rejected, (state) => {
    state.loading = false;
    // state.error = action.error.message;
  })

  builder.addCase(submitPost.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(submitPost.fulfilled, (state, action) => {
    state.posts.push(action.payload);
    state.loading = false;
  })
  .addCase(submitPost.rejected, (state) => {
    state.loading = false;
    state.error = "Failed to submit post";
  });
}

export default postsSlice.reducer;
