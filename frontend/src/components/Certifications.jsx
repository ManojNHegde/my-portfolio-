import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Certifications = () => {
  const [certData, setCertData] = useState(null);

  useEffect(() => {
    fetch("https://manojnhegde.github.io/data/site-content.json")
      .then((res) => res.json())
      .then((data) => setCertData(data.certifications))
      .catch((err) => console.error("Failed to load JSON:", err));
  }, []);

  if (!certData) return <p>Loading...</p>;

  const { sectionTitle, items } = certData;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="certifications"
      className="py-16 bg-white text-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="container mx-auto px-6 md:px-12"
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-blue-600 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {sectionTitle}
        </motion.h2>

        <ul className="space-y-6 max-w-3xl mx-auto">
          {items.map((cert, index) => (
            <motion.li
              key={index}
              className="bg-gray-100 p-5 rounded-lg shadow-md hover:shadow-lg transition"
              variants={itemVariant}
            >
              <h3 className="text-xl font-semibold">{cert.title}</h3>
              <p className="text-gray-700">
                {cert.platform} &mdash; <span className="text-sm">{cert.date}</span>
              </p>
              {cert.link && (
                <a
                  href={cert.link}
                  className="text-blue-500 text-sm font-medium hover:underline mt-1 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Certificate
                </a>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default Certifications;
