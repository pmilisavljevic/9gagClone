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
  userReaction: null | number;
};

export type InitialPostType = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  singlePost: Post | null;
  myPosts: Post[];
  friendPosts: Post[];
  likedByFriendPosts: Post[];
};

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string;
  isFriendsWith: boolean;
};

// type Requestee = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   profilePictureUrl: string;
// };

export type friendRequest = {
  id: number;
  requester: UserType;
  requested: UserType;
  requestDate: string;
  status: number;
};

export type InitialUserState = {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  error: string;
  friendRequests: friendRequest[];
  myFriends: UserType[];
};
