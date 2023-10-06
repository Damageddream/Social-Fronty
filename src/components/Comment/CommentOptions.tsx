import { useState, RefObject, useEffect, FormEventHandler } from "react";
import useOutsideClick from "../../customHooks/useOutsideClick";
import { UserReduxI } from "../../interfaces/userI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { serverUrl } from "../../utilities/URLs";
import useToggle from "../../customHooks/useToggle";
import { CommentI } from "../../interfaces/commentI";
import { uiActions } from "../../store/uiSlice";
import options from "../../assets/images/options.svg";

const CommentOptions: React.FC<{
  authorId: string;
  commentId: string;
  orginalText: string;
  postId: string;
  likes: string[];
}> = ({ authorId, commentId, orginalText, postId, likes }) => {
  const dispatch = useDispatch();
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);

  const [showOptions, setShowOptions] = useState(false);
  const [userIsAuthor, setUserIsAuthor] = useState(false);
  const [text, setText] = useState<string>(orginalText);
  const [showAddComment, toggleShowAddComment]: [
    boolean,
    (value?: boolean) => void
  ] = useToggle(false);

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

  const editComment = async () => {
    const token = localStorage.getItem("token");
    const formData: CommentI = {
      text,
      post: postId,
      likes,
    };
    const response = await fetch(serverUrl + `/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`,
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      dispatch(uiActions.setError("Adding new comment failed"));
    } else {
      console.log("sucess");
      console.log(response.json());
      toggleShowAddComment(false);
    }
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    try {
      editComment().catch((err) => {
        dispatch(uiActions.setError("Adding new comment failed"));
      });
    } catch (err) {
      dispatch(uiActions.setError("Adding new post failed"));
    }
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
              <div onClick={() => toggleShowAddComment()}>Edit</div>
              <section className="line"></section>
              <div onClick={handleDeleteClick}>Delete</div>
            </div>
          )}
          {showAddComment && (
            <>
              <form onSubmit={submitHandler}>
                <label htmlFor="text">Comment:</label>
                <input
                  type="text"
                  id="text"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
                <button type="submit">Submit Comment</button>
              </form>
              <button onClick={() => toggleShowAddComment(false)}>
                cancel
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CommentOptions;
