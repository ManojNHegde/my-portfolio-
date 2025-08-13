import React, { useState } from "react";
import axios from "axios";
import content from "../data/sitecontent.json";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const contactData = content.contact;

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // clear messages when typing
    if (success || error) {
      setSuccess(false);
      setError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/contact", formData);
      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 }
    }),
  };

  return (
    <motion.section
      id="contact"
      className="py-20 bg-gray-100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {contactData.heading}
      </motion.h2>

      <motion.div
        className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {contactData.fields.map((field, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full p-3 border rounded-md"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full p-3 border rounded-md"
                />
              )}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className={contactData.button.className}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            {contactData.button.text}
          </motion.button>
        </form>

        <AnimatePresence mode="wait">
          {success && (
            <motion.p
              key="success"
              className="text-green-500 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {contactData.messages.success}
            </motion.p>
          )}
          {error && (
            <motion.p
              key="error"
              className="text-red-500 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {contactData.messages.error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
