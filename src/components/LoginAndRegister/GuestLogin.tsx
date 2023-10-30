import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import { serverUrl } from "../../utilities/URLs";
import { uiActions } from "../../store/uiSlice";
import { UserApiLoginObject } from "../../interfaces/userI";
import { useState } from "react";
import { RootState } from "../../store/store";

const GuestLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(uiActions.removeError())

  const ui = useSelector((state: RootState) => state.ui);

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    guestLogin().catch(() => {
      dispatch(uiActions.setError("Login as guest failed"));
    });
  };

  const guestLogin = async () => {
    setLoading(true);
    const response = await fetch(serverUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "Guest" }),
    });
    if (!response.ok) {
      setLoading(false);
      dispatch(uiActions.setError("Login failed"));
      return;
    }
    if (response.ok) {
      try {
        const data = (await response.json()) as UserApiLoginObject;
        dispatch(userActions.loggedIn(true));
        dispatch(userActions.setUserInfo(data.user));
        localStorage.setItem("token", data.token);
        setLoading(false);
        navigate("/wall");
      } catch (err) {
        dispatch(uiActions.setError(err));
      }
    }
  };
  return (
    <>
      <button className="guest-btn" onClick={handleClick}>
        {loading ? (
          <div className="lds-dual-ring-white"></div>
        ) : (
          " Visit as guest"
        )}
      </button>
      {ui.error.errorStatus && (
        <div className="warning">{ui.error.errorInfo}</div>
      )}
    </>
  );
};

export default GuestLogin;
