import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { serverUrl } from "../utilities/URLs";

const Test: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const test = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(serverUrl + "/users/nofriends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      });
      console.log(await response.json())
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={test}>Check user</button>;
};

export default Test;
