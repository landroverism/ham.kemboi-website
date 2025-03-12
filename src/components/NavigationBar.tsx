
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const { theme, toggleTheme } = useTheme();
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [1, 0.8]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Detect which section is currently visible
      const sections = ["hero", "about", "projects", "testimonials", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = ['About', 'Projects', 'Testimonials', 'Contact'];
  
  const variants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3 } }
  };
  
  // Determine hamburger menu color based on current section
  const getMenuColor = () => {
    if (["about", "projects"].includes(currentSection)) {
      return theme === 'dark' ? "text-white" : "text-gray-800";
    }
    return "text-primary";
  };
  
  return (
    <motion.nav 
      className={`fixed w-full py-4 px-6 z-50 transition-all duration-300 ${
        scrolled ? 'glass-morphism' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ opacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`absolute inset-0 transition-all duration-300 ${
          isHovered ? 'animate-navbar-hover' : ''
        }`}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10 flex justify-between items-center">
        <motion.a 
          href="#"
          className="text-2xl font-bold text-gradient"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          HK.
        </motion.a>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.a>
          ))}
          
          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-muted hover:bg-muted/70 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
          </motion.button>
        </div>
        
        {/* Mobile Navigation Toggle - Adaptive background and color */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Toggle Button for Mobile */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-muted hover:bg-muted/70 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
          </motion.button>
          
          <motion.button
            className={`flex items-center justify-center ${getMenuColor()} z-50 w-10 h-10 rounded-full ${
              currentSection === "hero" ? "bg-background/90" : "bg-primary/10"
            } border border-border`}
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
        
        {/* Mobile Navigation Drawer - Improved styling */}
        <motion.div 
          className="fixed top-0 right-0 bottom-0 w-3/4 neo-blur z-40 pt-20 px-6 flex flex-col md:hidden"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={variants}
        >
          <div className="flex flex-col space-y-6">
            {navLinks.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
                whileHover={{ x: 5 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        {/* Backdrop for mobile menu */}
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </motion.nav>
  );
};

export default NavigationBar;
