
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import ReactDOM from 'react-dom';

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [currentSection, setCurrentSection] = useState("hero");
  const { theme } = useTheme();
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [1, 0.8]);
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past threshold
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Hide/show navbar based on scroll direction
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current + 10) {
        setVisible(false); // Scrolling down - hide navbar
      } else if (currentScrollY < lastScrollY.current - 10 || currentScrollY <= 0) {
        setVisible(true);  // Scrolling up or at top - show navbar
      }
      lastScrollY.current = currentScrollY;
      
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
  
  // Determine colors based on current section
  const getMenuColor = () => {
    if (["about", "projects"].includes(currentSection)) {
      return "text-white";
    }
    return "text-primary";
  };
  
  // Get appropriate background for navbar based on section
  const getNavbarBackground = () => {
    if (["projects", "contact", "testimonials"].includes(currentSection)) {
      return scrolled ? 'glass-morphism bg-black/50' : '';
    }
    return scrolled ? 'glass-morphism' : '';
  };
  
  // Mobile Menu Portal Component
  const MobileMenuPortal = () => {
    if (!isOpen) return null;
    
    return ReactDOM.createPortal(
      <div className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-sm z-[9999] md:hidden">
        <motion.div 
          className="fixed inset-0 bg-[#121826] flex flex-col items-center justify-center"
          initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 28px) 28px)' }}
          animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 28px) 28px)' }}
          exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 28px) 28px)' }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-4 right-6">
            <motion.button
              className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-primary/20 border border-primary/30"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={24} />
            </motion.button>
          </div>
          <div className="flex flex-col space-y-8 items-center text-center">
            {navLinks.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xl text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <motion.nav 
        className={`fixed w-full py-4 px-6 z-50 transition-all duration-300 ${
          getNavbarBackground()
        }`}
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
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
          className="text-4xl font-bold text-primary"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white">H</span><span className="text-primary">K</span><span className="text-primary">.</span>
        </motion.a>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`nav-link ${
                ["projects", "contact", "testimonials"].includes(currentSection) ? 
                'text-white hover:text-primary' : 'text-foreground hover:text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.a>
          ))}

        </div>
        
        {/* Mobile Navigation Toggle - Adaptive background and color */}
        <div className="md:hidden flex items-center gap-2">
          <motion.button
            className={`flex items-center justify-center ${getMenuColor()} z-[9999] w-10 h-10 rounded-full ${
              currentSection === "hero" ? "bg-background/90" : "bg-primary/10"
            } border border-border relative`}
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
        

      </div>
    </motion.nav>
      
      {/* Render mobile menu using portal */}
      <AnimatePresence>
        {isOpen && <MobileMenuPortal />}
      </AnimatePresence>
    </>
  );
};

export default NavigationBar;
