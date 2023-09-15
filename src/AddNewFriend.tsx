import { serverUrl } from "./utilities/URLs";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { uiActions } from "./store/uiSlice";
import UserI, { NoFriendsI } from "./interfaces/userI";
import { useNavigate } from "react-router-dom";
const AddNewFriend: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const ui = useSelector((state: RootState) => state.ui);
  const [strangers, setStrangers] = useState<UserI[]>();
  const [inviteSend, setInviteSend] = useState(0);

  // getting list of users that are not friends with user sending request
  const fetchStrangers = async () => {
    const response = await fetch(serverUrl + "/users/nofriends", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`,
      },
    })
    const data = (await response.json()) as NoFriendsI;
    setStrangers(data.noFriends);
  };

  const inviteHandler = async (id: string) => {
    dispatch(uiActions.removeError());
    dispatch(uiActions.startLoading());
    const response = await fetch(serverUrl + "/users/nofriends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`,
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      dispatch(uiActions.setError("Failed to send invite"));
      dispatch(uiActions.endLoading());
    }
    if (response.ok) {
      dispatch(uiActions.endLoading());
      setInviteSend((prev) => prev + 1);
    }
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const id = formData.get("id");
    if (typeof id === "string") {
      inviteHandler(id).catch(() => {
        dispatch(uiActions.setError("Failed to send invite"));
      });
    }
  };

  useEffect(() => {
    fetchStrangers().catch(() => {
      dispatch(uiActions.setError("Failed to get list of strangers"));
    });
  }, [inviteSend]);

  return (
    <div>
      {strangers?.map((stranger) => {
        return (
          <div key={stranger._id}>
            <img src={stranger.photo} alt="profile picture" />
            <div>{stranger.name}</div>
            <form onSubmit={submitHandler}>
              <input type="hidden" name="id" value={stranger._id} />
              <button type="submit">Invite to friends</button>
            </form>
            {ui.error.errorStatus && <div>{ui.error.errorInfo}</div>}
          </div>
        );
      })}
      <div onClick={() => navigate("/wall")}>back</div>
    </div>
  );
};

export default AddNewFriend;
