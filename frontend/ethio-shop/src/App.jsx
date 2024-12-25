import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import SignUp from "./pages/SignUp/SignUp";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
