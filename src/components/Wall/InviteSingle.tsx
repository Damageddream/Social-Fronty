import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import { serverUrl } from "../../utilities/URLs";
import { RootState } from "../../store/store";

const InviteSingle: React.FC<{
  id: string;
  name: string;
  photo: string;
  onResponseAction: () => void;
}> = ({ id, name, photo, onResponseAction }) => {
  const [answer, setAnswer] = useState<"accept" | "denie">("accept");
  const [denieLoading, setDenieLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const ui = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  dispatch(uiActions.removeError)

  const clickAccpeptHandler = () => {
    setAnswer("accept");
  };
  const clickDenieHandler = () => {
    setAnswer("denie");
  };

  const answerInvites = async (id: string) => {
    if (answer === "accept") {
      setAcceptLoading(true);
    } else {
      setDenieLoading(true);
    }
    const token = localStorage.getItem("token");
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
    if (response.ok) {
      onResponseAction();
    }
    if (answer === "accept") {
      setAcceptLoading(false);
    } else {
      setDenieLoading(false);
    }
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

  return (
    <div className="friend">
      <div>User {name} invited you to be friends</div>
      <img src={photo} alt="profile picture" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void submitHandler(e);
        }}
        data-testid="form"
      >
        <input name="id" type="hidden" value={id} data-testid="hidden-input" />
        <div className="inviteButtons">
          <button type="submit" onClick={clickAccpeptHandler}>
            {acceptLoading ? <div className="lds-dual-ring"></div> : "Accept"}
          </button>
          <button type="submit" className="decline" onClick={clickDenieHandler}>
            {denieLoading ? <div className="lds-dual-ring"></div> : "Decline"}
          </button>
        </div>
        {ui.error.errorStatus && (
          <div className="warning">{ui.error.errorInfo}</div>
        )}
      </form>
    </div>
  );
};

export default InviteSingle;
