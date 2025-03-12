
import React, { useEffect } from 'react';

const CursorGlow: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector('.cursor-glow') as HTMLElement;
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Add subtle lag for more natural effect
        setTimeout(() => {
          if (cursor) {
            cursor.style.opacity = '1';
          }
        }, 50);
      }
    };
    
    const handleMouseLeave = () => {
      const cursor = document.querySelector('.cursor-glow') as HTMLElement;
      if (cursor) {
        cursor.style.opacity = '0';
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div className="cursor-glow fixed pointer-events-none w-64 h-64 -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full blur-3xl opacity-0 transition-opacity duration-200 animate-pulse-glow" />
  );
};

export default CursorGlow;
