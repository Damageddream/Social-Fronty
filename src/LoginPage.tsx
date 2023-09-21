import { serverUrl } from "./utilities/URLs";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserReduxI } from "./interfaces/userI";
import { RootState } from "./store/store";
import useCheckUser from "./customHooks/useCheckUser";
import useGuestLogin from "./customHooks/useGuestLogin";
import LogInNoFacebook from "./components/LoginAndRegister/Login";
import Register from "./components/LoginAndRegister/RegisterUser";

const LogIn: React.FC = () => {
  useCheckUser();
  const [guestLogin] = useGuestLogin();
  const navigate = useNavigate();
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const [renderLoginForm, setRenderLoginForm] = useState<
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

  const backToDefault = () => {
    setRenderLoginForm('default')
  }

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/wall");
    }
  }, []);

  return (
    <div>
      {renderLoginForm === "default" && (
        <div>
          <button onClick={facebook}>Login with facebook</button>
          <button
            onClick={() => {
              setRenderLoginForm("Register");
            }}
          >
            Register user
          </button>
          <button onClick={() => setRenderLoginForm("Login")}>Log In</button>
          <button onClick={handleClick}>Visit as guest</button>
        </div>
      )}
      {renderLoginForm === "Login" && <LogInNoFacebook backToDefault={backToDefault} />}
      {renderLoginForm === "Register" && <Register backToDefault={backToDefault} />}
    </div>
  );
};

export default LogIn;
