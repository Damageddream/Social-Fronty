import { useDispatch, useSelector } from "react-redux";
import { UserReduxI, UserApiLoginObject } from "./interfaces/userI";
import { RootState } from "./store/store";
import { uiActions } from "./store/uiSlice";
import { userActions } from "./store/userSlice";
import { useEffect } from "react";
import { serverUrl } from "./utilities/URLs"
import { useNavigate } from "react-router-dom";

const Wall: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);

  // fetch user data from facebook auth, and set user with usreslice
  const getUser = async () => {
    const response = await fetch(serverUrl+"/sucess", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    if (!response.ok) {
      dispatch(uiActions.setError("Failed to login with facebook"));
    }
    const data = (await response.json()) as UserApiLoginObject;
    dispatch(userActions.loggedIn(true));
    dispatch(userActions.setUserInfo(data.user));
  };
  // get user data from facebook after inital render.
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser();
      } catch (err) {
        dispatch(uiActions.setError("Failed to login with facebook"));
      }
    };
    if (!user.loggedIn || user.name === "") {
      fetchUser().catch((err) => {
        dispatch(uiActions.setError("Failed to login with facebook"));
      });
    }
  }, [dispatch, user]);

  return (
    <>
      <h1> Wall</h1>
      {user.loggedIn && <div>{user.name}</div>}
      <button onClick={()=>{navigate("/")}}>back</button>
      {ui.error.errorStatus && <div>{ui.error.errorInfo}</div>}
    </>
  );
};

export default Wall;
