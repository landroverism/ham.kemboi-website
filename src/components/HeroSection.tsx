
import React, { useState } from 'react';
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
          <motion.div 
            className="flex items-center gap-2"
            variants={fadeInUp}
          >
            <hr className="w-12 border-primary" />
            <span className="text-primary">Intro</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold"
            variants={fadeInUp}
          >
            Hi there, I'm
            <span className="text-gradient"> Ham Kemboi</span>
          </motion.h1>
          
          <motion.p 
            className="text-base md:text-xl text-muted-foreground"
            variants={fadeInUp}
          >
            I am a Moringa(Flatiron) graduate, fullstack developer who enjoys building things that
            live on the internet. I develop exceptional websites and webapps that
            provide intuitive, pixel-perfect user interfaces with efficient and
            modern back-ends.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={fadeInUp}
          >
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

        <motion.div 
          className="relative aspect-square max-w-sm mx-auto w-full"
          variants={fadeInUp}
        >
          {/* Profile Image Container - Improved responsive layout */}
          <div className="absolute inset-0 m-auto flex items-center justify-center">
            <div className="relative w-full h-full max-w-[280px] max-h-[280px] md:max-w-[320px] md:max-h-[320px] mx-auto">
              <motion.div 
                className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary glass-morphism"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <img
                  src="./images/hammy.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Tech Icons - Improved positioning with better alignment */}
              {techIcons.map((tech, index) => {
                const iconCount = techIcons.length;
                const angleInRadians = ((tech.angle) * Math.PI) / 180;
                
                // Make radius responsive and slightly larger
                const radius = window.innerWidth <= 768 ? 135 : 160;
                
                // Calculate position using the specific angle for each icon
                const x = Math.cos(angleInRadians) * radius;
                const y = Math.sin(angleInRadians) * radius;

                return (
                  <motion.div
                    key={tech.name}
                    className="absolute w-10 h-10 md:w-12 md:h-12 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { delay: 0.2 + index * 0.1 }
                    }}
                    whileHover={{ scale: 1.2 }}
                    onMouseEnter={() => setHoveredIcon(index)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <motion.div
                      className="w-full h-full rounded-full flex items-center justify-center text-white relative group neo-blur"
                      style={{ backgroundColor: tech.color }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Circle className="w-4 h-4 md:w-6 md:h-6" />
                      <div className="absolute inset-0 rounded-full bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <motion.span 
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs md:text-sm font-medium bg-background/80 px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech.name}
                    </motion.span>
                  </motion.div>
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
