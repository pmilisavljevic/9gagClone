import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "src/store/store";
import { fetchFriendPosts } from "src/store/postsSlice";
import PostComponent from "../Main/PostComponent";

function PostsByFriend() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { friendPosts } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    const numericId = id ? Number(id) : null;
    if (numericId) {
      dispatch(fetchFriendPosts(numericId));
    }
  }, [dispatch, id]);
  return (
    <div>
      {friendPosts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsByFriend;
