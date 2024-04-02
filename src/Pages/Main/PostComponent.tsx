import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Link, useNavigate } from "react-router-dom";
import { ReactionType, URL } from "src/helpers/constantsAndEnums";
import { Post } from "src/store/types";
import { AppDispatch } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { handlePostReaction } from "src/store/postsSlice";
import { addFriend, userInfo } from "src/store/userSlice";
import { formatDate } from "src/utils/dateFormat";

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
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userInfoData = useSelector(userInfo);
  const stateUserId = userInfoData ? userInfoData.id : null;

  const handleReaction = (postId: number, reactionType: "like" | "dislike") => {
    if (token) {
      dispatch(handlePostReaction({ postId, reactionType }));
    } else {
      navigate("/login");
    }
  };

  function handleAddFriend(userId: number) {
    if (token) {
      dispatch(addFriend(userId));
    } else {
      navigate("/login");
    }
  }

  return (
    <div className={` ${className} `}>
      <div className="post">
        <Link to={`/gag/${id}`} className="post__title">
          {title}
        </Link>
        <p className="post__content">{content}</p>
        <Link className="img-link" to={`/gag/${id}`}>
          <div className="post__img-wrap">
            <img className="post__img" src={`${URL}${imageUrl}`}></img>
          </div>
        </Link>
        <div className="post__flex">
          <div className="flex">
            <img className="post__avatar" src={avatar}></img>

            <p className="post__name">
              {firstName} {}
              {lastName}
            </p>
            <div className="post__friend">
              {stateUserId === userId ? (
                <p className="post__friend__user">you</p>
              ) : isFriendsWith ? (
                <p className="post__friend__friend">friend</p>
              ) : (
                <button onClick={() => handleAddFriend(userId)}>
                  Add friend
                </button>
              )}
            </div>
          </div>

          <p className="post__date">{formatDate(createdAt)}</p>
          <div className="post__likes flex">
            <span onClick={() => handleReaction(id, "like")}>
              <ThumbUpIcon
                className={`post__tup  ${
                  userReaction === ReactionType.Like ? `post__tup-clicked` : ""
                }`}
              />
              <p>{likesCount}</p>
            </span>
            <span onClick={() => handleReaction(id, "dislike")}>
              <ThumbDownIcon
                className={`post__tdown  ${
                  userReaction === ReactionType.Dislike
                    ? `post__tdown-clicked`
                    : ""
                }`}
              />
              <p>{dislikesCount}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
