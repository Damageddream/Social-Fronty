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

  const answerInvites = async (id: string) => {
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
  }, []);

  return (
    <div>
      <h1>Inviets: </h1>
      {invites && (
        <div>
          {invites.map((invite) => {
            return (
              <div key={invite._id}>
                <div>User {invite.name} invited you to be friends</div>
                <img src={invite.photo} alt="profile picture" />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void submitHandler(e);
                  }}
                >
                  <input name="id" type="hidden" value={invite._id} />
                  <button type="submit" onClick={clickAccpeptHandler}>
                    accept
                  </button>
                  <button type="submit" onClick={clickDenieHandler}>
                    denie
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Invites;
