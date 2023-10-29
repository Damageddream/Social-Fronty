import { serverUrl } from "../../utilities/URLs";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import UserI, { NoFriendsI } from "../../interfaces/userI";
import Search from "./Search";
import "../../assets/styles/friends.css";
import AddNewSingle from "./AddNewSingle";
const AddNewFriend: React.FC = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [strangers, setStrangers] = useState<UserI[]>();
  const [displayStrangers, setDisplayStrangers] = useState<UserI[]>();
  const [inviteSend, setInviteSend] = useState(0);
  const [loading, setLoading] = useState(false)

  dispatch(uiActions.removeError());
  // getting list of users that are not friends with user sending request
  const fetchStrangers = async () => {
    const response = await fetch(serverUrl + "/users/nofriends", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`,
      },
    });
    const data = (await response.json()) as NoFriendsI;
    setStrangers(data.noFriends);
  };

  const inviteHandler = async (id: string) => {
    
    setLoading(true)
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
      setLoading(false)
    }
    if (response.ok) {
      setLoading(false)
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

  const updateStrangers = (newStrangersArray: UserI[]): void => {
    setDisplayStrangers(newStrangersArray);
  };

  useEffect(() => {
    fetchStrangers().catch(() => {
      dispatch(uiActions.setError("Failed to get list of strangers"));
    });
  }, [inviteSend]);

  useEffect(() => {
    setDisplayStrangers(strangers);
  }, [strangers]);

  return (
    <div className="addfriend">
      <div className="friendHeader">
        <div className="empty"></div>
        <h1 className="friendH1">Search for friends</h1>
        <Search strangers={strangers} updateStrangers={updateStrangers} />
      </div>
      <div className="friendsContainer">
        {displayStrangers?.map((stranger) => {
          return (
            <div key={stranger._id}>
              <AddNewSingle stranger={stranger} submitHandler={submitHandler} loading={loading} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddNewFriend;
