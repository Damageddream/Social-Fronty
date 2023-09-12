import { RootState } from "../store/store";
import { serverUrl } from "../utilities/URLs";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";

interface likeArgs {
  componentType: "post" | "comment";
  id: string;
}

export default function useLike(): [(args: likeArgs) => void] {
  const ui = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const like = async (args: likeArgs) => {
    if (args.componentType === "post") {
      const token = localStorage.getItem("token");

      const response = await fetch(serverUrl + `/posts/${args.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      });
      if (!response.ok) {
        dispatch(uiActions.setError("Liking post failed"));
      } else {
        console.log(response.json());
      }
    } else if (args.componentType === "comment") {
      const token = localStorage.getItem("token");

      const response = await fetch(serverUrl + `/comments/${args.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      });
      if (!response.ok) {
        dispatch(uiActions.setError("Liking comment failed"));
      } else {
        console.log(response.json());
      }
    }
  };

  return [like];
}
