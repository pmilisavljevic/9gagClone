import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "src/components/Loading";
import PostComponent from "src/components/Post/PostComponent";
import { fetchPosts } from "src/store/postsSlice";
import { AppDispatch, RootState } from "src/store/store";
import { fetchUserInfo } from "src/store/userSlice";

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { posts, fetchPostsLoading, fetchPostsError } = useSelector(
    (state: RootState) => state.posts,
  );

  const { fetchUserInfoError } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUserInfo());
  }, [dispatch]);

  if (fetchPostsError) return <div>Error: {fetchPostsError}</div>;
  return (
    <div className="main-page__container">
      {fetchPostsLoading && <Loading />}
      {fetchUserInfoError && <p>{fetchUserInfoError}</p>}
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}
