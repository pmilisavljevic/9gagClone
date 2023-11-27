import { Link } from "react-router-dom";
import { URL } from "src/helpers/constantsAndEnums";
import { UserType } from "src/store/types";

type Props = {
  friend: UserType;
};

function MyFriendComponent({ friend }: Props) {
  const avatar = `${URL}${friend.profilePictureUrl}`;
  return (
    <div className="my-friend-component">
      <img className="request-component__avatar" src={avatar}></img>
      <p>
        {friend.firstName} {}
        {friend.lastName}
      </p>
      <div>
        <Link to={`/posts-by-friend/${friend.id}`}>posts-by-friend</Link>
        <Link to={`/posts-liked-by-friend/${friend.id}`}>
          posts-liked-by-friend
        </Link>
      </div>
    </div>
  );
}

export default MyFriendComponent;
