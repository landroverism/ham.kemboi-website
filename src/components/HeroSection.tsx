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

  // Animation controls for orbit rotation
  const orbitControls = useAnimation();
  
  // Start orbit animation when component mounts
  useEffect(() => {
    orbitControls.start({
      rotate: 360,
      transition: {
        duration: 60,
        ease: "linear",
        repeat: Infinity,
      }
    });
  }, [orbitControls]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
        {/* Left column - Text content */}
        <div className="space-y-6">
          <motion.div className="flex items-center gap-2" variants={fadeInUp}>
            <hr className="w-12 border-primary" aria-hidden="true" />
            <span className="text-primary">Intro</span>
          </motion.div>

          <motion.h1 className="text-4xl md:text-5xl font-bold" variants={fadeInUp} tabIndex={0}>
            Hi there, I'm
            <span className="text-gradient"> Ham Kemboi</span>
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
        
        {/* Right column - Profile image with orbiting icons */}
        <motion.div 
          className="relative w-full max-w-[600px] h-[600px] md:h-[600px] sm:h-[400px] xs:h-[350px] flex items-center justify-center"
          variants={fadeInUp}
        >
          {/* Dark circular background */}
          <div className="absolute w-full h-full rounded-full flex items-center justify-center"
            style={{
              backgroundColor: 'rgba(12, 20, 37, 0.8)',
              boxShadow: '0 0 30px 5px rgba(0, 168, 255, 0.3)'
            }}
          >
            {/* Profile Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full overflow-hidden border-4 border-[#00a8ff] shadow-[0_0_25px_rgba(0,168,255,0.4)] z-20">
              <img
                src="/images/bravo.png"
                alt="Ham Kemboi profile photo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Tech Icons - Fixed Positions */}
            {/* JavaScript Icon - Top */}
            <div className="absolute top-[40px] left-1/2 -translate-x-1/2 z-10">
              <div className="w-14 h-16 md:w-14 md:h-16 sm:w-10 sm:h-12 xs:w-8 xs:h-10 flex items-center justify-center cursor-pointer"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  backgroundColor: '#0c1425',
                  border: '2px solid rgba(0, 168, 255, 0.8)',
                  boxShadow: '0 0 10px 2px rgba(0, 168, 255, 0.4)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-[#00a8ff] text-xs">|</span>
                  <span className="text-[#00a8ff] text-lg font-bold">JS</span>
                  <span className="text-[#00a8ff] text-xs">|</span>
                </div>
              </div>
            </div>

            {/* Python Icon - Top Right */}
            <div className="absolute top-[100px] right-[80px] sm:top-[70px] sm:right-[50px] xs:top-[60px] xs:right-[40px] z-10">
              <div className="w-14 h-16 md:w-14 md:h-16 sm:w-10 sm:h-12 xs:w-8 xs:h-10 flex items-center justify-center cursor-pointer"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  backgroundColor: '#0c1425',
                  border: '2px solid rgba(0, 168, 255, 0.8)',
                  boxShadow: '0 0 10px 2px rgba(0, 168, 255, 0.4)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-[#00a8ff] text-xs">|</span>
                  <span className="text-[#00a8ff] text-2xl">🐍</span>
                  <span className="text-[#00a8ff] text-xs">|</span>
                </div>
              </div>
            </div>

            {/* Django Icon - Right */}
            <div className="absolute top-1/2 right-[40px] sm:right-[30px] xs:right-[20px] -translate-y-1/2 z-10">
              <div className="w-14 h-16 md:w-14 md:h-16 sm:w-10 sm:h-12 xs:w-8 xs:h-10 flex items-center justify-center cursor-pointer"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  backgroundColor: '#0c1425',
                  border: '2px solid rgba(0, 168, 255, 0.8)',
                  boxShadow: '0 0 10px 2px rgba(0, 168, 255, 0.4)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-[#00a8ff] text-xs">|</span>
                  <span className="text-[#00a8ff] text-xl font-bold">dj</span>
                  <span className="text-[#00a8ff] text-xs">|</span>
                </div>
              </div>
            </div>

            {/* React Icon - Bottom Right */}
            <div className="absolute bottom-[100px] right-[80px] sm:bottom-[70px] sm:right-[50px] xs:bottom-[60px] xs:right-[40px] z-10">
              <div className="w-14 h-16 md:w-14 md:h-16 sm:w-10 sm:h-12 xs:w-8 xs:h-10 flex items-center justify-center cursor-pointer"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  backgroundColor: '#0c1425',
                  border: '2px solid rgba(0, 168, 255, 0.8)',
                  boxShadow: '0 0 10px 2px rgba(0, 168, 255, 0.4)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-[#00a8ff] text-xs">|</span>
                  <span className="text-[#00a8ff] text-xl">⚛</span>
                  <span className="text-[#00a8ff] text-xs">|</span>
                </div>
              </div>
            </div>

            {/* SQL Icon - Bottom */}
            <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-10">
              <div className="w-14 h-16 md:w-14 md:h-16 sm:w-10 sm:h-12 xs:w-8 xs:h-10 flex items-center justify-center cursor-pointer"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  backgroundColor: '#0c1425',
                  border: '2px solid rgba(0, 168, 255, 0.8)',
                  boxShadow: '0 0 10px 2px rgba(0, 168, 255, 0.4)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-[#00a8ff] text-xs">|</span>
                  <span className="text-[#00a8ff] text-lg font-bold">SQL</span>
                  <span className="text-[#00a8ff] text-xs">|</span>
                </div>
              </div>
            </div>

            {/* Node.js Icon - Bottom Left */}
            <div className="absolute bottom-[100px] left-[80px] sm:bottom-[70px] sm:left-[50px] xs:bottom-[60px] xs:left-[40px] z-10">
              <div className="w-14 h-16 md:w-14 md:h-16 sm:w-10 sm:h-12 xs:w-8 xs:h-10 flex items-center justify-center cursor-pointer"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  backgroundColor: '#0c1425',
                  border: '2px solid rgba(0, 168, 255, 0.8)',
                  boxShadow: '0 0 10px 2px rgba(0, 168, 255, 0.4)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-[#00a8ff] text-xs">|</span>
                  <span className="text-[#00a8ff] text-xl">⬢</span>
                  <span className="text-[#00a8ff] text-xs">|</span>
                </div>
              </div>
            </div>

            {/* Linux Icon - Left */}
            <div className="absolute top-1/2 left-[40px] sm:left-[30px] xs:left-[20px] -translate-y-1/2 z-10">
              <div className="w-14 h-16 md:w-14 md:h-16 sm:w-10 sm:h-12 xs:w-8 xs:h-10 flex items-center justify-center cursor-pointer"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  backgroundColor: '#0c1425',
                  border: '2px solid rgba(0, 168, 255, 0.8)',
                  boxShadow: '0 0 10px 2px rgba(0, 168, 255, 0.4)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-[#00a8ff] text-xs">|</span>
                  <span className="text-[#00a8ff] text-xl">🐧</span>
                  <span className="text-[#00a8ff] text-xs">|</span>
                </div>
              </div>
            </div>
            
            {/* Go Icon - Top Left */}
            <div className="absolute top-[100px] left-[80px] sm:top-[70px] sm:left-[50px] xs:top-[60px] xs:left-[40px] z-10">
              <div className="w-14 h-16 md:w-14 md:h-16 sm:w-10 sm:h-12 xs:w-8 xs:h-10 flex items-center justify-center cursor-pointer"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  backgroundColor: '#0c1425',
                  border: '2px solid rgba(0, 168, 255, 0.8)',
                  boxShadow: '0 0 10px 2px rgba(0, 168, 255, 0.4)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-[#00a8ff] text-xs">|</span>
                  <span className="text-[#00a8ff] text-lg font-bold">GO</span>
                  <span className="text-[#00a8ff] text-xs">|</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
