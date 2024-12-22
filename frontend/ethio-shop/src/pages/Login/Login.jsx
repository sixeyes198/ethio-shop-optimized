import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import {validateEmail} from "../../utils/helper"
import PasswordInput from "../../components/Input/PasswordInput";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a vaild email adress");
    }
    
    if(!password){
      setError("Please enter the password");
    }

    setError("");


    //Login API Call

  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-xs text-center mt-4">
              Not registered?{" "}
              <Link
                to="/singup"
                className="font-medium text-primary underline"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
