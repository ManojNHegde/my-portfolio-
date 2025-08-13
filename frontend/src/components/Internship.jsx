import React from "react";
import content from "../data/sitecontent.json";
import { motion } from "framer-motion";

const Internship = () => {
  const data = content.internship;

  const listVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
  };

  return (
    <motion.section
      id="internship"
      className="py-16 bg-gray-100 text-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="container mx-auto px-6 md:px-12 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-blue-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Internship
        </motion.h2>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-xl font-bold">{data.company}</h3>
          <p className="text-gray-700 font-medium">{data.role}</p>
          <p className="text-sm text-gray-500 mb-4">{data.duration}</p>

          <ul className="list-disc pl-5 space-y-2 text-gray-800">
            {data.highlights.map((point, idx) => (
              <motion.li
                key={idx}
                custom={idx}
                variants={listVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Internship;
