import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "src/store/postsSlice";
import { RootState } from "src/store/store";
import { AppDispatch } from "src/store/store";

import PostComponent from "src/Pages/Main/PostComponent";

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  console.log(posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (error) return <div>Error: {error}</div>;
  return (
    <div className="main-page__container">
      {loading && <div>Loading...</div>}
      {posts.map((post) => (
        <PostComponent
          key={post.id}
          post={post}
          className={"post--normal-title   "}
        />
      ))}
    </div>
  );
}

export default MainPage;
