import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onScrollDown: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollDown }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only add mouse move effect on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        
        const { clientX, clientY } = e;
        const rect = heroRef.current.getBoundingClientRect();
        
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        const xPercent = x / rect.width - 0.5;
        const yPercent = y / rect.height - 0.5;
        
        heroRef.current.style.setProperty('--mouse-x', `${xPercent * 80}px`);
        heroRef.current.style.setProperty('--mouse-y', `${yPercent * 30}px`);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16 sm:pt-0"
    >
      {/* Dynamic background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15),rgba(0,0,0,1))]"></div>
      
      {/* Animated gradient circles */}
      <motion.div 
        className="absolute top-1/4 -left-[10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[100px] bg-blue-600 animate-pulse-slow will-change-transform"
        style={{ animationDelay: '0s' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 -right-[5%] w-[30%] h-[30%] rounded-full opacity-20 blur-[100px] bg-blue-400 animate-pulse-slow will-change-transform"
        style={{ animationDelay: '2s' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 0.5 }}
      ></motion.div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-5 mix-blend-soft-light"></div>
      
      <div className="container mx-auto px-4 sm:px-6 z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
        </motion.div>
        
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight text-white will-change-transform"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4, 
            ease: [0.215, 0.610, 0.355, 1.000] 
          }}
        >
          <span className="block">Abhishek Yadav</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">Full Stack Developer</span>
        </motion.h1>
        
        <motion.p 
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.6,
            ease: [0.215, 0.610, 0.355, 1.000]
          }}
        >
          I build exceptional digital experiences that live at the intersection of technology and design. Specializing in creating high-performance web applications with stunning user interfaces.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.8,
            ease: [0.215, 0.610, 0.355, 1.000]
          }}
        >
          <a 
            href="#work" 
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white rounded-full flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 font-medium text-lg min-w-[180px] will-change-transform touch-manipulation"
            onClick={(e) => {
              e.preventDefault();
              onScrollDown();
            }}
            aria-label="View my work"
          >
            <span>View My Work</span>
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-white/40 text-white rounded-full flex items-center justify-center space-x-2 transition-all duration-300 font-medium text-lg hover:bg-white/5 min-w-[180px] will-change-transform touch-manipulation"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('scrollToSection', { detail: '#contact' }));
            }}
            aria-label="Contact me"
          >
            <span>Contact Me</span>
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator - Hidden on very small screens */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 mx-auto w-fit flex flex-col items-center justify-center text-white/50 hover:text-white/80 transition-colors duration-300 cursor-pointer will-change-transform hidden xs:flex"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0],
          transition: {
            y: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }
          }
        }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={(e) => {
          e.preventDefault();
          onScrollDown();
        }}
      >
        <span className="text-sm mb-2">SCROLL DOWN</span>
        <ArrowDown className="animate-bounce" size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;