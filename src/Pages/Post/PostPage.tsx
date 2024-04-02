import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PostComponent from "src/Pages/Main/PostComponent";
import { fetchSinglePost } from "src/store/postsSlice";
import { AppDispatch, RootState } from "src/store/store";

function PostPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { singlePost, fetchSinglePostLoading, fetchSinglePostError } =
    useSelector((state: RootState) => state.posts);

  const { id } = useParams();

  useEffect(() => {
    const numericId = id ? Number(id) : null;
    if (numericId) {
      dispatch(fetchSinglePost(numericId));
    }
  }, [dispatch, id]);

  if (fetchSinglePostLoading) return <div>Loading...</div>;
  if (fetchSinglePostError) return <div>Error: {fetchSinglePostError}</div>;

  return (
    <div>
      {singlePost && (
        <PostComponent
          key={singlePost.id}
          post={singlePost}
          className="post-page"
        />
      )}
    </div>
  );
}

export default PostPage;
