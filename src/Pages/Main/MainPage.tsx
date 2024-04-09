import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "src/store/postsSlice";
import { RootState } from "src/store/store";
import { AppDispatch } from "src/store/store";

import PostComponent from "src/Pages/Main/PostComponent";
import { fetchUserInfo } from "src/store/userSlice";
import { useNavigate } from "react-router-dom";
import Loading from "src/components/Loading";

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { posts, fetchPostsLoading, fetchPostsError } = useSelector(
    (state: RootState) => state.posts
  );

  const { fetchUserInfoError } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchPosts());

    // Fetch user info and handle unauthorized error
    dispatch(fetchUserInfo());
  }, [dispatch, navigate]);

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
