import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import logoImage from '../assets/logo_temp_nobg.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'home', element: document.body },
        { id: 'about', element: document.getElementById('about-section') },
        { id: 'certifications', element: document.getElementById('certifications-section') },
        { id: 'skills', element: document.getElementById('skills-section') },
        { id: 'experience', element: document.getElementById('experience-section') },
        { id: 'contact', element: document.getElementById('contact-section') }
      ];

      const scrollPosition = window.scrollY + 100; // Offset for header height

      // Check if we're at the top of the page
      if (scrollPosition < 200) {
        setActiveSection('home');
        return;
      }

      // Find the active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.id !== 'home') {
          const rect = section.element.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          
          if (scrollPosition >= sectionTop - 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={logoImage} 
                alt="Hayakkiri Logo" 
                className="h-8 md:h-10 w-auto object-contain"
              />
              <span className="text-2xl md:text-3xl font-bold text-blue-900">
                Hayakkiri
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`transition-colors duration-300 font-medium px-3 py-2 rounded-md hover:bg-blue-50 ${
                activeSection === 'home' 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about-section')}
              className={`transition-colors duration-300 font-medium px-3 py-2 rounded-md hover:bg-blue-50 ${
                activeSection === 'about' 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('certifications-section')}
              className={`transition-colors duration-300 font-medium px-3 py-2 rounded-md hover:bg-blue-50 ${
                activeSection === 'certifications' 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Certifications
            </button>
            <button 
              onClick={() => scrollToSection('experience-section')}
              className={`transition-colors duration-300 font-medium px-3 py-2 rounded-md hover:bg-blue-50 ${
                activeSection === 'experience' 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('contact-section')}
              className={`transition-colors duration-300 font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 ${
                activeSection === 'contact'
                  ? 'bg-gradient-to-r from-blue-700 to-purple-700 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

      </nav>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} activeSection={activeSection} />
    </header>
  );
}

export default Header;