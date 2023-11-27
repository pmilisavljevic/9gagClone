import { axiosWithToken } from "src/helpers/axiosInstance";

type UserRegisterDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserLoginDto = {
  email: string;
  password: string;
};

export type PostDto = {
  title: string;
  content: string;
  image: File | null;
};

export type UpdateProfilePayload = {
  firstName: string;
  lastName: string;
};

export type PictureType = {
  image: File | null;
};

export type PictureDto = {
  file: File | null;
};

export type EditProfileDto = {
  firstName: string;
  lastName: string;
};

export const SignUpUser = async (payload: UserRegisterDto) => {
  return axiosWithToken.post("/Auth/Register", payload);
};

export const logInUser = async (payload: UserLoginDto) => {
  return axiosWithToken.post("/Auth/Login", payload);
};

export const getUserInfo = async () => {
  return axiosWithToken.get("/Users/data");
};

export const getPosts = async () => {
  return axiosWithToken.get("/Posts");
};

export const getUserPostsAxios = async (userId: number) => {
  return axiosWithToken.get(`/Posts/belonging-to/${userId}`);
};
export const getFriendLikedPostsAxios = async (userId: number) => {
  return axiosWithToken.get(`/Posts/liked-by-friend/${userId}`);
};

export const getSinglePost = async (postId: number) => {
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

export const acceptFriendRequestAxios = async (requestId: number) => {
  return axiosWithToken.post(`/Users/accept-friend-request/${requestId}`);
};
export const declineFriendRequestAxios = async (requestId: number) => {
  return axiosWithToken.post(`/Users/decline-friend-request/${requestId}`);
};

export const fetchMyFriendsAxios = async () => {
  return axiosWithToken.get("/Users/get-friends");
};
