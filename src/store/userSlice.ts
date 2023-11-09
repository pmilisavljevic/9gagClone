import { getUserInfo, logInUser } from "src/services/client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserLoginDto } from "src/services/client";
// import axios from "axios";
import { RootState } from "./store";

// const BASE_URL = "http://161.97.83.162:777";

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string;
};

type InitialState = {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  user: localStorage.getItem("User")
    ? (JSON.parse(localStorage.getItem("User") || "") as UserType)
    : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  loading: false,
  error: "",
};

export const getToken = createAsyncThunk(
  "user / getToken",
  async (info: UserLoginDto) => {
    const response = await logInUser(info);
    console.log(response);

    return response.data.token;
  }
);

export const fetchUserInfo = createAsyncThunk(
  "user / fetchUserInfo",
  async () => {
    // const token = localStorage.getItem("token");

    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // };

    // const response = await axios.get(`${BASE_URL}/Users/data`, config);
    const response = await getUserInfo();
    console.log(response.data);

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

        console.log(state.user);
        state.loading = false;
        // state.error = "";
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.loading = false;
        // state.error = "Failed to get user info";
      });
  },
});

export const { logout } = userSlice.actions;
export const userInfo = (state: RootState) => state.user.user;
export const userStatus = (state: RootState) => state.user.loading;
export const userError = (state: RootState) => state.user.error;

export default userSlice.reducer;
