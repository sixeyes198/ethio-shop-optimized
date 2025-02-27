import React from "react";
import ProfileInfo from "../Profile/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Navbar = ({ userInfo }) => {
  const navigate = useNavigate();

  //Logout takes you to the login screen **Change it to home afterwards
  const onLogout = () => {
    localStorage.clear();
    navigate("/dashboard");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="bg-amber-300 flex items-center justify-between px-6 py-2 ">
        <div
          className="hidden max-lg:block cursor-pointer"
          onClick={toggleMenu}
        >
          <RxHamburgerMenu className="text-sm" />
        </div>
        <h2 className="text-xl font-medium text-black py-2 ml-auto">Ethio</h2>
        {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
      </div>

      {/*Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 bottom-0 z-50 w-60 bg-yellow-200 bg-opacity-95">
          <div
            className="hidden max-lg:block cursor-pointer fixed left-0 px-8 py-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <AiOutlineClose className="text-sm" />
          </div>
          {/* Add NavBar Links Here */}
          {/* <h2 className="text-xl font-medium text-black py-2">Ethio</h2> */}

          {/* Maybe change the location of the User Profile Info */}

          {/* {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />} */}
        </div>
      )}
    </>
  );
};

export default Navbar;
