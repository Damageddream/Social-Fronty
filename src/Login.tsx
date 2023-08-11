import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "./store/store";
import { userActions } from "./store/userSlice";
import { uiActions } from "./store/uiSlice";
import { useState, FormEventHandler } from "react";
import { serverUrl } from "./utilities/URLs";
import { UserApiLoginObject } from "./interfaces/userI";

const LogInNoFacebook: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    const response = await fetch(serverUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (response.ok) {
      const data = (await response.json()) as UserApiLoginObject;
      dispatch(userActions.loggedIn(true));
      dispatch(userActions.setUserInfo(data.user));
      localStorage.setItem("token", data.token);
      navigate('/')
    }
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    login().catch((err) => {
        dispatch(uiActions.setError("Failed to login"));
      });
  };

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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LogInNoFacebook;
