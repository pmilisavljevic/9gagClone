import { axiosInstance } from "src/helpers/axiosInstance";

type UserRegisterDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type UserLoginDto = {
  email: string;
  password: string;
};

export const SignUpUser = async (payload: UserRegisterDto) => {
  return axiosInstance.post("/Auth/Register", payload);
};

export const LogInUser = async (payload: UserLoginDto) => {
  return axiosInstance.post("/Auth/Login", payload);
};
