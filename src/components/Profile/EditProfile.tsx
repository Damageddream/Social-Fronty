import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { modalActions } from "../../store/modalSlice";
import { uiActions } from "../../store/uiSlice";
import { serverUrl } from "../../utilities/URLs";
import { useNavigate } from "react-router-dom";
import useLoginAndLogout from "../../customHooks/useLogout";

const EditProfile: React.FC<{ orginalName: string; userId: string }> = ({
  orginalName,
  userId,
}) => {
  // states from redux
  const modal = useSelector((state: RootState) => state.modal);
  const [logout, login] = useLoginAndLogout()

  const navigate = useNavigate()

  const dispatch = useDispatch();
  // reference to dialog element
  const dialogRef = useRef<HTMLDialogElement>(null);

  const ui = useSelector((state:RootState) => state.ui)

  dispatch(uiActions.removeError());

  //states to fill Post form
  const [name, setName] = useState<string>(orginalName);
  const [file, setFile] = useState<File | null>();

  // function for sending POST request, to create new post
  const editProfile = async () => {
    dispatch(uiActions.startLoading())
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", name);
    if (file) {
      formData.append("file", file);
    }
    const response = await fetch(serverUrl + `/user/edit/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token as string}`,
      },
      body: formData,
    });
    if (!response.ok) {
      dispatch(uiActions.setError("Editing profile failed"));
      dispatch(uiActions.endLoading())
      
    }
    if (response.ok) {
      dispatch(modalActions.hideUserModal());
      dispatch(uiActions.endLoading())
      logout()
      navigate('/')
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
    editProfile().catch(() => {
      dispatch(uiActions.setError("Editig profile failed"));
    });
  };

  return (
    <dialog ref={dialogRef}>
      <div
        className="exitbutton "
        role="button"
        onClick={() => {
          dispatch(modalActions.hideUserModal());
        }}
      >
        X
      </div>
      <form className="editProfileForm" onSubmit={submitHandler}>
        <div className="info">You will be logout after editing, login to see changes</div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label className="labelphoto" htmlFor="photo">
          Photo
        </label>
        <input type="file" id="photo" onChange={handleFileChange} />
        <button className="editProfbtn" type="submit">
        {ui.loading ? <div className="lds-dual-ring"></div> : "Edit profile"}
        </button>
      </form>
    </dialog>
  );
};

export default EditProfile;
