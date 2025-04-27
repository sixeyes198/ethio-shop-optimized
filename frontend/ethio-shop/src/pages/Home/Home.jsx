import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import img5 from "../../assets/images/img5.jpg";
import logo from "../../assets/images/logo.png";
import { VscCheck } from "react-icons/vsc";
import Contact from "../Contact/Contact";
import Cart from "../Cart/Cart";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <Navbar />
      {/* Hero */}
      <section id="home" className="relative w-full h-screen overflow-hidden">
        {/* Zooming Background Image */}
        <motion.img
          src={img5}
          alt="women working in field"
          className="object-cover h-full w-full"
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Overlay and Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
          {/* Animated Title */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ amount: 0.5, once: true }}
            className="text-4xl md:text-5xl font-semibold text-white text-center px-4"
          >
            EthioFlavors
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ amount: 0.5, once: true }}
            className="text-lg md:text-xl lg:text-2xl font-Poppins text-white text-center px-4 mt-2"
          >
            Experience Authentic Ethiopian Imports Delivered to Your Doorstep
          </motion.p>
        </div>
      </section>

      {/* CART */}
      <Cart />

      {/* About */}
      <section id="about-us" className="mt-48">
        <div className="bg-gray-100 py-16 mb-20 rounded-3xl">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Side: Image with animation */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ amount: 0.5 }}
                className="flex justify-center md:justify-start"
              >
                <img
                  src={logo}
                  alt="EthioFlavors Logo"
                  className="max-w-sm w-full h-auto object-contain"
                />
              </motion.div>

              {/* Right Side: Text Content with animation */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ amount: 0.5 }}
              >
                <p className="text-primary text-3xl uppercase tracking-widest mb-2">
                  Who We Are
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
                  About EthioFlavors
                </h2>
                <p className="text-gray-600 text-base md:text-lg mb-8">
                  At EthioFlavors, we bring you the authentic taste of Ethiopia
                  straight to your doorstep. From premium grains and
                  world-renowned coffees to traditional liqueurs, we pride
                  ourselves on sourcing the finest products while supporting
                  sustainable and ethical practices.
                </p>

                {/* Features List */}
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <VscCheck className="text-green-600 text-2xl mr-3" />
                    <span className="text-gray-700 text-lg">
                      Premium quality, authentic imports
                    </span>
                  </li>
                  <li className="flex items-center">
                    <VscCheck className="text-green-600 text-2xl mr-3" />
                    <span className="text-gray-700 text-lg">
                      Direct partnerships with Ethiopian farmers
                    </span>
                  </li>
                  <li className="flex items-center">
                    <VscCheck className="text-green-600 text-2xl mr-3" />
                    <span className="text-gray-700 text-lg">
                      Eco-friendly and sustainable sourcing
                    </span>
                  </li>
                  <li className="flex items-center">
                    <VscCheck className="text-green-600 text-2xl mr-3" />
                    <span className="text-gray-700 text-lg">
                      Commitment to outstanding customer service
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
};

export default Home;
