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
  fetchPostsLoading: boolean;
  fetchPostsError: string | null;
  singlePost: Post | null;
  fetchSinglePostLoading: boolean;
  fetchSinglePostError: string | null;
  myPosts: Post[];
  fetchMyPostsLoading: boolean;
  fetchMyPostsError: string | null;
  submitPostLoading: boolean;
  submitPostError: string | null;
  friendPosts: Post[];
  fetchFriendPostsLoading: boolean;
  fetchFriendPostsError: string | null;
  likedByFriendPosts: Post[];
  fetchFriendLikedPostsLoading: boolean;
  fetchFriendLikedPostsError: string | null;
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
  getTokenLoading: boolean;
  getTokenError: string | null;
  fetchUserInfoLoading: boolean;
  fetchUserInfoError: string | null;
  uploadAvatarLoading: boolean;
  uploadAvatarError: string | null;
  editProfileLoading: boolean;
  editProfileError: string | null;
  fetchFriendRequestsLoading: boolean;
  fetchFriendRequestsError: string | null;
  fetchMyFriendsLoading: boolean;
  fetchMyFriendsError: string | null;
  friendRequests: friendRequest[];
  myFriends: UserType[];
};
