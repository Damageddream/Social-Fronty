import { serverUrl } from "./utilities/URLs";
import { useEffect, useState } from "react";
import UserI, { UserWithInvites } from "./interfaces/userI";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/uiSlice";
import { RootState } from "./store/store";
import InviteSingle from "./components/InviteSingle";

const Invites: React.FC = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state: RootState) => state.ui);
  const [invites, setInvites] = useState<UserI[]>();

  const token = localStorage.getItem("token");

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
  }, []);

  return (
    <div>
      <h1>Invites to friends: </h1>
      {invites && (
        <div>
          {invites.map((invite) => {
            return (
              <InviteSingle id={invite._id} name={invite.name} photo={invite.photo} getInvites={()=>getInvites()} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Invites;
