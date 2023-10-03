import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./LoginPage";
import Wall from "./Wall";
import LoginWithFacebook from "./components/LoginAndRegister/LogInWithFacebook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/wall" element={<Wall />} />
        <Route path="/loginFacebook" element={<LoginWithFacebook />} />
      </Routes>
    </Router>
  );
}

export default App;
