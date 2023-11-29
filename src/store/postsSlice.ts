import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import {
  PostDto,
  getFriendLikedPostsAxios,
  getPosts,
  getSinglePost,
  getUserPostsAxios,
  postPost,
  thumbsDown,
  thumbsUp,
} from "src/services/client";
import { InitialPostType } from "src/store/types";

const initialState: InitialPostType = {
  posts: [],
  loading: false,
  error: null,
  singlePost: null,
  myPosts: [],
  friendPosts: [],
  likedByFriendPosts: [],
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await getPosts();

  return response.data;
});

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (postId: number) => {
    try {
      const response = await getSinglePost(postId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchMyPosts = createAsyncThunk(
  "posts/fetchMyPosts",
  async (userId: number) => {
    try {
      const response = await getUserPostsAxios(userId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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

export const thumbsUpPost = createAsyncThunk(
  "posts/thumbsUpPost",
  async (postId: number) => {
    try {
      const response = await thumbsUp(postId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const thumbsDownPost = createAsyncThunk(
  "posts/thumbsDOwnPost",
  async (postId: number) => {
    try {
      const response = await thumbsDown(postId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const handlePostReaction = createAsyncThunk(
  "posts/handlePostReaction",
  async ({
    postId,
    reactionType,
  }: {
    postId: number;
    reactionType: "like" | "dislike";
  }) => {
    try {
      const response =
        reactionType === "like"
          ? await thumbsUp(postId)
          : await thumbsDown(postId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchFriendPosts = createAsyncThunk(
  "posts/fetchFriendPosts",
  async (userId: number) => {
    try {
      const response = await getUserPostsAxios(userId);
      return response.data;
    } catch (error) {
      // console.log(error);
    }
  }
);
export const fetchFriendLikedPosts = createAsyncThunk(
  "posts/fetchFriendLikedPosts",
  async (userId: number) => {
    try {
      const response = await getFriendLikedPostsAxios(userId);
      return response.data;
    } catch (error) {
      // console.log(error);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: fuck,
});

function fuck(builder: ActionReducerMapBuilder<InitialPostType>) {
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
    });

  builder
    .addCase(submitPost.pending, (state) => {
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

  builder.addCase(handlePostReaction.fulfilled, (state, action) => {
    const { id } = action.payload;
    const postIndex = state.posts.findIndex((post) => post.id === id);
    state.posts[postIndex] = { ...state.posts[postIndex], ...action.payload };
  });

  builder
    .addCase(fetchSinglePost.fulfilled, (state, action) => {
      state.singlePost = action.payload;
      state.loading = false;
    })

    .addCase(fetchSinglePost.pending, (state) => {
      state.loading = true;
    });
  builder.addCase(fetchMyPosts.fulfilled, (state, action) => {
    state.myPosts = action.payload;
    state.loading = false;
  });
  builder
    .addCase(fetchFriendPosts.fulfilled, (state, action) => {
      state.friendPosts = action.payload;
      state.loading = false;
    })
    .addCase(fetchFriendPosts.pending, (state) => {
      state.loading = true;
    });
  builder
    .addCase(fetchFriendLikedPosts.fulfilled, (state, action) => {
      state.likedByFriendPosts = action.payload;
      state.loading = false;
    })
    .addCase(fetchFriendLikedPosts.pending, (state) => {
      state.loading = true;
    });
}

export default postsSlice.reducer;
