import { serverUrl } from "./utilities/URLs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { uiActions } from "./store/uiSlice";
import UserI, { NoFriendsI } from "./interfaces/userI";
const AddNewFriend: React.FC = () => {
  const token = localStorage.getItem("token");
  const distpatch = useDispatch();
  const ui = useSelector((state: RootState) => state.ui);
  const [strangers, setStrangers] = useState<UserI[]>();

  // getting list of users that are not friends with user sending request
  const fetchStrangers = async () => {
    try {
      const response = await fetch(serverUrl + "/users/nofriends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      });
      //console.log(await response.json());
      const data = (await response.json()) as NoFriendsI;
      setStrangers(data.noFriends);
    } catch (err) {
      distpatch(uiActions.setError("Failed to get list of strangers"));
    }
  };

  const inviteHandler = async(id: string) => {
    try {
        const response = await fetch(serverUrl + "/users/nofriends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token as string}`,
              },
            body: JSON.stringify(id)
        })
        if(!response.ok) {
            uiActions.setError("Failed to send invite")
        }
    } catch(err){
        distpatch(uiActions.setError("Failed to send invite"))
    }
  };



  useEffect(() => {
    fetchStrangers().catch((err) => {
      distpatch(uiActions.setError("Failed to get list of strangers"));
    });
  }, []);

  return (
    <div>
      {strangers?.map((stranger) => {
        return (
          <div key={stranger._id}>
            <img src={stranger.photo} alt="profile picture" />
            <div>{stranger.name}</div>
            <button onClick={()=>inviteHandler(stranger._id)}>Invite to friends</button>
          </div>
        );
      })}
    </div>
  );
};

export default AddNewFriend;
