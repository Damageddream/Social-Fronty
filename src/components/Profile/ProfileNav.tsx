import { useSelector } from "react-redux";
import { UserReduxI } from "../../interfaces/userI";
import EditProfile from "./EditProfile";
import Logout from "../LoginAndRegister/Logout";
import ProfileOptions from "./ProfileOptions";
import { RootState } from "../../store/store";
import "../../assets/styles/wall.css";

const ProfileNav = () => {
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const modal = useSelector((state: RootState) => state.modal);
  return (
    <div className="user">
      {user.loggedIn && (
        <>
          <div className="userinfo">
            <img
              className="profilePhoto"
              src={user.photo}
              alt="user profile picture"
            />
            <div>{user.name}</div>
          </div>
          <div className="logandoptions">
            <Logout />
            <ProfileOptions userId={user._id} />
            {modal.showUser && (
              <EditProfile orginalName={user.name} userId={user._id} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileNav;
