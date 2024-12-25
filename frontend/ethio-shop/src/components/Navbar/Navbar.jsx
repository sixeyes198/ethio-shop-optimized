import React from "react";
import ProfileInfo from "../Profile/ProfileInfo";
import { useNavigate } from "react-router-dom";


const Navbar = ({userInfo}) => {

  const navigate = useNavigate();
  
  const onLogout = ()=>{
    localStorage.clear();
    navigate("/login")
  }

  return (
    <div className="bg-amber-300 flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Ethio</h2>
      {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
    </div>
  );
};

export default Navbar;
