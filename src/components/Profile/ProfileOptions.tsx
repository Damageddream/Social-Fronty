import { useState, RefObject } from "react";
import useOutsideClick from "../../customHooks/useOutsideClick";
import { UserReduxI } from "../../interfaces/userI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { serverUrl } from "../../utilities/URLs";
import { uiActions } from "../../store/uiSlice";
import { userActions } from "../../store/userSlice";
import { modalActions } from "../../store/modalSlice";
import { useNavigate } from "react-router-dom";
import settingsSVG from "../../assets/images/settings.svg";
import "../../assets/styles/wall.css";

const ProfileOptions: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const dispatch = useDispatch();
  dispatch(uiActions.removeError())
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const ui = useSelector((state: RootState) => state.ui);
  const navigate = useNavigate();

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
    if (user._id !== userId) {
      dispatch(uiActions.setError("only owner of the account can delete it"));
      return;
    }
    try {
      const response = await fetch(serverUrl + `/user/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      });
      if (!response.ok) {
        dispatch(uiActions.setError("deleting user failed"));
      }
      if (response.ok) {
        dispatch(userActions.logOut());
        localStorage.removeItem('token')
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = () => {
    handleDelete().catch(() => {
      dispatch(uiActions.setError('deleting profile failed'))
    });
  };

  return (
    <>
      <img
        className="settings"
        src={settingsSVG}
        alt="icon of gearwheel"
        onClick={toggleOptions}
      />
      {showOptions && (
        <div ref={ref} className="profileoptions">
          <div onClick={() => dispatch(modalActions.showUserModal())}>Edit</div>
          <section className="line"></section>
          <div onClick={handleDeleteClick}>Delete</div>
          {ui.error.errorStatus && <div className="warning">{ui.error.errorInfo}</div>}
        </div>
      )}
    </>
  );
};

export default ProfileOptions;
