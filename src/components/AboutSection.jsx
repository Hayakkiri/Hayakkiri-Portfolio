import { useState, useEffect } from "react";
import HayakkiriImage from "../assets/Hayakkiri.jpg";
import MobileMenu from "./MobileMenu";
import { handleResumeClick } from "../utils/resumeHandler";
import logoImage from "../assets/logo_temp_nobg.png";

// Scroll-triggered Header Component
const ScrollHeader = ({ onMobileMenuToggle }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setIsVisible(rect.top <= 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-lg ${
        isVisible
          ? "animate-slideDown"
          : "transform -translate-y-full opacity-0"
      }`}
      style={{
        willChange: "transform, opacity",
        transition: "none",
      }}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto py-4 px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img 
            src={logoImage} 
            alt="Hayakkiri Logo" 
            className="h-8 md:h-10 w-auto object-contain"
          />
          <span className="text-2xl md:text-3xl font-bold text-blue-900">
            Hayakkiri
          </span>
        </div>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() =>
              document
                .getElementById("about-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={() =>
              document
                .getElementById("experience-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium cursor-pointer"
          >
            Experience
          </button>
          <button
            onClick={handleResumeClick}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium cursor-pointer"
          >
            My Resume
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={onMobileMenuToggle}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 p-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          observer.disconnect(); // Stop observing after first trigger
        }
      },
      { threshold: 0.2 }
    );

    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <>
      <ScrollHeader onMobileMenuToggle={toggleMobileMenu} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <section
        id="about-section"
        className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-20"
      >
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Title */}
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              About
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-4">
                Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Section */}
            <div
              className={`relative transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl transform rotate-3"></div>
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-2xl transform -rotate-3"></div>

                {/* Main image */}
                <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
                  <img
                    src={HayakkiriImage}
                    alt="Hayakkiri"
                    className="w-full h-[500px] object-cover rounded-xl"
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg animate-float">
                  QC
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-float animation-delay-1000">
                  DE
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div
              className={`space-y-8 transform transition-all duration-1000 delay-600 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              {/* Professional Title */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  Quality Control & Design Engineer
                </h3>
                <p className="text-xl text-blue-600 font-medium">
                  Innovation Specialist • Digital Craftsman
                </p>
              </div>

              {/* Description */}
              <div
                className={`space-y-6 text-gray-600 leading-relaxed transform transition-all duration-1000 delay-900 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
              >
                <p
                  className={`text-lg transform transition-all duration-800 delay-1000 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-5 opacity-0"
                  }`}
                >
                  I am a dedicated Mechatronics Engineering professional with
                  practical experience in quality control and assembly line
                  operations within the TVS Group. My roles at Brakes India and
                  Wheels India involved precise assembly of Tandem Master
                  Cylinder (TMC) components and dimensional verification of
                  incoming materials, respectively. This experience has equipped
                  me with a strong understanding of industrial processes and
                  quality assurance protocols.
                </p>
                <p
                  className={`text-lg transform transition-all duration-800 delay-1200 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-5 opacity-0"
                  }`}
                >
                  My technical skills include proficiency in QC tools,
                  engineering drawing, GD&T, AutoCAD, and SolidWorks. I have
                  foundational knowledge in CNC machine operation (VMC/HMC) and
                  Special Purpose Machine (SPM) development from various
                  internships. My passion for automation is evident in projects
                  such as the Autonomous Rover, where I applied engineering
                  principles to develop solutions for industrial surveillance.
                </p>
              </div>

              {/* Skills/Stats */}
              <div
                className={`grid grid-cols-2 gap-6 transform transition-all duration-1000 delay-1600 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div
                  className={`bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform ${
                    isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}
                  style={{ transitionDelay: "1700ms" }}
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    2
                  </div>
                  <div className="text-gray-700 font-medium">
                    Work Experiences
                  </div>
                </div>
                <div
                  className={`bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform ${
                    isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}
                  style={{ transitionDelay: "1800ms" }}
                >
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    3
                  </div>
                  <div className="text-gray-700 font-medium">
                    Internships
                  </div>
                </div>
                <div
                  className={`bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform ${
                    isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}
                  style={{ transitionDelay: "1900ms" }}
                >
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    18+
                  </div>
                  <div className="text-gray-700 font-medium">
                    Months Experience
                  </div>
                </div>
                <div
                  className={`bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform ${
                    isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}
                  style={{ transitionDelay: "2000ms" }}
                >
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    5
                  </div>
                  <div className="text-gray-700 font-medium">
                    Companies
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-4 pt-4 transform transition-all duration-1000 delay-2100 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
              >
                <button
                  onClick={handleResumeClick}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl animate-float flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View Resume
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-400 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 animate-float animation-delay-300"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutSection;
