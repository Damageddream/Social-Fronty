import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";
import { serverUrl } from "../utilities/URLs";
import { RootState } from "../store/store";

const InviteSingle: React.FC<{
  id: string;
  name: string;
  photo: string;
  getInvites: ()=>void

}> = ({id,name, photo, getInvites}) => {
  const [answer, setAnswer] = useState<"accept" | "denie">("accept");
  const ui = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch()
  const clickAccpeptHandler = () => {
    setAnswer("accept");
  };
  const clickDenieHandler = () => {
    setAnswer("denie");
  };

  const answerInvites = async (id: string) => {
    dispatch(uiActions.startLoading())
    
    
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
      dispatch(uiActions.endLoading())
    }
    if(response.ok){
      getInvites()
      dispatch(uiActions.endLoading())
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
    <>
      <div key={id}>
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
          {ui.loading && <div>Loading....</div>}
        </form>
      </div>
    </>
  );
};

export default InviteSingle;
