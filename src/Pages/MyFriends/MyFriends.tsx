import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyFriendComponent from "./MyFriendComponent/MyFriendComponent";
import { AppDispatch, RootState } from "src/store/store";
import { fetchMyFriends } from "src/store/userSlice";

function MyFriends() {
  const dispatch = useDispatch<AppDispatch>();
  const { myFriends } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchMyFriends());
  }, [dispatch]);

  return (
    <div>
      {myFriends.map((friend) => (
        <MyFriendComponent key={friend.id} friend={friend} />
      ))}
    </div>
  );
}

export default MyFriends;
