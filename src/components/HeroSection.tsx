import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Circle } from 'lucide-react';
import { techIcons } from '../data/techIcons';

const HeroSection: React.FC = () => {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [orbitRadius, setOrbitRadius] = useState(220);

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
    >
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <motion.div className="flex items-center gap-2" variants={fadeInUp}>
            <hr className="w-12 border-primary" />
            <span className="text-primary">Intro</span>
          </motion.div>

          <motion.h1 className="text-4xl md:text-5xl font-bold" variants={fadeInUp}>
            Hi there, I'm
            <span className="text-gradient"> Ham Kemboi</span>
          </motion.h1>

          <motion.p className="text-base md:text-xl text-muted-foreground" variants={fadeInUp}>
            I am a Moringa(Flatiron) graduate, fullstack developer who enjoys building things that
            live on the internet. I develop exceptional websites and webapps that
            provide intuitive, pixel-perfect user interfaces with efficient and
            modern back-ends.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
            <motion.a
              href="#contact"
              className="px-6 py-3 bg-primary rounded-lg text-primary-foreground hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>

            <motion.a
              href="#projects"
              className="px-6 py-3 border border-primary rounded-lg hover:bg-primary/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Work
            </motion.a>
          </motion.div>
        </div>

        <motion.div className="relative aspect-square max-w-sm mx-auto w-full" variants={fadeInUp}>
          {/* Profile Image Container */}
          <div className="absolute inset-0 m-auto flex items-center justify-center">
            <div className="relative w-full h-full max-w-[280px] max-h-[280px] md:max-w-[320px] md:max-h-[320px] mx-auto">
              {/* Static profile circle */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary glass-morphism">
                <img
                  src="./images/hammy.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Optional: Orbit path indicator */}
              <div
                className="absolute rounded-full border border-gray-500/20"
                style={{
                  width: orbitRadius * 2 + "px",
                  height: orbitRadius * 2 + "px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              />

              {/* Tech Icons - Fixed Orbital Positioning */}
              {techIcons.map((tech, index) => {
                const totalIcons = techIcons.length;
                const angle = 270 + (index * (360 / totalIcons));
                const angleInRadians = (angle * Math.PI) / 180;

                // Calculate position
                const x = Math.cos(angleInRadians) * orbitRadius;
                const y = Math.sin(angleInRadians) * orbitRadius;

                return (
                  <div
                    key={tech.name}
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: "40px",
                      height: "40px",
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                    }}
                  >
                    {/* Tech icon */}
                    <div
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white cursor-pointer"
                      style={{ backgroundColor: tech.color }}
                    >
                      <Circle className="w-4 h-4 md:w-6 md:h-6" />
                    </div>

                    {/* Tech name */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 mt-1 text-xs md:text-sm font-medium bg-black/80 px-2 py-1 rounded whitespace-nowrap"
                      style={{ top: "100%" }}
                    >
                      {tech.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
