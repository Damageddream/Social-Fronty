import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import UserI from "../../interfaces/userI";
import { uiActions } from "../../store/uiSlice";

const AddNewSingle: React.FC<{
  stranger: UserI;
  submitHandler: (e: React.FormEvent) => void;
  loading: boolean;
}> = ({ stranger, submitHandler, loading }) => {
  const ui = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch()
  dispatch(uiActions.removeError())
  return (
    <div className="friend" key={stranger._id}>
      <img src={stranger.photo} alt="profile picture" />
      <div>{stranger.name}</div>
      <form onSubmit={submitHandler}>
        <input type="hidden" name="id" value={stranger._id} data-testid="hidden-input"  />
        <button className="invitebtn" type="submit">
          {loading ? (
            <div className="lds-dual-ring"></div>
          ) : (
            "Invite to friends"
          )}
        </button>
      </form>
      {ui.error.errorStatus && <div>{ui.error.errorInfo}</div>}
    </div>
  );
};

export default AddNewSingle;
