import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { modalActions } from "./store/modalSlice";
import AddPost from "./components/AddPost";
import { serverUrl } from "./utilities/URLs";
import { useEffect, useState } from "react";
import { PostI, PostDataFromApi } from "./interfaces/postI";
import useCheckUser from "./customHooks/useCheckUser";
import useLike from "./customHooks/useLike";
import { uiActions } from "./store/uiSlice";
import WallNav from "./components/WallNav";
import ProfileNav from "./components/ProfileNav";
import PostCard from "./components/PostCard";

const Wall: React.FC = () => {
  // custom hook, checking if user is already logged in
  useCheckUser();

  // custom hook, handling fetching data on liking post or comment
  const [like, likeChanged] = useLike();

  //hooks
  const dispatch = useDispatch();
  const ui = useSelector((state: RootState) => state.ui);
  const modal = useSelector((state: RootState) => state.modal);
  const [posts, setPosts] = useState<PostI[]>([]);
  const [postAdded, setPostAdded] = useState(0);

  //Callback to refetch posts after new is added.
  const refetch = () => {
    setPostAdded((prev) => prev + 1);
  };

  const newLikeAdded = (like:number):number => {
    return like
  }

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
    if (!response.ok) {
      dispatch(uiActions.endLoading());
      dispatch(uiActions.setError("Getting posts failed"));
      return;
    }
  };
  //fetch posts on first render
  useEffect(() => {
    getUsersPosts().catch(() => {
      dispatch(uiActions.setError("Failed to fetch posts"));
    });
  }, [postAdded, likeChanged]);

  return (
    <>
      <h1> Wall</h1>
      <ProfileNav />
      {ui.error.errorStatus && <div>{ui.error.errorInfo}</div>}
      <button
        onClick={() => {
          dispatch(modalActions.showPostModal());
        }}
      >
        Add new post
      </button>
      {modal.showPost && <AddPost onAddedPost={refetch} />}
      <WallNav />
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <div key={post._id}>
              <PostCard post={post} newLikeAdded={newLikeAdded}/>
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
