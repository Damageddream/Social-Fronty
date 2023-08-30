import { useDispatch, useSelector } from "react-redux";
import useToggle from "../customHooks/useToggle";
import { RootState } from "../store/store";
import { uiActions } from "../store/uiSlice";
import { FormEventHandler, useState } from "react";
import { CommentI } from "../interfaces/commentI";

const AddComment: React.FC<{ postID: string }> = ({ postID }) => {
  // custom hook that toggle on/off showing form for adding comments
  const [showAddComment, toggleShowAddComment] = useToggle(false);

  const user = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();

  const [text, setText] = useState<string>("");

  const addComment = async () => {
    const token = localStorage.getItem('token')
    const formData: CommentI = {
        text,
        timestamp: new Date(),
        likes: [],
        post: postID,
        
    }
  }

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();

  }

  return (
    <>
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
            <button>Add Comment</button>
          </form>
          <button>cancel</button>
        </>
      )}
    </>
  );
};

export default AddComment;
