import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { modalActions } from "../store/modalSlice";
import { PostI } from "../interfaces/postI";
import { uiActions } from "../store/uiSlice";
import { serverUrl } from "../utilities/URLs";

const AddPost: React.FC = () => {
  // states from redux
  const modal = useSelector((state: RootState) => state.modal);
  const user = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();
  // reference to dialog element
  const dialogRef = useRef<HTMLDialogElement>(null);

  //states to fill Post form
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  // function for sending POST request, to create new post
  const addPost = async () => {
    const token = localStorage.getItem("token")
    const formData: PostI = {
      title,
      text,
      timestamp: new Date(),
      likes: [],
      author: user.id as string,
    };
    const response = await fetch(serverUrl + "/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      dispatch(uiActions.setError("Adding new post failed"));
    } else {
      console.log("sucess");
      console.log(response.json())
    }
  };

  // showing or hinding modal when redux modal state changes
  useEffect(() => {
    if (modal.show) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [modal.show]);

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();

    try {
      addPost().catch((err) => {
        dispatch(uiActions.setError("Adding new post failed"));
      });
    } catch (err) {
      dispatch(uiActions.setError("Adding new post failed"));
    }
  };

  return (
    <dialog ref={dialogRef}>
      <form onSubmit={submitHandler}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="postText">Text:</label>
        <input
          type="text"
          id="postText"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Post</button>
      </form>
      <button
        onClick={() => {
          dispatch(modalActions.hideModal());
        }}
      >
        Close modal
      </button>
    </dialog>
  );
};

export default AddPost;
