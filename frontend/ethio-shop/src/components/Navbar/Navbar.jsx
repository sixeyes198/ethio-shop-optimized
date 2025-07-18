import ProfileInfo from "../Profile/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Navbar = ({ userInfo }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
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
        <h2 className="text-xl font-medium text-black py-2 ml-4">Ethio</h2>
        {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
      </div>

      {/*Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 bottom-0 z-50 w-96 bg-yellow-200 bg-opacity-95 flex flex-col items-center">
          <div
            className="hidden max-lg:block cursor-pointer fixed left-0 px-8 py-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <AiOutlineClose className="text-sm hover:text-amber-600" />
          </div>
          {/* Add NavBar Links Here */}
          <a
            href="#home"
            onClick={() => setIsMenuOpen(false)}
            className="block text-xl font-semibold text-black hover:text-amber-600 transition py-2"
          >
            Home
          </a>
          <a
            href="#about-us"
            onClick={() => setIsMenuOpen(false)}
            className="block text-xl font-semibold text-black hover:text-amber-600 transition py-2"
          >
            About
          </a>
          <a
            href="#Shopping-Cart"
            onClick={() => setIsMenuOpen(false)}
            className=" block text-xl font-semibold text-black hover:text-amber-600 transition py-2"
          >
            Shopping Cart
          </a>

          <a
            href="#contact-us"
            onClick={() => setIsMenuOpen(false)}
            className="block text-xl font-semibold text-black hover:text-amber-600 transition py-2"
          >
            Contact
          </a>
          {/* <h2 className="text-xl font-medium text-black py-2">Ethio</h2> */}
          {/* {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />} */}
        </div>
      )}
    </>
  );
};

export default Navbar;
