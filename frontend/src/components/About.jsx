import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch("https://manojnhegde.github.io/data/site-content.json")
      .then((res) => res.json())
      .then((data) => {
        setAboutData(data.about);
        setImageData(data.about.image);
      })
      .catch((err) => console.error("Failed to load JSON:", err));
  }, []);

  if (!aboutData || !imageData) return <p>Loading...</p>;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="about"
      className="py-16 bg-gray-100 text-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
        
        {/* Profile Image - Slide In Left */}
        <motion.div
          className="md:w-1/3 flex justify-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={imageData.src}
            alt={imageData.alt}
            className={imageData.className}
          />
        </motion.div>

        {/* About Text */}
        <motion.div
          className="md:w-2/3 mt-6 md:mt-0 md:pl-12 text-center md:text-left"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold text-blue-600"
            variants={textVariant}
          >
            {aboutData.heading}
          </motion.h2>

          {aboutData.paragraphs.map((text, idx) => (
            <motion.p
              key={idx}
              className="mt-4 text-lg"
              variants={textVariant}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
