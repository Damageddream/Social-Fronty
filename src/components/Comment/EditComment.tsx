import { useState, FormEventHandler } from "react";
import { CommentI } from "../../interfaces/commentI";
import { serverUrl } from "../../utilities/URLs";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";

const EditComment: React.FC<{
  commentId: string;
  orginalText: string;
  postId: string;
  likes: string[];
  toggleShowEditComment: (value: boolean) => void;
}> = ({ commentId, orginalText, postId, likes, toggleShowEditComment }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>(orginalText);

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
        <button className="editCommenButton" type="submit">Edit Comment</button>
      </form>
    </>
  );
};

export default EditComment;
