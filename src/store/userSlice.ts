import { logInUser } from "src/services/client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserLoginDto } from "src/services/client";
import axios from "axios";
import { RootState } from "./store";

const BASE_URL = "http://161.97.83.162:777";

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string;
};

type UserInitialState = {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  error: string;
};

const initialState: UserInitialState = {
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
    return response.data;
  }
);

export const fetchUserInfo = createAsyncThunk(
  "user / fetchUserInfo",
  async () => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(`${BASE_URL}/Users/data`, config);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      //   return rejectWithValue(error.response.data);
    }
  }
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
      // Handle pending state
      .addCase(getToken.pending, (state) => {
        state.loading = true;
      })
      // fulfilled
      .addCase(getToken.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
        state.loading = false;

        // console.log(state.token);
      })
      // Handle rejected state
      .addCase(getToken.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to get credentials";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        localStorage.setItem("User", JSON.stringify(action.payload));
        state.user = action.payload;
        console.log(state.user);
      });
  },
});

export const { logout } = userSlice.actions;
export const userInfo = (state: RootState) => state.user.user;

export default userSlice.reducer;
