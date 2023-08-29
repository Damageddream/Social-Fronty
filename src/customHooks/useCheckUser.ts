import jwt from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import UserI, { UserReduxI } from "../interfaces/userI";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { userActions } from "../store/userSlice";

interface decodedToken {
  user: UserI;
  iat: number;
}

export default function useCheckUser() {
  const dispatch = useDispatch();
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const token: string | null = localStorage.getItem("token");
  

  useEffect(() => {
    if (token && user.loggedIn === false) {
      const decodedToken: decodedToken = jwt(token);    
      dispatch(userActions.loggedIn(true))
      dispatch(userActions.setUserFromJWT(decodedToken.user)) 
    }
  }, [dispatch, token, user.loggedIn]);
}
