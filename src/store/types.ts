export type Post = {
  id: number;
  user: UserType;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  likesCount: number;
  dislikesCount: number;
  userReaction: null;
};

export type InitialPostType = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string;
};

export type InitialUserState = {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  error: string;
};
