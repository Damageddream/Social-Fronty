import { serverUrl } from "./utilities/URLs";
import { useEffect, useState } from "react";
import UserI, { UserWithInvites } from "./interfaces/userI";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/uiSlice";
import { RootState } from "./store/store";

const Invites: React.FC = () => {
  const dispatch = useDispatch();
  const ui = useSelector((state: RootState) => state.ui);
  const [answer, setAnswer] = useState<"accept" | "denie">("accept");
  const [invites, setInvites] = useState<UserI[]>();
  const [inviteAnswered, setInviteAnswered] = useState(0);
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

  const answerInvites = async (id: string) => {
    dispatch(uiActions.startLoading())
    const response = await fetch(serverUrl + "/users/invites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`,
      },
      body: JSON.stringify({ answer, id }),
    });
    if (!response.ok) {
      dispatch(uiActions.setError("Response to invite failed"));
      dispatch(uiActions.endLoading())
    }
    if(response.ok){
      setInviteAnswered(prev=>prev+1)
      dispatch(uiActions.endLoading())
    }
  };
  const clickAccpeptHandler = () => {
    setAnswer("accept");
  };
  const clickDenieHandler = () => {
    setAnswer("denie");
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget[0] as HTMLInputElement;
    if (input) {
      const id = input.value;
      try {
        await answerInvites(id);
      } catch (err) {
        dispatch(uiActions.setError("Response to invite failed"));
      }
    } else {
      dispatch(uiActions.setError("Wrong input"));
    }
  };

  useEffect(() => {
    getInvites().catch(() => {
      dispatch(uiActions.setError("Failed to fetch invites"));
    });
  }, [inviteAnswered]);

  return (
    <div>
      <h1>Inviets: </h1>
      {invites && (
        <div>
          {invites.map((invite) => {
            return (

            );
          })}
        </div>
      )}
    </div>
  );
};

export default Invites;
