import React from "react";
import content from "../data/sitecontent.json";
import { motion } from "framer-motion";

const Interests = () => {
  const { sectionTitle, items } = content.interests;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="interests"
      className="py-16 bg-gray-100 text-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="container mx-auto px-6 md:px-12 max-w-4xl"
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-blue-600 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {sectionTitle}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 text-lg text-gray-800">
          {items.map((interest, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition"
              variants={cardVariant}
            >
              {interest}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Interests;
