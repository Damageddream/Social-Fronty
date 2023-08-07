import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./LoginPage";
import Wall from "./Wall";
import AddNewFriend from "./AddNewFriend";
import Invites from "./Invites";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/invites" element={<Invites />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/wall" element={<Wall />} />
        <Route path="/invite" element={<AddNewFriend />} />
      </Routes>
    </Router>
  );
}

export default App;
