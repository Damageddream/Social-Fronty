import { serverUrl } from "./utilities/URLs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserReduxI } from "./interfaces/userI";
import { RootState } from "./store/store";
import useCheckUser from "./customHooks/useCheckUser";
import useGuestLogin from "./customHooks/useGuestLogin";

const LogIn: React.FC = () => {
  useCheckUser();
  const [guestLogin] = useGuestLogin();
  const navigate = useNavigate();
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const [renderLoginForm, serRenderLoginForm] = useState<
    "default" | "Login" | "Register"
  >("default");

  const facebook = () => {
    window.open(serverUrl + "/login/facebook", "_self");
  };

  const handleClick = () => {
    guestLogin().catch(() => {
      console.error("er");
    });
  };

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/wall");
    }
  }, []);

  return (
    <div>
      { renderLoginForm === "default" &&
        <div>
          {" "}
          <button onClick={facebook}>Login with facebook</button>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register user
          </button>
          <button onClick={() => navigate("/login")}>Log In</button>
          <button onClick={handleClick}>Visit as guest</button>
        </div>
      }
    </div>
  );
};

export default LogIn;
