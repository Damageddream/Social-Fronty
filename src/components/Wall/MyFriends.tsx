import { serverUrl } from "../../utilities/URLs";
import { useEffect, useState } from "react";
import UserI, { UserWithInvites } from "../../interfaces/userI";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import "../../assets/styles/friends.css";
import { RootState } from "../../store/store";

const MyFriends: React.FC = () => {
  const dispatch = useDispatch();
  const [friends, setFriends] = useState<UserI[]>();
  const token = localStorage.getItem("token");
  const ui = useSelector((state:RootState) => state.ui)

  dispatch(uiActions.removeError())

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
    <div className="friendsMain">
      <h1>Friends: </h1>
      <div>
        {ui.error.errorStatus && <div className="warning">{ui.error.errorInfo}</div>}
        {friends && (
          <div className="friendsContainer">
            {friends.map((friend) => {
              return (
                <div className="friend" key={friend._id}>
                  <img src={friend.photo} alt="profile picture" />
                  <div>{friend.name}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFriends;
