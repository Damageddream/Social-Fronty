import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { modalActions } from "./store/modalSlice";
import AddPost from "./components/Post/AddPost";
import { serverUrl } from "./utilities/URLs";
import { useEffect, useState } from "react";
import { PostI, PostDataFromApi } from "./interfaces/postI";
import useCheckUser from "./customHooks/useCheckUser";
import useLike from "./customHooks/useLike";
import { uiActions } from "./store/uiSlice";
import WallNav from "./components/Wall/WallNav";
import ProfileNav from "./components/Profile/ProfileNav";
import PostCard from "./components/Post/PostCard";
import "../src/assets/styles/wall.css";

const Wall: React.FC = () => {
  // custom hook, checking if user is already logged in
  useCheckUser();

  // custom hook, handling fetching data on liking post or comment
  const [like, likeChanged] = useLike();

  // rerender component with new data after like is added to post in wall view
  const newLikeAdded = (componentType: "post" | "comment", id: string) => {
    like({ componentType, id });
  };
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
      }
    }
    if (!response.ok) {
      dispatch(uiActions.setError("Getting posts failed"));
    }
    dispatch(uiActions.endLoading());
  };
  //fetch posts on first render
  useEffect(() => {
    getUsersPosts().catch(() => {
      dispatch(uiActions.setError("Failed to fetch posts"));
    });
  }, [postAdded, likeChanged]);

  return (
    <div className="wall">
      <div className="profileOptions">
        <ProfileNav />
      </div>
      {ui.error.errorStatus && <div>{ui.error.errorInfo}</div>}
      <div className="mainWall">
        <h1> Your Circle</h1>
        <div className="addpost">
          <button
            onClick={() => {
              dispatch(modalActions.showPostModal());
            }}
          >
            Add new post
          </button>
          {modal.showPost && <AddPost onAddedPost={refetch} />}
        </div>

        <div className="posts">
          {posts.length > 0 ? (
            posts.map((post) => {
              return (
                <div key={post._id}>
                  <PostCard post={post} newLikeAdded={newLikeAdded} />
                </div>
              );
            })
          ) : (
            <div>No Posts</div>
          )}
        </div>
      </div>
      <WallNav />
    </div>
  );
};

export default Wall;
