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
      <img className="request-component__avatar" src={avatar}></img>
      <p>
        {request.requester.firstName} {}
        {request.requester.lastName}
      </p>
      <p>On {request.requestDate}</p>
      <button onClick={() => handleAcceptRequest(requestId)}>Accept</button>
      <button onClick={() => handleDeclineRequest(requestId)}>Decline</button>
    </div>
  );
}

export default RequestComponent;
