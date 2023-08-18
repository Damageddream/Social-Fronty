import { useDispatch, useSelector } from "react-redux";
import { UserReduxI } from "./interfaces/userI";
import { RootState } from "./store/store";
import { modalActions } from "./store/modalSlice";
import { useNavigate } from "react-router-dom";
import AddPost from "./components/AddPost";
import { serverUrl } from "./utilities/URLs";
import { useEffect, useState } from "react";
import { PostI } from "./interfaces/postI";


const Wall: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);
  const modal = useSelector((state: RootState) => state.modal);

  const [posts, setPosts] = useState<PostI[]>() 

  const getUsersPosts = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch(serverUrl + "/posts/wall", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`,
      }
    })
    const data = (await response.json()) as PostI[];
    setPosts(data)
  }

  useEffect(()=>{
    getUsersPosts().catch(() => {
      console.error("Failed to fetch posts");
    });
  },[])

  return (
    <>
      <h1> Wall</h1>
      {user.loggedIn && (
        <div>
          {user.name}
          <img src={user.photo} alt="user profile picture" />
        </div>
      )}
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        back
      </button>
      {ui.error.errorStatus && <div>{ui.error.errorInfo}</div>}
      <button
        onClick={() => {
          dispatch(modalActions.showModal());
        }}
      >
        Add new post
      </button>
      {modal.show && <AddPost />}
      <button onClick={()=>navigate("/invite")}>Search for friend</button>
      <button onClick={()=>navigate("/invites")}>Add new friends</button>
      <button onClick={()=>navigate("/friends")}>Your friends</button>
      {posts && posts.map((post)=> {
        return(<div>
          {post.title}
          {post.text}
          {post.author}
        </div>)
      })}
     
    </>
  );
};

export default Wall;
