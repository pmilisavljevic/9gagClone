import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "src/store/store";
import { useEffect } from "react";
import { fetchFriendLikedPosts } from "src/store/postsSlice";
import PostComponent from "../Main/PostComponent";
import { CircularProgress } from "@mui/material";

function PostsLikedByFriend() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { likedByFriendPosts, loading } = useSelector(
    (state: RootState) => state.posts
  );
  useEffect(() => {
    const numericId = id ? Number(id) : null;
    if (numericId) {
      dispatch(fetchFriendLikedPosts(numericId));
    }
  }, [dispatch, id]);
  return (
    <div>
      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      {likedByFriendPosts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsLikedByFriend;
