import { serverUrl } from "../../utilities/URLs";
import { useEffect, useState } from "react";
import UserI, { UserWithInvites } from "../../interfaces/userI";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import InviteSingle from "./InviteSingle";
import "../../assets/styles/friends.css";

const Invites: React.FC = () => {
  const dispatch = useDispatch();
  const [invites, setInvites] = useState<UserI[]>();
  const [inviteAnswered, setInviteAnswered] = useState(0);

  const token = localStorage.getItem("token");

  const onResponseAction = () => {
    setInviteAnswered((prev) => prev + 1);
  };
  const getInvites = async () => {
    dispatch(uiActions.startLoading());
    const response = await fetch(serverUrl + "/users/invites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`,
      },
    });
    if (response.ok) {
      const data = (await response.json()) as UserWithInvites;
      setInvites(data.invites);
      dispatch(uiActions.endLoading());
    }
    if (!response.ok) {
      dispatch(uiActions.setError("failed to get invites"));
      dispatch(uiActions.endLoading());
    }
  };

  useEffect(() => {
    getInvites().catch(() => {
      dispatch(uiActions.setError("Failed to fetch invites"));
    });
  }, [inviteAnswered]);

  return (
    <div className="addfriend">
      <h1>Invites to friends: </h1>
      <div className="friendsContainer">
        {invites && (
          <>
            {invites.map((invite) => {
              return (
                <div key={invite._id}>
                  <InviteSingle
                    id={invite._id}
                    name={invite.name}
                    photo={invite.photo}
                    onResponseAction={onResponseAction}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Invites;
