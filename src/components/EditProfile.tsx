import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { modalActions } from "../store/modalSlice";
import { uiActions } from "../store/uiSlice";
import { serverUrl } from "../utilities/URLs";
import { EditUserI } from "../interfaces/userI";

const EditProfile: React.FC<{orginalName: string, userId:string }> = ({orginalName, userId}) => {
  // states from redux
  const modal = useSelector((state: RootState) => state.modal);
  const user = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();
  // reference to dialog element
  const dialogRef = useRef<HTMLDialogElement>(null);

  //states to fill Post form
  const [name, setName] = useState<string>(orginalName);
  const [file, setFile] = useState<File | null>();

  // function for sending POST request, to create new post
  const editProfile = async () => {
    const token = localStorage.getItem("token")
    const formData = new FormData()
    formData.append("name", name)
    if(file) {
        formData.append("file", file )
    }
    const response = await fetch(serverUrl + `/user/edit/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token as string}`
      },
      body: formData,
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
    if (modal.showUser) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [modal.showUser]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? e.target.files[0] : null;
    setFile(selected);
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();

    
        editProfile().catch((err) => {
        dispatch(uiActions.setError("Editig profile failed"));
      });
 
    }

  return (
    <dialog ref={dialogRef}>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
          <label htmlFor="photo">Photo</label>
        <input type="file" id="photo" onChange={handleFileChange} />
        <button type="submit">Edit Profile</button>
      </form>
      <button
        onClick={() => {
          dispatch(modalActions.hideUserModal());
        }}
      >
        Close modal
      </button>
    </dialog>
  );
};

export default EditProfile;