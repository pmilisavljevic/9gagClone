import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "src/store/store";
import { fetchFriendRequests } from "src/store/userSlice";

import RequestComponent from "./RequestsToMeComponent/RequestComponent";

export default function RequestsToMe() {
  const dispatch = useDispatch<AppDispatch>();
  const { friendRequests } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchFriendRequests());
  }, [dispatch]);

  return (
    <div className="requests-to-me">
      <h2>My Friend Requests</h2>
      {friendRequests.map((request) => (
        <RequestComponent key={request.id} request={request} />
      ))}
    </div>
  );
}
