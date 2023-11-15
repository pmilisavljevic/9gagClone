import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "src/store/postsSlice";
import { RootState } from "src/store/store";
import { AppDispatch } from "src/store/store";
import NavBar from "src/Layout/NavBar";

import PostComponent from "src/Pages/Main/PostComponent";

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <NavBar />
      <div className="main-page__container">
        {loading && <div>Loading...</div>}
        {posts.map((post) => (
          <PostComponent
            key={post.id}
            id={post.id}
            userId={post.user.id}
            userFirstName={post.user.firstName}
            userLastName={post.user.lastName}
            userProfilePicture={post.user.profilePictureUrl}
            title={post.title}
            content={post.content}
            imgUrl={post.imageUrl}
            dateCreated={post.createdAt}
            likesCount={post.likesCount}
            dislikesCount={post.dislikesCount}
            userReaction={post.userReaction}
          />
        ))}
      </div>
    </>
  );
}

export default MainPage;
