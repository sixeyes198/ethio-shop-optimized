import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import PasswordInput from "../../components/Input/PasswordInput";
import img5 from "../../assets/images/img5.jpg"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a vaild email adress");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //Login API Call
  };

  return (
    <>
      <Navbar />
    {/* Background Image with Dark Overlay */}
    <div className="relative h-screen w-full">
        <img
          src={img5}
          alt="women working in field"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        
        {/* Login Form */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 border rounded-lg bg-white px-7 py-10 shadow-lg">
            <form onSubmit={handleLogin}>
              <h4 className="text-2xl mb-7 text-center">Login</h4>
              <input
                type="text"
                placeholder="Email"
                className="input-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

              <button type="submit" className="btn-primary w-full">
                Login
              </button>
              <p className="text-xs text-center mt-4">
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary underline hover:text-amber-700"
                >
                  Create an Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;