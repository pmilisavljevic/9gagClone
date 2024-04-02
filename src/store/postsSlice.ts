import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import {
  getFriendLikedPostsAxios,
  getPosts,
  getSinglePost,
  getUserPostsAxios,
  postPost,
  thumbsDown,
  thumbsUp,
} from "src/services/client";
import { PostDto } from "src/services/types";
import { InitialPostType } from "src/store/types";

const initialState: InitialPostType = {
  posts: [],
  fetchPostsLoading: false,
  fetchPostsError: null,
  singlePost: null,
  fetchSinglePostLoading: false,
  fetchSinglePostError: null,
  myPosts: [],
  fetchMyPostsLoading: false,
  fetchMyPostsError: null,
  submitPostLoading: false,
  submitPostError: null,
  friendPosts: [],
  fetchFriendPostsLoading: false,
  fetchFriendPostsError: null,
  likedByFriendPosts: [],
  fetchFriendLikedPostsLoading: false,
  fetchFriendLikedPostsError: null,
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
      state.fetchPostsLoading = true;
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.fetchPostsLoading = false;
    })
    .addCase(fetchPosts.rejected, (state) => {
      state.fetchPostsLoading = false;
      state.fetchPostsError = "Failed to get posts";
    });

  builder
    .addCase(fetchSinglePost.pending, (state) => {
      state.fetchSinglePostLoading = true;
    })
    .addCase(fetchSinglePost.fulfilled, (state, action) => {
      if (action.payload) {
        state.singlePost = action.payload;
      }
      state.fetchSinglePostLoading = false;
    })
    .addCase(fetchSinglePost.rejected, (state) => {
      state.fetchSinglePostLoading = false;
      state.fetchSinglePostError = "Failed to get post";
    });

  builder
    .addCase(fetchMyPosts.fulfilled, (state, action) => {
      state.myPosts = action.payload;
      state.fetchMyPostsLoading = false;
    })
    .addCase(fetchMyPosts.pending, (state) => {
      state.fetchMyPostsLoading = true;
    })
    .addCase(fetchMyPosts.rejected, (state) => {
      state.fetchMyPostsLoading = false;
      state.fetchMyPostsError = "Failed to get my posts";
    });

  builder
    .addCase(submitPost.pending, (state) => {
      state.submitPostLoading = true;
    })
    .addCase(submitPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
      state.submitPostLoading = false;
    })
    .addCase(submitPost.rejected, (state) => {
      state.submitPostLoading = false;
      state.submitPostError = "Failed to submit post";
    });

  builder.addCase(handlePostReaction.fulfilled, (state, action) => {
    const { id } = action.payload;
    const postIndex = state.posts.findIndex((post) => post.id === id);
    if (postIndex !== -1) {
      // Update the existing post if found
      state.posts[postIndex] = { ...state.posts[postIndex], ...action.payload };
    } else {
      // Add a new post if not found
      state.posts.push(action.payload);
    }
    if (action.payload) {
      state.singlePost = action.payload;
    }

    const myPostIndex = state.myPosts.findIndex((post) => post.id === id);
    if (myPostIndex !== -1) {
      // Update the existing post if found
      state.myPosts[myPostIndex] = {
        ...state.myPosts[myPostIndex],
        ...action.payload,
      };
    } else {
      // Add a new post if not found
      state.myPosts.push(action.payload);
    }

    const friendPostIndex = state.friendPosts.findIndex(
      (post) => post.id === id
    );
    if (friendPostIndex !== -1) {
      // Update the existing post if found
      state.friendPosts[friendPostIndex] = {
        ...state.friendPosts[friendPostIndex],
        ...action.payload,
      };
    } else {
      // Add a new post if not found
      state.friendPosts.push(action.payload);
    }

    const likedByFriendPostsIndex = state.likedByFriendPosts.findIndex(
      (post) => post.id === id
    );
    if (likedByFriendPostsIndex !== -1) {
      // Update the existing post if found
      state.likedByFriendPosts[likedByFriendPostsIndex] = {
        ...state.likedByFriendPosts[likedByFriendPostsIndex],
        ...action.payload,
      };
    } else {
      // Add a new post if not found
      state.posts.push(action.payload);
    }
    // OVDE OBOJITI SVE STATE-OVE SA RESPONSOM
  });

  builder
    .addCase(fetchFriendPosts.fulfilled, (state, action) => {
      state.friendPosts = action.payload;
      state.fetchFriendPostsLoading = false;
    })
    .addCase(fetchFriendPosts.pending, (state) => {
      state.fetchFriendPostsLoading = true;
    })
    .addCase(fetchFriendPosts.rejected, (state) => {
      state.submitPostLoading = false;
      state.fetchFriendPostsError = "Failed to get friend's posts";
    });
  builder
    .addCase(fetchFriendLikedPosts.fulfilled, (state, action) => {
      state.likedByFriendPosts = action.payload;
      state.fetchFriendLikedPostsLoading = false;
    })
    .addCase(fetchFriendLikedPosts.pending, (state) => {
      state.fetchFriendLikedPostsLoading = true;
    })
    .addCase(fetchFriendLikedPosts.rejected, (state) => {
      state.fetchFriendLikedPostsLoading = false;
      state.fetchFriendLikedPostsError = "Failed to get posts liked by friend";
    });
}

export default postsSlice.reducer;
