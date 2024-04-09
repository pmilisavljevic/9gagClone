import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPosts } from "src/store/postsSlice";
import { AppDispatch, RootState } from "src/store/store";
import { userInfo } from "src/store/userSlice";
import PostComponent from "src/components/Post/PostComponent";

import Loading from "src/components/Loading";

export default function MyPosts() {
  const dispatch = useDispatch<AppDispatch>();

  const userInfoData = useSelector(userInfo);
  const userId = userInfoData ? userInfoData.id : null;

  const { myPosts, fetchMyPostsLoading } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (userId !== null) {
      dispatch(fetchMyPosts(userId));
    }
  }, [dispatch, userId]);

  return (
    <div>
      {fetchMyPostsLoading && <Loading />}
      {myPosts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}
