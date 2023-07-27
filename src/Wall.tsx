import { useDispatch, useSelector } from "react-redux";
import UserI, { UserReduxI } from "./interfaces/userI";
import { RootState } from "./store/store";
import { uiActions } from "./store/uiSlice";
import { userActions } from "./store/userSlice";
import {useEffect} from 'react'

 

const Wall: React.FC = () => {

  const dispatch = useDispatch()
  const user: UserReduxI = useSelector((state: RootState)=> state.user)
  const ui = useSelector((state:RootState) => state.ui)

  const getUser = async () => {
    const response = await fetch("http://localhost:3000/sucess", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      }
    })
    if(!response.ok) {
      dispatch(uiActions.setError("Failed to login with facebook"))
    }

    const data = await response.json() as UserI
    console.log(data)
  }

  useEffect(()=>{
    if(!user.loggedIn || user.name === "") {
      const fetchUser = async () => {
        try{ 
          console.log('try')
          await getUser()
        }catch(err){
          console.log(err)
          dispatch(uiActions.setError("Failed to login with facebook"))
        }
      }
      fetchUser()
    }
  },[])

  return (
    <>
      <h1> Wall</h1>
      {user.loggedIn && <div>{user.name}</div>}
    </>
  );
};

export default Wall;
