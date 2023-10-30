import { useState, RefObject, useEffect } from "react";
import useOutsideClick from "../../customHooks/useOutsideClick";
import { UserReduxI } from "../../interfaces/userI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { serverUrl } from "../../utilities/URLs";
import { uiActions } from "../../store/uiSlice";
import options from "../../assets/images/options.svg";
import "../../assets/styles/comment.css";
import { deleteActions } from "../../store/deleteSlice";

const CommentOptions: React.FC<{
  authorId: string;
  commentId: string;
  toggleShowEditComment: (value: boolean) => void;
}> = ({ authorId, commentId, toggleShowEditComment }) => {
  const dispatch = useDispatch();
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const [showOptions, setShowOptions] = useState(false);
  const [userIsAuthor, setUserIsAuthor] = useState(false);
  const [loading, setLoading] = useState(false);

  dispatch(uiActions.removeError())

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
    setLoading(true);
    try {
      const response = await fetch(serverUrl + `/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      });
      if (!response.ok) {
        dispatch(uiActions.setError("deleting comment failed"));
        setLoading(false);
      }
      if (response.ok) {
        dispatch(deleteActions.deleteComment());
        setLoading(false);
        setShowOptions(false);
      }
    } catch (err) {
      dispatch(uiActions.setError("deleting comment failed"));
    }
  };

  const handleDeleteClick = () => {
    handleDelete().catch(() => {
      dispatch(uiActions.setError("deleting comment failed"));
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
              <div onClick={handleDeleteClick}>
                {loading ? <div className="lds-dual-ring-white"></div> : "Delete"}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CommentOptions;
