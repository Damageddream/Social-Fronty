import { serverUrl } from "./utilities/URLs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserReduxI } from "./interfaces/userI";
import { RootState } from "./store/store";
import useCheckUser from "./customHooks/useCheckUser";
import LogInNoFacebook from "./components/LoginAndRegister/Login";
import Register from "./components/LoginAndRegister/RegisterUser";
import "./assets/styles/loginPage.css";
import Logo from "./components/Logo/Logo";
import { uiActions } from "./store/uiSlice";
import GuestLogin from "./components/LoginAndRegister/GuestLogin";

const LogIn: React.FC = () => {
  useCheckUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);
  const [renderLoginForm, setRenderLoginForm] = useState<
    "default" | "Login" | "Register"
  >("default");

  dispatch(uiActions.removeError());

  const facebook = () => {
    dispatch(uiActions.startLoading());
    window.open(serverUrl + "/login/facebook", "_self");
  };

  const backToDefault = () => {
    setRenderLoginForm("default");
  };

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/wall");
    }
  }, []);

  return (
    <div className="login-page">
      <>
        {renderLoginForm === "default" && (
          <div className="login-nav">
            <h1>Log in to your account</h1>
            <div
            role="button"
              className="register-nav"
              onClick={() => {
                setRenderLoginForm("Register");
              }}
            >
              Don't have an account?<span>Sign up</span>
            </div>
            <button onClick={facebook}>
              {ui.loading ? (
                <div className="lds-dual-ring"></div>
              ) : (
                "Log in with facebook"
              )}
            </button>
            {ui.error.errorStatus && (
              <div className="warning">
                {ui.error.errorInfo}something went wrong
              </div>
            )}
            <button onClick={() => setRenderLoginForm("Login")}>Log In</button>
            <GuestLogin />
          </div>
        )}
        {renderLoginForm === "Login" && (
          <LogInNoFacebook backToDefault={backToDefault} />
        )}
        {renderLoginForm === "Register" && (
          <Register backToDefault={backToDefault} />
        )}
      </>
      <Logo />
    </div>
  );
};

export default LogIn;
