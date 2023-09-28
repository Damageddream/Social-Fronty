import { useNavigate } from "react-router-dom";

const WallNav = () => {
  const navigate = useNavigate();
  return (
    <div className="wallNav">
      <nav onClick={() => navigate("/invite")}>Search for friend</nav>
      <nav onClick={() => navigate("/invites")}>Add new friends</nav>
      <nav onClick={() => navigate("/friends")}>Your friends</nav>
    </div>
  );
};

export default WallNav;
