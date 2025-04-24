import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import img5 from "../../assets/images/img5.jpg";
import logo from "../../assets/images/logo.png";
import { VscCheck } from "react-icons/vsc";
import Contact from "../Contact/Contact";
import Cart from "../Cart/Cart";

const Home = () => {
  return (
    <>
      <Navbar />
      {/* Hero */}
      <section id="home">
        <div className="relative w-full h-screen ">
          <img
            src={img5}
            alt="women working in field"
            className="object-cover h-full w-fit"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center  bg-black/50">
            <h1 className="text-4xl md:text-5xl font-semibold  text-white text-center px-4">
              EthioFlavors
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-Poppins text-white text-center px-4 mt-2">
              Experience Authentic Ethiopian Imports Delivered to Your Doorstep
            </p>
          </div>
        </div>
      </section>
      {/* CART */}
      <Cart/>

      {/* About */}
      <section id="about-us" className="mt-48  ">
        <div className="bg-white py-12 mb-10  ">
          <div className="container mx-auto">
            {/* About section */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              {/* Left side: Image or logo */}
              <div className="text-center md:text-left">
                <img
                  src={logo}
                  alt="Company Logo"
                  className="h-4/6 md:w-full mx-auto md:mx-0"
                />
              </div>

              {/* Right side: Text content */}
              <div className="p-4 md:p-8">
                {/* Subheading */}
                <p className="text-xl md:text-2xl lg:text-3xl text-primary font-semibold">
                  Who We Are
                </p>
                {/* Heading */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mt-4 mb-8">
                  About EthioFlavors
                </h2>
                {/* Text */}
                <p className="mt-4 text-lg text-gray-700 mb-8">
                  EthioFlavors is committed to providing authentic Ethiopian
                  imports directly to your doorstep. Our products include the
                  finest grains, coffees, and liqueurs, sourced directly from
                  the heart of Ethiopia.
                </p>
                {/* List with V icons */}
                <ul className="mt-4 space-y-3">
                  <li className="flex items-center text-lg">
                    <VscCheck className="text-green-500 mr-2" />
                    <span className="text-primary">High-quality products</span>
                  </li>
                  <li className="flex items-center text-lg">
                    <VscCheck className="text-green-500 mr-2" />
                    <span className="text-primary">
                      Direct imports from Ethiopia
                    </span>
                  </li>
                  <li className="flex items-center text-lg">
                    <VscCheck className="text-green-500 mr-2" />
                    <span className="text-primary">
                      Environmentally friendly practices
                    </span>
                  </li>
                  <li className="flex items-center text-lg">
                    <VscCheck className="text-green-500 mr-2" />
                    <span className="text-primary">
                      Exceptional customer service
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
};

export default Home;
