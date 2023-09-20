import { RootState } from "../../store/store";
import { uiActions } from "../../store/uiSlice";
import { userActions } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserReduxI, UserApiLoginObject } from "../../interfaces/userI";
import { useEffect } from "react";
import { serverUrl } from "../../utilities/URLs";
import { useNavigate } from "react-router-dom";

const LoginWithFacebook: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);

  // fetch user data from facebook auth, and set user with usreslice
  const getUser = async () => {
    const response = await fetch(serverUrl + "/sucess", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    if (!response.ok) {
      dispatch(uiActions.setError("Failed to login with facebook"));
      navigate("/")
    }
    const data = (await response.json()) as UserApiLoginObject;
    dispatch(userActions.loggedIn(true));
    dispatch(userActions.setUserInfo(data.user));
    localStorage.setItem("token", data.token);
  };

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
        navigate('/wall')
      });
      navigate('/wall')
    }
  }, [dispatch, user]);

  return <></>;
};

export default LoginWithFacebook;
