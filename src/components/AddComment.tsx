import { useDispatch, useSelector } from "react-redux";
import useToggle from "../customHooks/useToggle";
import { RootState } from "../store/store";
import { uiActions } from "../store/uiSlice";
import { FormEventHandler, useState } from "react";
import { CommentI } from "../interfaces/commentI";
import { serverUrl } from "../utilities/URLs";

const AddComment: React.FC<{ postID: string }> = ({ postID }) => {
  // custom hook that toggle on/off showing form for adding comments
  const [showAddComment, toggleShowAddComment]: [boolean, (value?: boolean) => void] = useToggle(false);

  const user = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();

  const [text, setText] = useState<string>("");

  const addComment = async () => {
    const token = localStorage.getItem('token')
    const formData: CommentI = {
        text,
        post: postID,
        likes: [],
    }
    const response = await fetch(serverUrl + `/posts/${postID}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`
      },
      body: JSON.stringify(formData)
    })
    if (!response.ok) {
      dispatch(uiActions.setError("Adding new comment failed"));
    } else {
      console.log("sucess");
      console.log(response.json())
      toggleShowAddComment(false)
    }
  }

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    try {
      addComment().catch((err) => {
        dispatch(uiActions.setError("Adding new comment failed"))
      });
    } catch (err) {
      dispatch(uiActions.setError("Adding new post failed"))
    }
  }

  return (
    <>
    {!showAddComment && <button onClick={()=>toggleShowAddComment()}>Add comment</button>}
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
          <button onClick={()=>toggleShowAddComment(false)}>cancel</button>
        </>
      )}
    </>
  );
};

export default AddComment;
