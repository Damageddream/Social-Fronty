import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";
import { serverUrl } from "../utilities/URLs";

const InviteSingle: React.FC<{
  id: string;
  name: string;
  photo: string;
  onResponseAction: ()=>void;

}> = ({id,name, photo,  onResponseAction}) => {
  const [answer, setAnswer] = useState<"accept" | "denie">("accept");
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const clickAccpeptHandler = () => {
    setAnswer("accept");
  };
  const clickDenieHandler = () => {
    setAnswer("denie");
  };

  const answerInvites = async (id: string) => {
    setLoading(true)
    const token = localStorage.getItem("token");
    const response = await fetch(serverUrl+ "/users/invites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`,
      },
      body: JSON.stringify({ answer, id }),
    });
    if (!response.ok) {
      dispatch(uiActions.setError("Response to invite failed"));
      setLoading(false)
    }
    if(response.ok){
      onResponseAction()
      setLoading(false)
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
      <div>
        <div>User {name} invited you to be friends</div>
        <img src={photo} alt="profile picture" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submitHandler(e);
          }}
        >
          <input name="id" type="hidden" value={id} />
          <button type="submit" onClick={clickAccpeptHandler}>
            accept
          </button>
          <button type="submit" onClick={clickDenieHandler}>
            decline
          </button>
          {loading && <div>Loading....</div>}
        </form>
      </div>
  );
};

export default InviteSingle;
