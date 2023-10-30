import { useState, RefObject, useEffect } from "react";
import useOutsideClick from "../../customHooks/useOutsideClick";
import { UserReduxI } from "../../interfaces/userI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { serverUrl } from "../../utilities/URLs";
import { modalActions } from "../../store/modalSlice";
import EditPost from "./EditPost";
import options from "../../assets/images/options.svg";
import { uiActions } from "../../store/uiSlice";
import { deleteActions } from "../../store/deleteSlice";
import { useNavigate } from "react-router-dom";

const PostOptions: React.FC<{
  authorId: string;
  postId: string;
  orginalText: string;
  likes: string[];
  comments: string[];
}> = ({ authorId, postId, orginalText, likes, comments}) => {
  const user: UserReduxI = useSelector((state: RootState) => state.user);

  const navigate = useNavigate()

  const [showOptions, setShowOptions] = useState(false);
  const [userIsAuthor, setUserIsAuthor] = useState(false);
  const [loading, setLoading] = useState(false);

  const ui = useSelector((state:RootState) => state.ui)

  const dispatch = useDispatch();
  dispatch(uiActions.removeError())
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
    setLoading(true);
    try {
      const response = await fetch(serverUrl + `/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      });
      if (!response.ok) {
        setLoading(false);
        dispatch(uiActions.setError("deleting post failed"));
      }
      if (response.ok) {
        setLoading(false);
        dispatch(deleteActions.deletePost());
        navigate("/")
      }
    } catch (err) {
      dispatch(uiActions.setError("deleting post failed"));
    }
  };

  const handleDeleteClick = () => {
    handleDelete().catch(() => {
      dispatch(uiActions.setError("deleting post failed"));
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
                <div onClick={handleDeleteClick}>
                  {loading ? (
                    <div className="lds-dual-ring-white"></div>
                  ) : (
                    "Delete"
                  )}
                </div>
                {ui.error.errorStatus && <div className="warning">{ui.error.errorInfo}</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostOptions;
