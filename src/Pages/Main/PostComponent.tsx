import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Link } from "react-router-dom";
import { URL } from "src/helpers/constantsAndEnums";

type Post = {
  id: number;
  userId: number;
  userFirstName: string;
  userLastName: string;
  userProfilePicture: string;
  title: string;
  content: string;
  imgUrl: string;
  dateCreated: string;
  likesCount: number;
  dislikesCount: number;
  userReaction: null;
};

const PostComponent = ({
  id,
  userId,
  userFirstName,
  userLastName,
  userProfilePicture,
  title,
  content,
  imgUrl,
  dateCreated,
  likesCount,
  dislikesCount,
  userReaction,
}: Post) => {
  const avatar = `${URL}${userProfilePicture}`;
  return (
    <div className="post">
      <Link to={`/gag/${id}`} className="post__title">
        {title}
      </Link>
      <p className="post__content">{content}</p>
      <Link to={`/gag/${id}`}>
        <div className="post__img-wrap">
          <img className="post__img" src={`${URL}${imgUrl}`}></img>
        </div>
      </Link>
      <div className="post__flex">
        <img className="post__avatar" src={avatar}></img>

        <p>
          {userFirstName} {}
          {userLastName}
        </p>
        <p>Created on {dateCreated}</p>
        <span>
          <ThumbUpIcon />
          <p>{likesCount}</p>
        </span>
        <span>
          <ThumbDownIcon />
          <p>{dislikesCount}</p>
        </span>
      </div>
    </div>
  );
};

export default PostComponent;
