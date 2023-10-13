import { useState, RefObject, useEffect } from "react";
import useOutsideClick from "../../customHooks/useOutsideClick";
import { UserReduxI } from "../../interfaces/userI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { serverUrl } from "../../utilities/URLs";
import { uiActions } from "../../store/uiSlice";
import options from "../../assets/images/options.svg";
import "../../assets/styles/comment.css";

const CommentOptions: React.FC<{
  authorId: string;
  commentId: string;
  toggleShowEditComment: (value:boolean)=>void;
}> = ({ authorId, commentId, toggleShowEditComment }) => {
  const dispatch = useDispatch();
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);

  const [showOptions, setShowOptions] = useState(false);
  const [userIsAuthor, setUserIsAuthor] = useState(false);

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
      const response = await fetch(serverUrl + `/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      });
      if (!response.ok) {
        console.error("deleting comment failed");
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
        <div className="commentoptionscontainer">
          <img
            className="options"
            src={options}
            alt="three dots"
            onClick={toggleOptions}
          />
          {showOptions && (
            <div ref={ref} className="commentoptions">
              <div onClick={() => toggleShowEditComment(true)}>Edit</div>
              <section className="line"></section>
              <div onClick={handleDeleteClick}>Delete</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CommentOptions;
