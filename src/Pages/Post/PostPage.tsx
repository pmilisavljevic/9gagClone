import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PostComponent from "src/Pages/Main/PostComponent";
import { fetchSinglePost } from "src/store/postsSlice";
import { AppDispatch, RootState } from "src/store/store";

function PostPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { singlePost, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  const { id } = useParams();

  useEffect(() => {
    const numericId = id ? Number(id) : null;
    if (numericId) {
      dispatch(fetchSinglePost(numericId));
    }
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="main-page__container">
      {singlePost && <PostComponent key={singlePost.id} post={singlePost} />}
    </div>
  );
}

export default PostPage;
