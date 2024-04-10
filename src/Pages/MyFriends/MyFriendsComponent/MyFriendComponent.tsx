import { Link } from "react-router-dom";

import { URL } from "src/helpers/constantsAndEnums";
import { UserType } from "src/store/types";

type Props = {
  friend: UserType;
};

export default function MyFriendComponent({ friend }: Props) {
  const avatar = `${URL}${friend.profilePictureUrl}`;
  return (
    <div className="my-friend-component">
      <div className="my-friend-component__flex">
        <img className="my-friend-component__avatar" src={avatar}></img>
        <p className="my-friend-component__name">
          {friend.firstName} {}
          {friend.lastName}
        </p>
      </div>
      <div className="my-friend-component__grid">
        <Link
          className="my-friend-component__button"
          to={`/posts-by-friend/${friend.id}`}
        >
          Posts
        </Link>
        <Link
          className="my-friend-component__button"
          to={`/posts-liked-by-friend/${friend.id}`}
        >
          Liked Posts
        </Link>
      </div>
    </div>
  );
}
