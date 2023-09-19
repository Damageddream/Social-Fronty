import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { serverUrl } from "../utilities/URLs";
import { uiActions } from "../store/uiSlice";
import { UserApiLoginObject } from "../interfaces/userI";

export default function useGuestLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async () => {
    dispatch(uiActions.startLoading());
    const response = await fetch(serverUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "Guest"}),
    });
    if (!response.ok) {
      dispatch(uiActions.endLoading());
      dispatch(uiActions.setError("Login failed"));
      return;
    }
    if (response.ok) {
      try {
        const data = (await response.json()) as UserApiLoginObject;
        dispatch(userActions.loggedIn(true));
        dispatch(userActions.setUserInfo(data.user));
        localStorage.setItem("token", data.token);
        dispatch(uiActions.endLoading());
        navigate("/wall");
      } catch (err) {
        dispatch(uiActions.setError(err));
      }
    }
  };
  return [login];
}
