import { useNavigate } from "react-router-dom";

const WallNav = () => {
  const navigate = useNavigate();
  return (
    <div className="wallNav">
      <button onClick={() => navigate("/invite")}>Search for friend</button>
      <button onClick={() => navigate("/invites")}>Add new friends</button>
      <button onClick={() => navigate("/friends")}>Your friends</button>
    </div>
  );
};

export default WallNav;
