import { useDispatch } from "react-redux";
import { serverUrl } from "../utilities/URLs";
import { userActions } from "../store/userSlice";
import { uiActions } from "../store/uiSlice";
import { UserApiLoginObject } from "../interfaces/userI";

export default function useLoginAndLogout(): [()=>void, (username: string, password: string)=>void] {
    const dispatch = useDispatch()
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
            dispatch(uiActions.setError('logout failed'))
          } else if (response.ok) {
            localStorage.removeItem('token')
            dispatch(userActions.logOut())
          }
        } catch (err) {
          dispatch(uiActions.setError(err))
        }
      };
      const login = async (username: string, password: string) => {
        const response = await fetch(serverUrl + "/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        });
        // if response status is not ok, display error message
        if (!response.ok) {
          dispatch(uiActions.setError("Login failed"));
          return;
        }
    
        if (response.ok) {
          try {
            const data = (await response.json()) as UserApiLoginObject;
            dispatch(userActions.loggedIn(true));
            dispatch(userActions.setUserInfo(data.user));
            localStorage.setItem("token", data.token);
            dispatch(uiActions.endLoading());
          } catch (err) {
            dispatch(uiActions.setError(err));
          }
        }
      };
      return [logout, login]
}