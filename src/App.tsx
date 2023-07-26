import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./LoginPage";
import Wall from "./Wall";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wall />} />
        <Route path="/login" element={<LogIn />} />
  
      </Routes>
    </Router>
  );
}

export default App;
