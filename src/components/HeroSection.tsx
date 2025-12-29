import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection: React.FC = () => {
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
      className="min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #1a2332 50%, #0f1419 100%)',
      }}
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
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-6 w-full max-w-[1800px] relative z-10">
        {/* Left column - Text content with clean negative space */}
        <div className="space-y-6 lg:pr-8 flex flex-col justify-center">
          <motion.div className="flex items-center gap-2" variants={fadeInUp}>
            <hr className="w-12 border-primary/60" aria-hidden="true" />
            <span className="text-primary/80 text-sm uppercase tracking-wider">Intro</span>
          </motion.div>

          <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" variants={fadeInUp} tabIndex={0}>
            Hi there, I'm
            <br />
            <span className="text-gradient"> Ham Kemboi</span>
          </motion.h1>
          
          <motion.p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl" variants={fadeInUp} tabIndex={0}>
            I am a Moringa(Flatiron) graduate, fullstack developer who enjoys building things that
            live on the internet. I develop exceptional websites and webapps that
            provide intuitive, pixel-perfect user interfaces with efficient and
            modern back-ends.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 pt-4" variants={fadeInUp}>
            <motion.a
              href="#contact"
              className="px-8 py-3.5 bg-primary/90 rounded-lg text-primary-foreground hover:bg-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent shadow-lg shadow-primary/20"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 168, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              aria-label="Contact me"
            >
              Get In Touch
            </motion.a>

            <motion.a
              href="#projects"
              className="px-8 py-3.5 border border-primary/40 rounded-lg hover:bg-primary/10 hover:border-primary/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View my work projects"
            >
              View Work
            </motion.a>
          </motion.div>
        </div>
        
        {/* Right column - Large hero image */}
        <motion.div 
          className="relative w-full flex items-center justify-center overflow-visible"
          variants={fadeInUp}
        >
          <motion.div 
            className="relative w-full h-[650px] sm:h-[750px] md:h-[850px] lg:h-[950px] xl:h-[1050px] 2xl:h-[1150px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src="/images/web5.png"
              alt="Ham Kemboi - Fullstack Developer"
              className="h-full w-auto max-w-none object-contain object-center"
              style={{
                imageRendering: 'crisp-edges' as const,
                minHeight: '100%',
                transform: 'scale(1.1)',
              }}
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
