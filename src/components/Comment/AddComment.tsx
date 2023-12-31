import { useDispatch, useSelector } from "react-redux";
import useToggle from "../../customHooks/useToggle";
import { RootState } from "../../store/store";
import { uiActions } from "../../store/uiSlice";
import { FormEventHandler, useState } from "react";
import { CommentI } from "../../interfaces/commentI";
import { serverUrl } from "../../utilities/URLs";
import { motion } from "framer-motion";
import { formMount, buttonMount } from "../../utilities/animation";

const AddComment: React.FC<{
  postID: string;
  handleAddComment: () => void;
}> = ({ postID, handleAddComment }) => {
  // custom hook that toggle on/off showing form for adding comments
  const [showAddComment, toggleShowAddComment]: [
    boolean,
    (value?: boolean) => void
  ] = useToggle(false);
  const ui = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  dispatch(uiActions.removeError())
  const [text, setText] = useState<string>("");
  const addComment = async () => {
    const token = localStorage.getItem("token");
    const formData: CommentI = {
      text,
      post: postID,
      likes: [],
    };
    const response = await fetch(serverUrl + `/posts/${postID}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`,
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      dispatch(uiActions.setError("Adding new comment failed"));
    } else {
      handleAddComment();
      toggleShowAddComment(false);
    }
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    try {
      addComment().catch(() => {
        dispatch(uiActions.setError("Adding new comment failed"));
      });
    } catch (err) {
      dispatch(uiActions.setError("Adding new post failed"));
    }
  };

  return (
    <motion.div layout>
      {!showAddComment && (
        <motion.button {...buttonMount} onClick={() => toggleShowAddComment()}>
          Add comment
        </motion.button>
      )}
      {showAddComment && (
        <>
          <motion.form
            {...formMount}
            className="addcomment"
            onSubmit={submitHandler}
          >
            <div
              role="button"
              className="cancelcomment"
              onClick={() => toggleShowAddComment(false)}
            >
              X
            </div>
            <label htmlFor="text">Comment:</label>
            <input
              type="text"
              id="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            {ui.error.errorStatus && <div className="warning">{ui.error.errorInfo}asd</div>}
            <button className="subbmitcomment" type="submit">
            {ui.loading ? <div className="lds-dual-ring"></div> : "Submit comment"}
            </button>
          </motion.form>
          
        </>
      )}  
    </motion.div>
  );
};

export default AddComment;
