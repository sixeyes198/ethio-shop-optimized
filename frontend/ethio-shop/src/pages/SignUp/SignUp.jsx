import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import img5 from "../../assets/images/img5.jpg";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter Your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //SignUp API call
    try {
      const response = await axiosInstance.post("/Signup", {
        fullName: fullName,
        email: email,
        password: password,
      });

      console.log("Server response", response.data);

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative h-screen w-full">
        <img
          src={img5}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />

        {/* Sign Up Form */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 border rounded-lg bg-white px-7 py-10 shadow-lg">
            <form onSubmit={handleSignUp}>
              <h4 className="text-2xl mb-7 text-center">Sign Up</h4>

              <input
                type="text"
                placeholder="Name"
                className="input-box"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

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
                Create Account
              </button>

              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary underline hover:text-amber-700"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
