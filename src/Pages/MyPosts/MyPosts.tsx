import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPosts } from "src/store/postsSlice";
import { AppDispatch, RootState } from "src/store/store";
import { userInfo } from "src/store/userSlice";
import PostComponent from "src/Pages/Main/PostComponent";
import { CircularProgress } from "@mui/material";

function MyPosts() {
  const dispatch = useDispatch<AppDispatch>();

  const userInfoData = useSelector(userInfo);
  const userId = userInfoData ? userInfoData.id : null;

  const { myPosts, loading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (userId !== null) {
      dispatch(fetchMyPosts(userId));
    }
  }, [dispatch, userId]);

  return (
    <div>
      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      {myPosts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}

export default MyPosts;
