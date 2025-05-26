import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (target: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  // Handle navigation click with smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    onNavigate(target);
  };

  return (
    <footer className="py-10 bg-gradient-to-b from-gray-900 to-gray-950 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a 
              href="#hero" 
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300 hidden md:block"
              onClick={(e) => handleNavClick(e, '#hero')}
            >
              AY
            </a>
            <p className="text-white/60 text-sm mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-white/60 text-sm flex items-center"
          >
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-red-500 animate-pulse" />
            <span>by Abhishek Yadav</span>
          </motion.div>
          
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ul className="flex space-x-6">
              {['Work', 'Skills', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-white/60 hover:text-blue-300 text-sm transition-colors duration-300"
                    onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;