import React from "react";
import content from "../data/siteContent.json";
import { motion } from "framer-motion";

// Import icons
import {
  FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDatabase
} from "react-icons/fa";
import {
  SiDjango, SiMysql, SiTensorflow, SiTailwindcss
} from "react-icons/si";

// Icon map
const iconMap = {
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaDatabase,
  SiDjango,
  SiMysql,
  SiTensorflow,
  SiTailwindcss
};

// Card animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const Skills = () => {
  const skillsData = content.skills;

  return (
    <motion.section
      id="skills"
      className="py-16 bg-gray-100 text-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
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
          {skillsData.sectionTitle}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillsData.items.map((skill, index) => {
            const IconComponent = iconMap[skill.icon];
            return (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 hover:shadow-xl transition"
                variants={cardVariant}
              >
                <div className={`text-4xl ${skill.color}`}>
                  {IconComponent && <IconComponent />}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                  <div className="w-full bg-gray-300 h-2 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: skill.level }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Skills;
