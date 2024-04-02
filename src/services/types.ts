export type UserRegisterDto = {
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
