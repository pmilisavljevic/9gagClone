import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Link } from "react-router-dom";
import { URL } from "src/helpers/constantsAndEnums";
import { Post } from "src/store/types";
import { AppDispatch } from "src/store/store";
import { useDispatch } from "react-redux";
import { thumbsDownPost, thumbsUpPost } from "src/store/postsSlice";
import { addFriend } from "src/store/userSlice";

type Props = {
  post: Post;
  className?: string;
};

const PostComponent = ({
  post: {
    id,
    title,
    user: { id: userId, firstName, lastName, profilePictureUrl, isFriendsWith },
    content,
    imageUrl,
    createdAt,
    likesCount,
    dislikesCount,
    userReaction,
  },
  className,
}: Props) => {
  const avatar = `${URL}${profilePictureUrl}`;
  const dispatch = useDispatch<AppDispatch>();
  function handleThumbsUp(postId: number) {
    dispatch(thumbsUpPost(postId));
  }
  function handleThumbsDown(postId: number) {
    dispatch(thumbsDownPost(postId));
  }

  function handleAddFriend(userId: number) {
    dispatch(addFriend(userId));
  }

  const dateString = createdAt;
  const date = new Date(dateString);

  const readableDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={`post ${className}`}>
      <Link to={`/gag/${id}`} className="post__title">
        {title}
      </Link>
      <p className="post__content">{content}</p>
      <Link to={`/gag/${id}`}>
        <div className="post__img-wrap">
          <img className="post__img" src={`${URL}${imageUrl}`}></img>
        </div>
      </Link>
      <div className="post__flex">
        <img className="post__avatar" src={avatar}></img>

        <p>
          {firstName} {}
          {lastName}
        </p>
        {isFriendsWith === true ? (
          <p>friend</p>
        ) : (
          <button onClick={() => handleAddFriend(userId)}>Add friend </button>
        )}

        <p>{readableDate}</p>
        <span onClick={() => handleThumbsUp(id)}>
          <ThumbUpIcon
            className={`post__tup  ${
              userReaction === 1 ? `post__tup-clicked` : ""
            }`}
          />
          <p>{likesCount}</p>
        </span>
        <span onClick={() => handleThumbsDown(id)}>
          <ThumbDownIcon
            className={`post__tdown  ${
              userReaction === 2 ? `post__tdown-clicked` : ""
            }`}
          />
          <p>{dislikesCount}</p>
        </span>
      </div>
    </div>
  );
};

export default PostComponent;
