import { URL } from "src/helpers/constantsAndEnums";
import {
  acceptFriendRequestAxios,
  declineFriendRequestAxios,
} from "src/services/client";
import { friendRequest } from "src/store/types";

type Props = {
  request: friendRequest;
};

function RequestComponent({ request }: Props) {
  const dateString = request.requestDate;
  const date = new Date(dateString);

  const readableDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const avatar = `${URL}${request.requester.profilePictureUrl}`;
  const requestId = request.id;
  async function handleAcceptRequest(requestId: number) {
    await acceptFriendRequestAxios(requestId);
  }
  async function handleDeclineRequest(requestId: number) {
    await declineFriendRequestAxios(requestId);
  }

  return (
    <div className="request-component">
      <div className="flex">
        <img className="request-component__avatar" src={avatar}></img>
        <p>
          {request.requester.firstName} {}
          {request.requester.lastName}
        </p>
      </div>
      <p> {readableDate}</p>
      <div className="request-component__btns">
        <button
          className="request-component__btn"
          onClick={() => handleAcceptRequest(requestId)}
        >
          Accept
        </button>
        <button
          className="request-component__btn"
          onClick={() => handleDeclineRequest(requestId)}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default RequestComponent;
