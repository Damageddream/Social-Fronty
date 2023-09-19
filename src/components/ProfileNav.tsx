import { useSelector } from "react-redux";
import { UserReduxI } from "../interfaces/userI";
import EditProfile from "./EditProfile";
import Logout from "./Logout";
import ProfileOptions from "./ProfileOptions";
import { RootState } from "../store/store";

const ProfileNav = () => {
  const user: UserReduxI = useSelector((state: RootState) => state.user);
  const modal = useSelector((state: RootState) => state.modal);
  return (
    <>
      {user.loggedIn && (
        <>
          <div>
            {user.name}
            <img src={user.photo} alt="user profile picture" />
          </div>
          <Logout />
          <ProfileOptions userId={user._id} />
          {modal.showUser && (
            <EditProfile orginalName={user.name} userId={user._id} />
          )}
        </>
      )}
    </>
  );
};

export default ProfileNav;
