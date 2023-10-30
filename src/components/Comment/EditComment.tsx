import { useState, FormEventHandler } from "react";
import { CommentI } from "../../interfaces/commentI";
import { serverUrl } from "../../utilities/URLs";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import { RootState } from "../../store/store";
import { editActions } from "../../store/editSlice";

const EditComment: React.FC<{
  commentId: string;
  orginalText: string;
  postId: string;
  likes: string[];
  toggleShowEditComment: (value: boolean) => void;
}> = ({ commentId, orginalText, postId, likes, toggleShowEditComment }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>(orginalText);
  const ui = useSelector((state: RootState) => state.ui);

  dispatch(uiActions.removeError())

  const editComment = async () => {
    dispatch(uiActions.removeError());
    dispatch(uiActions.startLoading());
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
      dispatch(uiActions.endLoading());
      dispatch(editActions.editComment());
      toggleShowEditComment(false);
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
      <form className="editComment" onSubmit={submitHandler}>
        <div className="editCommentHeader">
          <label htmlFor="text">Comment:</label>
          <div
            role="button"
            className="exitbutton exitedit"
            onClick={() => toggleShowEditComment(false)}
          >
            X
          </div>
        </div>
        <input
          type="text"
          id="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        {ui.error.errorStatus && (
          <div className="warning">{ui.error.errorInfo}</div>
        )}
        <button className="editCommenButton" type="submit">
          {ui.loading ? <div className="lds-dual-ring"></div> : "Edit Comment"}
        </button>
      </form>
    </>
  );
};

export default EditComment;
