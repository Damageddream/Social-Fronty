import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "./store/store";
import { userActions } from "./store/userSlice";
import { uiActions } from "./store/uiSlice";
import { useState, FormEventHandler, useEffect } from "react";
import { serverUrl } from "./utilities/URLs";
import { UserApiLoginObject } from "./interfaces/userI";


const LogInNoFacebook: React.FC = () => {

  const navigate = useNavigate();
  const ui = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  // fetching user data from backend and set user in redux state
  const login = async () => {
    dispatch(uiActions.startLoading());
    const response = await fetch(serverUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    // if response status is not ok, display error message
    if (!response.ok) {
      dispatch(uiActions.endLoading());
      dispatch(uiActions.setError("Login failed"));
      return;
    }

    if (response.ok) {
      try{
        const data = (await response.json()) as UserApiLoginObject;
        dispatch(userActions.loggedIn(true));
        dispatch(userActions.setUserInfo(data.user));
        localStorage.setItem("token", data.token);
        dispatch(uiActions.endLoading());
        navigate("/wall");
      }catch(err){dispatch(uiActions.setError(err))}

    }
  };

  //form submission, validating form
  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    // reseting error info
    dispatch(uiActions.removeError());
    // form client validation
    if (
      username.length === 0 ||
      password.length === 0
    ) {
      dispatch(uiActions.setError("form rows cannot be empty"));
      return;
    }
    // fetching user
    login().catch(() => {
      dispatch(uiActions.setError("Failed to login"));
      return;
    });
  };

  //reseting error status
  useEffect(() => {
    if (ui.error.errorStatus) {
      dispatch(uiActions.removeError());
    }
  }, []);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        {ui.error.errorStatus && <div>{ui.error.errorInfo}</div>}
        <button type="submit">{ui.loading ? "Loading..." : "Login"}</button>
      </form>
      <div onClick={() => navigate("/")}>back</div>
    </div>
  );
};

export default LogInNoFacebook;
