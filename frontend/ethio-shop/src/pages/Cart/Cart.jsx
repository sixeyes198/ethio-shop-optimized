import React from "react";
import img5 from "../../assets/images/img5.jpg"
import Navbar from "../../components/Navbar/Navbar";

const Cart = () => {
  return (
    <>
    <Navbar/>
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
        </div>      
      </div>     
    </section>
    </>
  );
};

export default Cart;

