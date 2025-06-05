import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { techIcons } from '../data/techIcons';

const HeroSection: React.FC = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [orbitRadius, setOrbitRadius] = useState(220);
  const orbitControls = useAnimation();
  
  // Start orbit animation when component mounts
  useEffect(() => {
    orbitControls.start({
      rotate: 360,
      transition: {
        duration: 120,
        ease: "linear",
        repeat: Infinity,
      }
    });
  }, []);

  useEffect(() => {
    const updateOrbitRadius = () => {
      if (window.innerWidth <= 480) {
        setOrbitRadius(120); // Very small screens
      } else if (window.innerWidth <= 768) {
        setOrbitRadius(150); // Tablets
      } else {
        setOrbitRadius(220); // Default
      }
    };

    window.addEventListener('resize', updateOrbitRadius);
    updateOrbitRadius();
    return () => window.removeEventListener('resize', updateOrbitRadius);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center px-6 pt-20"
      initial="hidden"
      animate={heroInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      aria-label="Hero section"
    >
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <motion.div className="flex items-center gap-2" variants={fadeInUp}>
            <hr className="w-12 border-primary" aria-hidden="true" />
            <span className="text-primary">Intro</span>
          </motion.div>

          <motion.h1 className="text-4xl md:text-5xl font-bold" variants={fadeInUp} tabIndex={0}>
            Hi there, I'm
            <span className="text-gradient"> Ham Kemboi</span>
            <div className="relative w-full h-full max-w-[280px] max-h-[280px] md:max-w-[320px] md:max-h-[320px] mx-auto">
              {/* Static profile circle with enhanced glass morphism */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary glass-morphism shadow-lg" style={{ boxShadow: '0 0 25px rgba(2, 132, 199, 0.3)' }}>
                <img
                  src="/images/profile.jpg"
                  alt="Ham Kemboi profile photo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  fetchPriority="high"
                />
              </div>

              {/* Animated orbit path indicator */}
              <motion.div
                className="absolute rounded-full border border-primary/20"
                style={{
                  width: orbitRadius * 2 + "px",
                  height: orbitRadius * 2 + "px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 15px rgba(2, 132, 199, 0.1) inset"
                }}
                animate={{
                  boxShadow: ["0 0 15px rgba(2, 132, 199, 0.1) inset", "0 0 25px rgba(2, 132, 199, 0.2) inset", "0 0 15px rgba(2, 132, 199, 0.1) inset"],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                aria-hidden="true"
              ></motion.div>

              {/* Tech Icons - Animated Orbital Positioning */}
              <motion.div
                className="absolute w-full h-full"
                animate={orbitControls}
                style={{
                  width: orbitRadius * 2 + "px",
                  height: orbitRadius * 2 + "px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {techIcons.map((tech, index) => {
                  const totalIcons = techIcons.length;
                  const angle = 270 + (index * (360 / totalIcons)); // Start from the top and distribute clockwise
                  const angleInRadians = (angle * Math.PI) / 180;

                  const x = Math.cos(angleInRadians) * orbitRadius;
                  const y = Math.sin(angleInRadians) * orbitRadius;

                  const isHovered = hoveredIcon === tech.name;

                  return (
                    <motion.div
                      key={tech.name}
                      className="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: "56px", // Corresponds to md:w-14
                        height: "65px", // Corresponds to md:h-[65px] for hexagon aspect ratio
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        zIndex: isHovered ? 10 : 1,
                        transformOrigin: "center"
                      }}
                      // Counter-rotate to keep icons upright while orbit rotates
                      animate={{ rotate: -angle }}
                      transition={{ duration: 0 }}
                    >
                      <motion.div
                        className="w-10 h-[46px] md:w-14 md:h-[65px] flex items-center justify-center text-white cursor-pointer"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          backgroundColor: '#0284c7', // Consistent blue color like in the reference image
                          boxShadow: isHovered ? '0 0 15px 5px rgba(2, 132, 199, 0.4)' : '0 0 5px rgba(2, 132, 199, 0.2)'
                        }}
                        onMouseEnter={() => setHoveredIcon(tech.name)}
                        onMouseLeave={() => setHoveredIcon(null)}
                        whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
                        aria-label={`${tech.name} technology icon`}
                        role="img"
                      >
                        <span className="text-lg md:text-xl font-semibold">
                          {tech.name === 'JavaScript' && 'JS'}
                          {tech.name === 'Python' && 'Py'}
                          {tech.name === 'Django' && 'dj'}
                          {tech.name === 'React' && <span className="text-cyan-300">⚛</span>}
                          {tech.name === 'Node.js' && <span className="text-green-400">⬢</span>}
                          {tech.name === 'SQL' && 'SQL'}
                          {tech.name === 'Linux' && <span className="text-yellow-300">🐧</span>}
                        </span>
                      </motion.div>
                      
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 rounded text-white text-sm whitespace-nowrap"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            style={{ top: '100%' }}
                          >
                            {tech.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.h1>
          
          <motion.p className="text-base md:text-xl text-muted-foreground" variants={fadeInUp} tabIndex={0}>
            I am a Moringa(Flatiron) graduate, fullstack developer who enjoys building things that
            live on the internet. I develop exceptional websites and webapps that
            provide intuitive, pixel-perfect user interfaces with efficient and
            modern back-ends.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
            <motion.a
              href="#contact"
              className="px-6 py-3 bg-primary rounded-lg text-primary-foreground hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#121826]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Contact me"
            >
              Get In Touch
            </motion.a>

            <motion.a
              href="#projects"
              className="px-6 py-3 border border-primary rounded-lg hover:bg-primary/10 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#121826]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View my work projects"
            >
              View Work
            </motion.a>
          </motion.div>
        </div>
        
        <motion.div className="relative aspect-square max-w-sm mx-auto w-full" variants={fadeInUp}>
          {/* Profile Image Container */}
          <div className="absolute inset-0 m-auto flex items-center justify-center">
            <div className="relative w-full h-full max-w-[280px] max-h-[280px] md:max-w-[320px] md:max-h-[320px] mx-auto">
              {/* Static profile circle with enhanced glass morphism */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary glass-morphism shadow-lg" style={{ boxShadow: '0 0 25px rgba(2, 132, 199, 0.3)' }}>
                <img
                  src="/images/profile .jpg"
                  alt="Ham Kemboi profile photo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  fetchPriority="high"
                />
              </div>

              {/* Animated orbit path indicator */}
              <motion.div
                className="absolute rounded-full border border-primary/20"
                style={{
                  width: orbitRadius * 2 + "px",
                  height: orbitRadius * 2 + "px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 15px rgba(2, 132, 199, 0.1) inset"
                }}
                animate={{
                  boxShadow: ["0 0 15px rgba(2, 132, 199, 0.1) inset", "0 0 25px rgba(2, 132, 199, 0.2) inset", "0 0 15px rgba(2, 132, 199, 0.1) inset"],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                aria-hidden="true"
              ></motion.div>

              {/* Tech Icons - Animated Orbital Positioning */}
              <motion.div
                className="absolute w-full h-full"
                animate={orbitControls}
                style={{
                  width: orbitRadius * 2 + "px",
                  height: orbitRadius * 2 + "px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {techIcons.map((tech, index) => {
                  const totalIcons = techIcons.length;
                  const angle = 270 + (index * (360 / totalIcons)); // Start from the top and distribute clockwise
                  const angleInRadians = (angle * Math.PI) / 180;

                  const x = Math.cos(angleInRadians) * orbitRadius;
                  const y = Math.sin(angleInRadians) * orbitRadius;

                  const isHovered = hoveredIcon === tech.name;

                  return (
                    <motion.div
                      key={tech.name}
                      className="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: "56px", // Corresponds to md:w-14
                        height: "65px", // Corresponds to md:h-[65px] for hexagon aspect ratio
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        zIndex: isHovered ? 10 : 1,
                        transformOrigin: "center"
                      }}
                      // Counter-rotate to keep icons upright while orbit rotates
                      animate={{ rotate: -angle }}
                      transition={{ duration: 0 }}
                    >
                      <motion.div
                        className="w-10 h-[46px] md:w-14 md:h-[65px] flex items-center justify-center text-white cursor-pointer"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          backgroundColor: '#0284c7', // Consistent blue color like in the reference image
                          boxShadow: isHovered ? '0 0 15px 5px rgba(2, 132, 199, 0.4)' : '0 0 5px rgba(2, 132, 199, 0.2)'
                        }}
                        onMouseEnter={() => setHoveredIcon(tech.name)}
                        onMouseLeave={() => setHoveredIcon(null)}
                        whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
                        aria-label={`${tech.name} technology icon`}
                        role="img"
                      >
                        <span className="text-lg md:text-xl font-semibold">
                          {tech.name === 'JavaScript' && 'JS'}
                          {tech.name === 'Python' && 'Py'}
                          {tech.name === 'Django' && 'dj'}
                          {tech.name === 'React' && <span className="text-cyan-300">⚛</span>}
                          {tech.name === 'Node.js' && <span className="text-green-400">⬢</span>}
                          {tech.name === 'SQL' && 'SQL'}
                          {tech.name === 'Linux' && <span className="text-yellow-300">🐧</span>}
                        </span>
                      </motion.div>
                      
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 rounded text-white text-sm whitespace-nowrap"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            style={{ top: '100%' }}
                          >
                            {tech.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
