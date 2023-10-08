import { useState, RefObject, useEffect } from "react";
import useOutsideClick from "../../customHooks/useOutsideClick";
import { UserReduxI } from "../../interfaces/userI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { serverUrl } from "../../utilities/URLs";
import { modalActions } from "../../store/modalSlice";
import EditPost from "./EditPost";
import options from "../../assets/images/options.svg";

const PostOptions: React.FC<{
  authorId: string;
  postId: string;
  orginalText: string;
  likes: string[];
  comments: string[];
}> = ({ authorId, postId, orginalText, likes, comments }) => {
  const user: UserReduxI = useSelector((state: RootState) => state.user);

  const [showOptions, setShowOptions] = useState(false);
  const [userIsAuthor, setUserIsAuthor] = useState(false);

  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);

  const handleClickOutisde = () => {
    setShowOptions(false);
  };

  const ref = useOutsideClick(handleClickOutisde) as RefObject<HTMLDivElement>;

  const toggleOptions = () => {
    setShowOptions(true);
  };

  useEffect(() => {
    user._id, authorId;
    if (user._id === authorId) {
      setUserIsAuthor(true);
    }
  }, [authorId, user._id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(serverUrl + `/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      });
      if (!response.ok) {
        console.error("deleting post failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = () => {
    handleDelete().catch(() => {
      console.error("Failed to delete post");
    });
  };

  return (
    <>
      {userIsAuthor && (
        <div className="postOptionsContainer">
          <div className="imageoptions">
            <img
              className="options"
              src={options}
              alt="three dots"
              onClick={toggleOptions}
            />
          </div>
          {showOptions && (
            <div ref={ref} className="postoptions">
              <div onClick={() => dispatch(modalActions.showPostModal())}>
                Edit
              </div>
              <section className="line"></section>
              {modal.showPost && (
                <EditPost
                  orginalText={orginalText}
                  postId={postId}
                  likes={likes}
                  comments={comments}
                />
              )}
              <div onClick={handleDeleteClick}>Delete</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PostOptions;
