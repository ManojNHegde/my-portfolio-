import React from "react";
import content from "../data/siteContent.json";
import { motion } from "framer-motion";

const Education = () => {
  const { sectionTitle, items } = content.education;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="education"
      className="py-16 bg-gray-50 text-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="container mx-auto px-6 md:px-12"
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-indigo-600 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {sectionTitle}
        </motion.h2>

        <ul className="max-w-3xl mx-auto space-y-8">
          {items.map((edu, idx) => (
            <motion.li
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-default"
              variants={itemVariant}
            >
              <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
              <p className="text-gray-700 mb-1">{edu.institution}</p>
              <p className="text-gray-600 italic text-sm mb-2">{edu.duration}</p>
              {edu.details && (
                <p className="text-gray-700">{edu.details}</p>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
};

export default Education;
