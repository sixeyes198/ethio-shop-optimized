import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://TOChangeLater/contact", {
        method: "POST",
        headears: { "conntent-type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        return Error("Failed to send message");
      }
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <section className="py-12  mt-40 pt-10 " id="contact-us">
        <div className="container mx-auto px-4">
          {/* title header */}
          <div className="text-container mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Contact Us
            </h2>
          </div>
          {/* contact form */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            {/* name input */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your Name"
              />
            </div>
            {/* Phone input */}
            < div className="mb-4">
            <label 
            htmlFor="Phone Number"
            className=" block text-lg font-medium text-gray-700">
              Phone Number
            </label>
            <input
            type="tel" 
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your Phone Number"
            />
            </div>
            {/* email input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
              />
            </div>
            {/* message input */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-lg font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                rows="5"
                placeholder="Enter your message"
              />
            </div>
            {/* submit button */}
            <button
              type="submit"
              className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg border border-amber-400 hover:bg-amber-600 hover:border-amber-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
