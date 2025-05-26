import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

interface HeaderProps {
  onNavigate: (target: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Handle navigation click with smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    onNavigate(target);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled down enough to add background
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-3 sm:py-4' : 'py-4 sm:py-6'
      } ${hidden ? '-translate-y-full' : 'translate-y-0'} will-change-transform`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#hero" 
          className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-300 hover:to-blue-500 transition-all duration-300"
          style={{ textShadow: '0 0 20px rgba(56, 189, 248, 0.5)' }}
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          AY
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block flex-1 ml-24">
          <ul className="flex justify-center space-x-10">
            {['Work', 'Skills', 'About', 'Contact'].map((item) => (
              <li key={item} className="list-none">
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="text-white/80 hover:text-white text-lg transition-all duration-300"
                  onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Let's Talk Button - Visible on both mobile and desktop */}
        <div className="flex items-center">
          <a 
            href="https://wa.me/919109435440?text=Hey%20Abhishek!%20I%20found%20your%20portfolio%20and%20I'm%20interested%20in%20connecting%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white rounded-full flex items-center space-x-1 sm:space-x-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 text-sm sm:text-base touch-manipulation"
            aria-label="Let's Talk via WhatsApp"
          >
            <span>Let's Talk</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;