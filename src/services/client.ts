import { axiosInstance, axiosWithToken } from "src/helpers/axiosInstance";

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
  return axiosInstance.post("/Auth/Register", payload);
};

export const logInUser = async (payload: UserLoginDto) => {
  return axiosInstance.post("/Auth/Login", payload);
};

export const getUserInfo = async () => {
  return axiosWithToken.get("/Users/data");
};

export const getPosts = async () => {
  return axiosWithToken.get("/Posts");
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
