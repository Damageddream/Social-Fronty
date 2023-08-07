import { serverUrl } from "./utilities/URLs";
import { useEffect, useState } from "react";
import UserI, { UserWithInvites } from "./interfaces/userI";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/uiSlice";
import { RootState } from "./store/store";

const Invites: React.FC = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state: RootState) => state.ui);
  const [invites, setInvites] = useState<UserI[]>();
  const token = localStorage.getItem("token");
  const getInvites = async () => {
    const response = await fetch(serverUrl + "/users/invites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`,
      },
    });
    const data = (await response.json()) as UserWithInvites;
    setInvites(data.invites);

  };

  useEffect(() => {
    getInvites().catch((err) => {
      dispatch(uiActions.setError("Failed to fetch invites"));
    });
  }, []);

  return <div><h1>Inviets: </h1>{invites && <div>
    {invites.map(invite=>{
        return <div><div>User {invite.name} invited you to be friends</div>
            <img src={invite.photo} alt="profile picture" />
            <button>accept</button> <button>denie</button>
        </div>
    })}</div>}</div>;
};

export default Invites;
