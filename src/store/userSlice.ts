import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addFriendAxios,
  fetchFriendRequestsAxios,
  fetchMyFriendsAxios,
  getUserInfo,
  logInUser,
  updateEditedProfile,
  uploadPicture,
} from "src/services/client";
import { EditProfileDto, PictureDto, UserLoginDto } from "src/services/types";
import { InitialUserState, UserType } from "src/store/types";

import { RootState } from "./store";

const initialState: InitialUserState = {
  user: localStorage.getItem("User")
    ? (JSON.parse(localStorage.getItem("User") || "") as UserType)
    : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  getTokenLoading: false,
  getTokenError: null,
  fetchUserInfoLoading: false,
  fetchUserInfoError: null,
  uploadAvatarLoading: false,
  uploadAvatarError: null,
  editProfileLoading: false,
  editProfileError: null,
  friendRequests: [],
  fetchFriendRequestsLoading: false,
  fetchFriendRequestsError: null,
  myFriends: [],
  fetchMyFriendsLoading: false,
  fetchMyFriendsError: null,
  loading: false,
  error: null,
};

export const getToken = createAsyncThunk(
  "user / getToken",
  async (info: UserLoginDto) => {
    const response = await logInUser(info);

    return response.data.token;
  },
);

export const fetchUserInfo = createAsyncThunk(
  "user / fetchUserInfo",
  async () => {
    const response = await getUserInfo();

    return response.data;
  },
);

export const uploadAvatar = createAsyncThunk(
  "user / uploadAvatar",
  async (image: PictureDto) => {
    const response = await uploadPicture(image);

    return response.data.profilePictureUrl;
  },
);

export const editProfile = createAsyncThunk(
  "user / editProfile ",
  async (payload: EditProfileDto) => {
    const response = await updateEditedProfile(payload);
    return response.data;
  },
);

export const addFriend = createAsyncThunk(
  "user/addFriend",
  async (userId: number) => {
    const response = await addFriendAxios(userId);
    return response.data;
  },
);

export const fetchFriendRequests = createAsyncThunk(
  "user/fetchFriendRequests ",
  async () => {
    const response = await fetchFriendRequestsAxios();
    return response.data;
  },
);

export const fetchMyFriends = createAsyncThunk(
  "user/fetchMyFriends",
  async () => {
    const response = await fetchMyFriendsAxios();
    return response.data;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("User");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
        state.getTokenLoading = false;
      })
      .addCase(getToken.pending, (state) => {
        state.getTokenLoading = true;
      })
      .addCase(getToken.rejected, (state) => {
        state.getTokenLoading = false;
        state.getTokenError = "Failed to authenticate, please try again";
      });

    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        localStorage.setItem("User", JSON.stringify(action.payload));
        state.user = action.payload;
        state.fetchUserInfoLoading = false;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.fetchUserInfoLoading = true;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.fetchUserInfoLoading = false;
        // state.fetchUserInfoError = "Failed to get user info";

        state.token = null;
        state.user = null;

        localStorage.removeItem("token");
        localStorage.removeItem("User");
      });

    builder
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profilePictureUrl = action.payload;
        }
        const storedData = localStorage.getItem("User");
        if (storedData) {
          const data = JSON.parse(storedData);
          data.profilePictureUrl = action.payload;
          localStorage.setItem("User", JSON.stringify(data));
        }
        state.uploadAvatarLoading = false;
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.uploadAvatarLoading = true;
      })
      .addCase(uploadAvatar.rejected, (state) => {
        state.uploadAvatarError = "Failed to upload avatar";
        state.uploadAvatarLoading = false;
      });

    builder
      .addCase(editProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("User", JSON.stringify(action.payload));
        state.editProfileLoading = false;
      })
      .addCase(editProfile.pending, (state) => {
        state.editProfileLoading = true;
      })
      .addCase(editProfile.rejected, (state) => {
        state.editProfileError = "Failed to update profile";
        state.editProfileLoading = false;
      });

    builder
      .addCase(fetchFriendRequests.fulfilled, (state, action) => {
        state.friendRequests = action.payload;
        state.fetchFriendRequestsLoading = false;
      })
      .addCase(fetchFriendRequests.pending, (state) => {
        state.fetchFriendRequestsLoading = true;
      })
      .addCase(fetchFriendRequests.rejected, (state) => {
        state.fetchFriendRequestsLoading = false;
        state.fetchFriendRequestsError = "Failed to get friend requests";
      });

    builder
      .addCase(fetchMyFriends.fulfilled, (state, action) => {
        state.fetchMyFriendsLoading = false;
        state.myFriends = action.payload;
      })
      .addCase(fetchMyFriends.pending, (state) => {
        state.fetchMyFriendsLoading = true;
      })
      .addCase(fetchMyFriends.rejected, (state) => {
        state.fetchMyFriendsError = "Failed to get my friends list";
        state.fetchMyFriendsLoading = false;
      });
  },
});

export const { logout } = userSlice.actions;
export const userInfo = (state: RootState) => state.user.user;
export const userStatus = (state: RootState) => state.user.loading;
export const userError = (state: RootState) => state.user.error;

export default userSlice.reducer;
