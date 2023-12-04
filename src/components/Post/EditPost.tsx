import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { modalActions } from "../../store/modalSlice";
import { uiActions } from "../../store/uiSlice";
import { serverUrl } from "../../utilities/URLs";
import { editActions } from "../../store/editSlice";

const EditPost: React.FC<{
  orginalText: string;
  postId: string;
  likes: string[];
  comments: string[];
}> = ({ orginalText, postId, likes, comments }) => {
  // states from redux
  const modal = useSelector((state: RootState) => state.modal);
  const ui = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();
  // reference to dialog element
  const dialogRef = useRef<HTMLDialogElement>(null);

  dispatch(uiActions.removeError())

  //states to fill Post form
  const [text, setText] = useState<string>(orginalText);
  const [file, setFile] = useState<File | null>();

  // function for sending POST request, to create new post
  const addPost = async () => {
    dispatch(uiActions.removeError());
    dispatch(uiActions.startLoading());
    const token = localStorage.getItem("token");
    const formData = new FormData()
    formData.append('text', text)
    if (file){
      formData.append('file',file)
    }
    
    const response = await fetch(serverUrl + `/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token as string}`,
      },
      body: formData,
    });
    if (!response.ok) {
      dispatch(uiActions.endLoading());
      dispatch(uiActions.setError("Adding new post failed"));
    } else {
      dispatch(uiActions.endLoading());
      dispatch(editActions.editPost());
      dispatch(modalActions.hidePostModal());
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(uiActions.removeError());
    const selected = e.target.files ? e.target.files[0] : null;
    //validate
    if (selected) {
      const fileExtension = selected.name.split(".").pop()?.toLocaleLowerCase();
      const validExtensiosn = ["jpg", "jpeg", "png", "gif"];
      if (fileExtension && validExtensiosn.includes(fileExtension)) {
        setFile(selected);
      } else {
        dispatch(
          uiActions.setError("only: jpg, jpeg, png, gif file types accepted")
        );
        e.target.value = "";
      }
    }
  };

  // showing or hinding modal when redux modal state changes
  useEffect(() => {
    if (modal.showPost) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [modal.showPost, comments]);

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
    <dialog className="editPostContainer" ref={dialogRef}>
      <div
        role="button"
        className="exitbutton"
        onClick={() => {
          dispatch(modalActions.hidePostModal());
        }}
      >
        X
      </div>
      <form className="editPost" onSubmit={submitHandler}>
        <label className="labelphoto" htmlFor="photo">
          Add image
        </label>
        <input type="file" id="photo" onChange={handleFileChange} />
        <label htmlFor="postText">Text:</label>
        <textarea
          id="postText"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {ui.error.errorStatus && (
          <div className="warning">{ui.error.errorInfo}</div>
        )}
        <button className="addPostBtn" type="submit">
          {ui.loading ? <div className="lds-dual-ring"></div> : "Edit Post"}
        </button>
      </form>
    </dialog>
  );
};

export default EditPost;
