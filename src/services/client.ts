import { axiosWithToken } from "src/helpers/axiosInstance";
import {
  EditProfileDto,
  PictureDto,
  PostDto,
  UserLoginDto,
  UserRegisterDto,
} from "./types";
import { AxiosResponse } from "axios";
import { Post } from "src/store/types";

export const SignUpUser = async (payload: UserRegisterDto) => {
  return axiosWithToken.post("/Auth/Register", payload);
};

export const logInUser = async (payload: UserLoginDto) => {
  return axiosWithToken.post("/Auth/Login", payload);
};

export const getUserInfo = async () => {
  return axiosWithToken.get("/Users/data");
};

export const getPosts = async (): Promise<AxiosResponse<Post[]>> => {
  return axiosWithToken.get("/Posts");
};

export const getUserPostsAxios = async (userId: number) => {
  return axiosWithToken.get(`/Posts/belonging-to/${userId}`);
};
export const getFriendLikedPostsAxios = async (userId: number) => {
  return axiosWithToken.get(`/Posts/liked-by-friend/${userId}`);
};

export const getSinglePost = async (
  postId: number
): Promise<AxiosResponse<Post>> => {
  return axiosWithToken.get(`/Posts/${postId}`);
};

export const postPost = async (payload: PostDto) => {
  return axiosWithToken.post("/Posts", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadPicture = async (payload: PictureDto) => {
  return axiosWithToken.post("/Users/upload-picture", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateEditedProfile = async (payload: EditProfileDto) => {
  return axiosWithToken.post("/Users/update-profile", payload);
};

export const thumbsUp = async (postId: number) => {
  return axiosWithToken.post(`/Posts/like-dislike/${postId}`, { reaction: 1 });
};

export const thumbsDown = async (postId: number) => {
  return axiosWithToken.post(`/Posts/like-dislike/${postId}`, { reaction: 2 });
};

export const addFriendAxios = async (userId: number) => {
  return axiosWithToken.post(`/Users/make-friend-request/${userId}`);
};

export const fetchFriendRequestsAxios = async () => {
  return axiosWithToken.get("/Users/get-my-friend-requests");
};

export const FriendRequestAxios = async (
  requestId: number,
  reaction: string
) => {
  return axiosWithToken.post(`/Users/${reaction}-friend-request/${requestId}`);
};

export const fetchMyFriendsAxios = async () => {
  return axiosWithToken.get("/Users/get-friends");
};
