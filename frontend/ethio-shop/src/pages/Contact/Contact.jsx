import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

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
      <section
        className="py-20 mt-40 bg-gray-50 rounded-3xl shadow-2xl"
        id="contact-us"
      >
        <div className="container mx-auto px-6 md:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary text-4xl font-bold uppercase tracking-widest mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We'd love to hear from you! Send us a message and we'll get back
              to you as soon as possible.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-lg"
          >
            {/* Floating Input: Full Name */}
            <div className="relative mb-8">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full border-b-2 border-gray-300 bg-transparent py-4 placeholder-transparent focus:border-primary focus:outline-none"
                placeholder="Full Name"
              />
              <label
                htmlFor="name"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary"
              >
                Full Name
              </label>
            </div>

            {/* Floating Input: Phone Number */}
            <div className="relative mb-8">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                required
                className="peer w-full border-b-2 border-gray-300 bg-transparent py-4 placeholder-transparent focus:border-primary focus:outline-none"
                placeholder="Phone Number"
              />
              <label
                htmlFor="phone"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary"
              >
                Phone Number
              </label>
            </div>

            {/* Floating Input: Email */}
            <div className="relative mb-8">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="peer w-full border-b-2 border-gray-300 bg-transparent py-4 placeholder-transparent focus:border-primary focus:outline-none"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary"
              >
                Email
              </label>
            </div>

            {/* Floating Textarea: Message */}
            <div className="relative mb-10">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="peer w-full border-b-2 border-gray-300 bg-transparent py-4 placeholder-transparent focus:border-primary focus:outline-none resize-none"
                placeholder="Your Message"
              ></textarea>
              <label
                htmlFor="message"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-primary"
              >
                Your Message
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-primary to-amber-500 text-white font-semibold text-lg hover:opacity-90 transition-all duration-300"
            >
              Send Message <FiSend className="text-xl" />
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
};

export default Contact;
