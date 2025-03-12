
import React from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import CursorGlow from '../components/CursorGlow';
import { ThemeProvider } from '../hooks/useTheme';

const Index: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <CursorGlow />
        <NavigationBar />
        
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <TestimonialsSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
