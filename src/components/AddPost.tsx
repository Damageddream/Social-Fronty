import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { modalActions } from "../store/modalSlice";
import { PostPostI } from "../interfaces/postI";
import { uiActions } from "../store/uiSlice";
import { serverUrl } from "../utilities/URLs";

const AddPost: React.FC<{onAddedPost:()=>void}> = ({onAddedPost}) => {
  // states from redux
  const modal = useSelector((state: RootState) => state.modal);
  const ui = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();
  // reference to dialog element
  const dialogRef = useRef<HTMLDialogElement>(null);

  //states to fill Post form
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  // function for sending POST request, to create new post
  const addPost = async () => {
    dispatch(uiActions.removeError());
    dispatch(uiActions.startLoading())
    const token = localStorage.getItem("token")
    const formData: PostPostI = {
      title,
      text,
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
      dispatch(uiActions.endLoading())
    } 
    if(response.ok) {
      onAddedPost()
      dispatch(uiActions.endLoading())
      dispatch(modalActions.hidePostModal())
    }
  };

  // showing or hinding modal when redux modal state changes
  useEffect(() => {
    if (modal.showPost) {
      dialogRef.current?.showModal();
    } else {
      dispatch(uiActions.removeError());
      dialogRef.current?.close();
    }
  }, [modal.showPost, dispatch]);

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();

    try {
      addPost().catch(() => {
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
        <button type="submit">{ui.loading? "Loading...": "Add Post"}</button>
      </form>
      <button
        onClick={() => {
          dispatch(modalActions.hidePostModal());
          dispatch(uiActions.removeError());
        }}
      >
        Close modal
      </button>
      {ui.error.errorStatus && <div>{ui.error.errorInfo}</div>}
    </dialog>
  );
};

export default AddPost;
