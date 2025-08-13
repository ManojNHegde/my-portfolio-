import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SoftSkills = () => {
  const [softSkillsData, setSoftSkillsData] = useState(null);

  useEffect(() => {
    fetch("https://manojnhegde.github.io/data/site-content.json")
      .then((res) => res.json())
      .then((json) => setSoftSkillsData(json.softSkills))
      .catch((err) => console.error("Failed to fetch soft skills JSON:", err));
  }, []);

  if (!softSkillsData) return null; // Or a loader/spinner

  const { sectionTitle, items } = softSkillsData;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <motion.section
      id="softskills"
      className="py-16 bg-white text-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.h2
          className="text-3xl font-bold text-center text-blue-600 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {sectionTitle}
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={containerVariants}
        >
          {items.map((skill, idx) => (
            <motion.span
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SoftSkills;
