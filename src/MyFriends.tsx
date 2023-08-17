import { serverUrl } from "./utilities/URLs";
import { useEffect, useState } from "react";
import UserI, { UserWithInvites } from "./interfaces/userI";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/uiSlice";
import { RootState } from "./store/store";

const MyFriends: React.FC = () => {
    const dispatch = useDispatch();
    const ui = useSelector((state: RootState) => state.ui);
    const [friends, setFriends] = useState<UserI[]>();
    const token = localStorage.getItem("token");
  
    const getFriends = async () => {
      const response = await fetch(serverUrl + "/users/friends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      });
      const data = (await response.json()) as UserWithInvites;
      setFriends(data.friends);
    };
  

  
    useEffect(() => {
        getFriends().catch(() => {
        dispatch(uiActions.setError("Failed to fetch invites"));
      });
    }, []);
  
    return (
      <div>
        <h1>Friends: </h1>
        {friends && (
          <div>
            {friends.map((friend) => {
              return (
                <div key={friend._id}>
                  <div>{friend.name}</div>
                  <img src={friend.photo} alt="profile picture" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );

}

export default MyFriends;