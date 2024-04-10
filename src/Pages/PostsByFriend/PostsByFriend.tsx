import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "src/components/Loading";
import PostComponent from "src/components/Post/PostComponent";
import { fetchFriendPosts } from "src/store/postsSlice";
import { AppDispatch, RootState } from "src/store/store";

export default function PostsByFriend() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { friendPosts, fetchFriendPostsLoading } = useSelector(
    (state: RootState) => state.posts,
  );

  useEffect(() => {
    const numericId = id ? Number(id) : null;
    if (numericId) {
      dispatch(fetchFriendPosts(numericId));
    }
  }, [dispatch, id]);
  return (
    <div>
      {fetchFriendPostsLoading && <Loading />}
      {friendPosts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}
