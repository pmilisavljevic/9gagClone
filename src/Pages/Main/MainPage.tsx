import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "src/store/postsSlice";
import { RootState } from "src/store/store";
import { AppDispatch } from "src/store/store";
import CircularProgress from "@mui/material/CircularProgress";

import PostComponent from "src/Pages/Main/PostComponent";

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (error) return <div>Error: {error}</div>;
  return (
    <div className="main-page__container">
      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}

export default MainPage;
