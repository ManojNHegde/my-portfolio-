import { useState } from "react";
import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Certifications from "./components/Certifications";
import Internship from "./components/Internship";
import SoftSkills from "./components/SoftSkills";
import Interests from "./components/Interests";
import Education from "./components/Education";

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Navbar isOpen={navOpen} setIsOpen={setNavOpen} />
      <Hero setNavOpen={setNavOpen} />
      <About />
      <Projects />
      <Skills />
      <Certifications />
      <Internship />
      <SoftSkills />
      <Education />
      <Interests />
      <Contact />
    </>
  );
}
