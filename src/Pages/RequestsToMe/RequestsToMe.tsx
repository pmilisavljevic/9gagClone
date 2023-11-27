import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "src/store/store";
import { fetchFriendRequests } from "src/store/userSlice";
import RequestComponent from "./RequestComponent";

function RequestsToMe() {
  const dispatch = useDispatch<AppDispatch>();
  const { friendRequests } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchFriendRequests());
  }, [dispatch]);

  return (
    <div>
      {friendRequests.map((request) => (
        <RequestComponent key={request.id} request={request} />
      ))}
    </div>
  );
}
export default RequestsToMe;
