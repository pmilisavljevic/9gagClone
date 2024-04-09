import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "src/store/store";
import { useEffect } from "react";
import { fetchFriendLikedPosts } from "src/store/postsSlice";
import PostComponent from "../../components/Post/PostComponent";
import { CircularProgress } from "@mui/material";

export default function PostsLikedByFriend() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { likedByFriendPosts, fetchFriendLikedPostsLoading } = useSelector(
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
      {fetchFriendLikedPostsLoading && (
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
