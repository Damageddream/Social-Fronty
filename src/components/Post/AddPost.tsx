import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { modalActions } from "../../store/modalSlice";
import { uiActions } from "../../store/uiSlice";
import { serverUrl } from "../../utilities/URLs";
import '../../assets/styles/addpost.css'

const AddPost: React.FC<{onAddedPost:()=>void}> = ({onAddedPost}) => {
  // states from redux
  const modal = useSelector((state: RootState) => state.modal);
  const ui = useSelector((state: RootState) => state.ui);
  
  const dispatch = useDispatch();
  // reference to dialog element
  const dialogRef = useRef<HTMLDialogElement>(null);
  dispatch(uiActions.removeError())

  //states to fill Post form
  const [text, setText] = useState<string>("");

  const [file, setFile] = useState<File | null>();

  // function for sending POST request, to create new post
  const addPost = async () => {
    dispatch(uiActions.removeError());
    dispatch(uiActions.startLoading())
    const token = localStorage.getItem("token")
    const formData = new FormData()
    formData.append('text', text)
    if (file){
      formData.append('file',file)
    }
    const response = await fetch(serverUrl + "/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token as string}`
      },
      body: formData,
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
      <div className="exitbutton"
        onClick={() => {
          dispatch(modalActions.hidePostModal());
          dispatch(uiActions.removeError());
        }}
      >
        X
      </div>
      <form className="addpostform" onSubmit={submitHandler}>
      <label className="labelphoto" htmlFor="photo">
          Add image
        </label>
        <input type="file" id="photo" onChange={handleFileChange} />
        <label htmlFor="postText">Text:</label>
        <textarea
          id="postText"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={15}
        ></textarea>
        <button className="addpostbtn" type="submit">{ui.loading ? <div className="lds-dual-ring"></div> : "Add post"}</button>
      </form>
      {ui.error.errorStatus && <div className="warning">{ui.error.errorInfo}</div>}
    </dialog>
  );
};

export default AddPost;
