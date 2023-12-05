import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../utilities/URLs";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { uiActions } from "../../store/uiSlice";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  dispatch(uiActions.removeError())

  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(serverUrl + `/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      });
      if (!response.ok) {
        console.error("logging out failed");
      } else if (response.ok) {
        localStorage.removeItem('token')
        dispatch(userActions.logOut())
        navigate("/");
      }
    } catch (err) {
      dispatch(uiActions.setError(err))
    }
  };
  const clickHandler = () => {
    logout().catch((err) => {
      console.error("Loggin out failed");
    });
  };

  return <div role="button" className="logout" onClick={clickHandler}>logout</div>;
};

export default Logout;
