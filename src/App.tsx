import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./LoginPage";
import Wall from "./Wall";
import AddNewFriend from "./components/Wall/AddNewFriend";
import Invites from "./components/Wall/Invites";
import Register from "./components/LoginAndRegister/RegisterUser";
import LogInNoFacebook from "./components/LoginAndRegister/Login";
import LoginWithFacebook from "./components/LoginAndRegister/LogInWithFacebook";
import MyFriends from "./components/Wall/MyFriends";
import Post from "./components/Post/Post";

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
        <Route path="/loginFacebook" element={<LoginWithFacebook />} />
        <Route path="/friends" element={<MyFriends />} />
        <Route path="/posts/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
