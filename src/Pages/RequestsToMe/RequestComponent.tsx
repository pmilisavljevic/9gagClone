import { useState } from "react";
import { useDispatch } from "react-redux";
import { URL } from "src/helpers/constantsAndEnums";
import { FriendRequestAxios } from "src/services/client";
import { AppDispatch } from "src/store/store";
import { friendRequest } from "src/store/types";
import { fetchFriendRequests } from "src/store/userSlice";
import { formatDate } from "src/utils/dateFormat";
type Props = {
  request: friendRequest;
};

function RequestComponent({ request }: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const avatar = `${URL}${request.requester.profilePictureUrl}`;
  const requestId = request.id;
  async function handleRequest(
    requestId: number,
    reaction: "accept" | "decline"
  ) {
    try {
      setLoading(true);
      await FriendRequestAxios(requestId, reaction);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(fetchFriendRequests());
      setLoading(false);
    }
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
      <p> {formatDate(request.requestDate)}</p>
      <div className="request-component__btns">
        <button
          className="request-component__btn"
          onClick={() => handleRequest(requestId, "accept")}
        >
          Accept
        </button>
        <button
          className="request-component__btn"
          onClick={() => handleRequest(requestId, "decline")}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default RequestComponent;
