import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white shadow-lg hover:bg-opacity-70 transition duration-300"
    onClick={onClick}
  >
    <FaChevronLeft size={20} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white shadow-lg hover:bg-opacity-70 transition duration-300"
    onClick={onClick}
  >
    <FaChevronRight size={20} />
  </button>
);

const Projects = () => {
  const [projectData, setProjectData] = useState(null);
  const [sliderRef, setSliderRef] = useState(null);

  useEffect(() => {
    fetch("https://manojnhegde.github.io/data/site-content.json")
      .then((res) => res.json())
      .then((json) => setProjectData(json.projects))
      .catch((err) => console.error("Failed to load JSON:", err));
  }, []);

  if (!projectData) return null; // or a loader

  const settings = {
    dots: true,
    infinite: projectData.items.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <motion.section
      id="projects"
      className="py-16 bg-white text-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-center">
        <div className="max-w-6xl w-full relative">
          <motion.h2
            className="text-3xl font-bold text-center text-blue-600 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {projectData.sectionTitle}
          </motion.h2>

          <Slider ref={setSliderRef} {...settings}>
            {projectData.items.map((project, index) => (
              <div key={index} className="px-4">
                <motion.div
                  className="project-card bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col justify-between"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="mt-2">{project.description}</p>
                    <p className="mt-2 text-sm text-gray-700">
                      <span className="font-semibold">Tech Stack:</span>{" "}
                      {project.techStack}
                    </p>
                  </div>

                  {(project.demoLink?.trim() || project.githubLink?.trim()) && (
                    <div className="mt-4 flex gap-4">
                      {project.demoLink && project.demoLink.trim() !== "" && (
                        <a
                          href={project.demoLink}
                          className="text-blue-500 font-semibold hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.githubLink && project.githubLink.trim() !== "" && (
                        <a
                          href={project.githubLink}
                          className="text-gray-600 font-semibold hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
