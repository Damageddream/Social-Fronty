import { serverUrl } from "./utilities/URLs";

const LogIn: React.FC = () => {
  const facebook = () => {
    window.open(serverUrl + "/login/facebook", "_self");
  };

  return (
    <div>
      <button onClick={facebook}>Login with facebook</button>
    </div>
  );
};

export default LogIn;
