import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "src/Layout/NavBar";
import PostComponent from "src/Pages/Main/PostComponent";
import { fetchPosts } from "src/store/postsSlice";
import { AppDispatch, RootState } from "src/store/store";

function PostPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const foundPost = posts.find((post) => post.id === Number(id));

  return (
    <>
      <NavBar />
      <div className="main-page__container">
        {foundPost && (
          <PostComponent
            key={foundPost.id}
            id={foundPost.id}
            userId={foundPost.user.id}
            userFirstName={foundPost.user.firstName}
            userLastName={foundPost.user.lastName}
            userProfilePicture={foundPost.user.profilePictureUrl}
            title={foundPost.title}
            content={foundPost.content}
            imgUrl={foundPost.imageUrl}
            dateCreated={foundPost.createdAt}
            likesCount={foundPost.likesCount}
            dislikesCount={foundPost.dislikesCount}
            userReaction={foundPost.userReaction}
          />
        )}
      </div>
    </>
  );
}

export default PostPage;
