import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPosts } from "src/store/postsSlice";
import { AppDispatch, RootState } from "src/store/store";
import { userInfo } from "src/store/userSlice";
import PostComponent from "src/Pages/Main/PostComponent";

function MyPosts() {
  const dispatch = useDispatch<AppDispatch>();

  const userInfoData = useSelector(userInfo);
  const userId = userInfoData ? userInfoData.id : null;

  const { myPosts } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (userId !== null) {
      dispatch(fetchMyPosts(userId));
    }
  }, [dispatch, userId]);

  return (
    <div>
      {myPosts.map((post) => (
        <PostComponent
          key={post.id}
          post={post}
          className={"post--normal-title   "}
        />
      ))}
    </div>
  );
}

export default MyPosts;
