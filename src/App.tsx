import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./LoginPage";
import Wall from "./Wall";
import AddNewFriend from "./AddNewFriend";
import Invites from "./Invites";
import Register from "./RegisterUser";
import LogInNoFacebook from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/invites" element={<Invites />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/wall" element={<Wall />} />
        <Route path="/invite" element={<AddNewFriend />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogInNoFacebook />} />
      </Routes>
    </Router>
  );
}

export default App;
