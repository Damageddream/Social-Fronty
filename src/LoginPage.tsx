import { serverUrl } from "./utilities/URLs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserReduxI } from "./interfaces/userI";
import { RootState } from "./store/store";

const LogIn: React.FC = () => {

  const navigate = useNavigate()
  const user: UserReduxI = useSelector((state: RootState)=> state.user)

  const facebook = () => {
    window.open(serverUrl + "/login/facebook", "_self");
  };

  useEffect(()=>{
    if(user.loggedIn){
      navigate("/wall")
    }
  }, [])

  return (
    <div>
      <button onClick={facebook}>Login with facebook</button>
      <button onClick={()=>{navigate("/register")}}>Register user</button>
      <button onClick={()=>navigate("/login")}>Log In</button>
    </div>
  );
};

export default LogIn;
