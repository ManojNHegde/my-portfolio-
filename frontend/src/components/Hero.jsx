import React, { useState, useRef, useEffect } from "react";
import content from "../data/sitecontent.json";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaComments, FaTimes } from "react-icons/fa";
import Chat from "./Chat";
import Navbar from "./Navbar";

const Hero = () => {
  const data = content.hero;
  const [showResumeCard, setShowResumeCard] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // track mobile

  const chatRef = useRef(null);

  const toggleChat = () => {
    setShowChat((prev) => {
      if (!prev) setNavOpen(false);
      return !prev;
    });
  };

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setShowChat(false);
      }
    }

    if (showChat) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showChat]);

  return (
    <>
      <Navbar isOpen={navOpen} setIsOpen={setNavOpen} />

      <motion.section
        id="home"
        className={`h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 relative
          ${showChat ? "filter blur-sm pointer-events-none" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Profile Image */}
        <motion.img
          src={data.image.src}
          alt={data.image.alt}
          className={data.image.className}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* Heading */}
        <motion.h1
          className="text-4xl font-bold mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {data.heading}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          {data.subheading}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-6 space-x-4 flex items-center justify-center relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          {data.buttons.map((btn, idx) => (
            <motion.a
              key={idx}
              href={btn.href}
              className={btn.className}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {btn.text}
            </motion.a>
          ))}

          {/* Resume Button */}
          <motion.div
            className="relative"
            onMouseEnter={() => setShowResumeCard(true)}
            onMouseLeave={() => setShowResumeCard(false)}
          >
            <motion.button
              className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              📄 Resume
            </motion.button>

            <AnimatePresence>
              {showResumeCard && (
                <motion.div
                  initial={{ opacity: 0, y: 20, x: 0, scale: 0.95 }}
                  animate={{ opacity: 1, y: -280, x: 20, scale: 1 }}
                  exit={{ opacity: 0, y: 20, x: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute z-50 cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://drive.google.com/file/d/147Fs5kl2y_A681VxQ9g0sBEsS-wO99j3/view?usp=sharing",
                      "_blank"
                    )
                  }
                >
                  <iframe
                    src="https://drive.google.com/file/d/147Fs5kl2y_A681VxQ9g0sBEsS-wO99j3/preview"
                    title="Resume Preview"
                    className="w-80 h-96 rounded-md pointer-events-none"
                    frameBorder="0"
                  ></iframe>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Contact Links */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-6 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <a
            href="mailto:manojnhegde@gmail.com"
            className="flex items-center gap-2 hover:text-yellow-300 transition"
          >
            <FaEnvelope /> manojnhegde@gmail.com
          </a>
          <a
            href="tel:+91 9741212214"
            className="flex items-center gap-2 hover:text-yellow-300 transition"
          >
            <FaPhone /> +91 9741212214
          </a>
          <a
            href="https://github.com/ManojNHegde"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-yellow-300 transition"
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/manojnhegde"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-yellow-300 transition"
          >
            <FaLinkedin /> LinkedIn
          </a>
        </motion.div>
      </motion.section>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center">
        <AnimatePresence>
          {showChat && (
            <motion.div
              ref={chatRef}
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`bg-white text-black max-h-[95vh] rounded-lg shadow-lg mb-0 flex flex-col overflow-hidden fixed`}
              style={{
                zIndex: 105,
                width: isMobile ? "90%" : "35rem",
                bottom: isMobile ? "5rem" : "2.25rem",
                left: isMobile ? "5%" : "auto",
                right: isMobile ? "auto" : "16rem",
                transform: isMobile ? "translateX(-50%)" : "none",
              }}
            >
              <div className="flex-1 overflow-y-auto p-4">
                <Chat />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Toggle Button */}
        <motion.button
          className="bg-yellow-400 text-black p-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-yellow-500 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
        >
          {showChat ? (
            <>
              <FaTimes size={20} /> End Chat
            </>
          ) : (
            <>
              <FaComments size={20} /> Chat with Me
            </>
          )}
        </motion.button>
      </div>
    </>
  );
};

export default Hero;
