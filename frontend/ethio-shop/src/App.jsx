import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import SignUp from "./pages/SignUp/SignUp";
import Cart from "./pages/Cart/Cart";
import Admin from "./pages/Admin/Admin";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element= {<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
