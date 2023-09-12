import { useDispatch, useSelector } from "react-redux";
import { UserReduxI } from "./interfaces/userI";
import { RootState } from "./store/store";
import { modalActions } from "./store/modalSlice";
import { useNavigate } from "react-router-dom";
import AddPost from "./components/AddPost";
import { serverUrl } from "./utilities/URLs";
import { useEffect, useState } from "react";
import { PostI, PostDataFromApi } from "./interfaces/postI";
import useCheckUser from "./customHooks/useCheckUser";
import useLike from "./customHooks/useLike";
import EditProfile from "./components/EditProfile";
import ProfileOptions from "./components/ProfileOptions";
import Logout from "./components/Logout";
import { uiActions } from "./store/uiSlice";

const Wall: React.FC = () => {
  // custom hook, checking if user is already logged in
  useCheckUser();

  // custom hook, handling fetching data on liking post or comment
  const [like] = useLike();

  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);
  const modal = useSelector((state: RootState) => state.modal);
  const [posts, setPosts] = useState<PostI[]>([]);

  // fetch all posts of user and friends of user
  const getUsersPosts = async () => {
    dispatch(uiActions.startLoading());
    const token = localStorage.getItem("token");
    const response = await fetch(serverUrl + "/wall", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`,
      },
    });
    if (response.ok) {
      try {
        const data = (await response.json()) as PostDataFromApi;
        setPosts(data.posts);
      } catch (err) {
        dispatch(uiActions.setError(err));
      } finally {
        dispatch(uiActions.endLoading());
      }
    }
    if(!response.ok){
      dispatch(uiActions.endLoading());
      dispatch(uiActions.setError("Getting posts failed"));
      return;
    }
  };
  //fetch posts on first render
  useEffect(() => {
    getUsersPosts().catch(() => {
      console.error("Failed to fetch posts");
    });
  }, []);

  return (
    <>
      <h1> Wall</h1>
      {user.loggedIn && (
        <>
          <div>
            {user.name}
            <img src={user.photo} alt="user profile picture" />
          </div>
          <Logout />
          <ProfileOptions userId={user._id} />
          {modal.showUser && (
            <EditProfile orginalName={user.name} userId={user._id} />
          )}
        </>
      )}
      {ui.error.errorStatus && <div>{ui.error.errorInfo}</div>}
      <button
        onClick={() => {
          dispatch(modalActions.showPostModal());
        }}
      >
        Add new post
      </button>
      {modal.showPost && <AddPost />}
      <button onClick={() => navigate("/invite")}>Search for friend</button>
      <button onClick={() => navigate("/invites")}>Add new friends</button>
      <button onClick={() => navigate("/friends")}>Your friends</button>
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <div key={post._id}>
              <div onClick={() => navigate(`/posts/${post._id.toString()}`)}>
                {post.title}
                {post.text}
                {post.author.name}
              </div>
              <button
                onClick={() =>
                  like({ componentType: "post", id: post._id.toString() })
                }
              >
                Like
              </button>
              <div onClick={()=>{navigate(`/posts/${post._id.toString()}`)}}>Comments: {post.comments.length}</div>
            </div>
          );
        })
      ) : (
        <div>No Posts</div>
      )}
    </>
  );
};

export default Wall;
