import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
