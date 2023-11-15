import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Link } from "react-router-dom";
import { URL } from "src/helpers/constantsAndEnums";
import { Post } from "src/store/types";


type Props = {
  post:Post
  className:string
}

const PostComponent = ({
 post:{ id,
  title,
  user:{
    email,
    firstName,lastName,profilePictureUrl
  },
  content,
  imageUrl,
  createdAt,
  likesCount,
  dislikesCount,
  userReaction,},
  className
}: Props) => {
  const avatar = `${URL}${profilePictureUrl}`;
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
        <p>Created on {createdAt}</p>
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
