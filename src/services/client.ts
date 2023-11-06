import { axiosInstance } from "src/helpers/axiosInstance";

type UserRegisterDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const SignUpUser = async (payload: UserRegisterDto) => {
  return axiosInstance.post("/users", payload);
};
