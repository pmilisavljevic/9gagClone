import {
  EditProfileDto,
  PictureDto,
  addFriendAxios,
  fetchFriendRequestsAxios,
  fetchMyFriendsAxios,
  getUserInfo,
  logInUser,
  updateEditedProfile,
  uploadPicture,
} from "src/services/client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserLoginDto } from "src/services/client";
// import axios from "axios";
import { RootState } from "./store";
import { InitialUserState, UserType } from "src/store/types";

const initialState: InitialUserState = {
  user: localStorage.getItem("User")
    ? (JSON.parse(localStorage.getItem("User") || "") as UserType)
    : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  loading: false,
  error: "",
  friendRequests: [],
  myFriends: [],
};

export const getToken = createAsyncThunk(
  "user / getToken",
  async (info: UserLoginDto) => {
    const response = await logInUser(info);

    return response.data.token;
  }
);

export const fetchUserInfo = createAsyncThunk(
  "user / fetchUserInfo",
  async () => {
    const response = await getUserInfo();
    console.log(response.data);

    return response.data;
  }
);

export const uploadAvatar = createAsyncThunk(
  "user / UploadAvatar",
  async (image: PictureDto) => {
    const response = await uploadPicture(image);
    console.log(response);
    return response.data.profilePictureUrl;
  }
);

export const editProfile = createAsyncThunk(
  "user / EditProfile ",
  async (payload: EditProfileDto) => {
    const response = await updateEditedProfile(payload);
    return response.data;
  }
);

export const addFriend = createAsyncThunk(
  "user/addFriend",
  async (userId: number) => {
    const response = await addFriendAxios(userId);
    return response.data;
  }
);

export const fetchFriendRequests = createAsyncThunk(
  "user/fetchFriendRequests ",
  async () => {
    const response = await fetchFriendRequestsAxios();
    return response.data;
  }
);

export const fetchMyFriends = createAsyncThunk(
  "user/fetchMyFriends",
  async () => {
    const response = await fetchMyFriendsAxios();
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = "";

      localStorage.removeItem("token");
      localStorage.removeItem("User");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getToken.pending, (state) => {
        state.loading = true;
      })

      .addCase(getToken.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to authenticate, please try again";
      })

      .addCase(getToken.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
        state.loading = false;
      })

      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        localStorage.setItem("User", JSON.stringify(action.payload));
        state.user = action.payload;
        state.loading = false;
        // state.error = "";
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.loading = false;
        // state.error = "Failed to get user info";
      })
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
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("User", JSON.stringify(action.payload));
      });
    builder.addCase(fetchFriendRequests.fulfilled, (state, action) => {
      state.friendRequests = action.payload;
    });
    builder.addCase(fetchMyFriends.fulfilled, (state, action) => {
      state.myFriends = action.payload;
    });
  },
});

export const { logout } = userSlice.actions;
export const userInfo = (state: RootState) => state.user.user;
export const userStatus = (state: RootState) => state.user.loading;
export const userError = (state: RootState) => state.user.error;

export default userSlice.reducer;
