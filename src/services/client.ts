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

export const SignUpUser = async (payload: UserRegisterDto) => {
  return axiosInstance.post("/Auth/Register", payload);
};

export const logInUser = async (payload: UserLoginDto) => {
  return axiosInstance.post("/Auth/Login", payload);
};

export const getUserInfo = () => {
  return axiosWithToken.get("/Users/data");
};
