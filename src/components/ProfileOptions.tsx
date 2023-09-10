import { useState, RefObject, useEffect } from "react";
import useOutsideClick from "../customHooks/useOutsideClick";
import { UserReduxI } from "../interfaces/userI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { serverUrl } from "../utilities/URLs";
import { uiActions } from "../store/uiSlice";
import { modalActions } from "../store/modalSlice";

const ProfileOptions: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const dispatch = useDispatch();
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);

  const [showOptions, setShowOptions] = useState(false);

  const handleClickOutisde = () => {
    setShowOptions(false);
  };

  const ref = useOutsideClick(handleClickOutisde) as RefObject<HTMLDivElement>;

  const toggleOptions = () => {
    setShowOptions(true);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(serverUrl + `/comments/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      });
      if (!response.ok) {
        console.error("deleting comment failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = () => {
    handleDelete().catch(() => {
      console.error("Failed to delete post");
    });
  };

  return (
    <>
      {showOptions ? (
        <div ref={ref}>
          <div onClick={() => dispatch(modalActions.showUserModal())}>Edit</div>
          <div onClick={handleDeleteClick}>Delete</div>
        </div>
      ) : (
        <div onClick={toggleOptions}>Options</div>
      )}
    </>
  );
};

export default ProfileOptions;
