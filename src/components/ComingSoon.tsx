import React from 'react';
import { ArrowLeft, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const ComingSoon: React.FC = () => {
  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15),transparent_70%)]"></div>
      
      <motion.div 
        className="max-w-2xl w-full bg-gradient-to-br from-gray-900 to-black border border-blue-900/30 rounded-xl p-8 md:p-12 text-center relative z-10 shadow-xl shadow-blue-900/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/30 border border-blue-700/30">
          <Code size={28} className="text-blue-400" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Source Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">Restricted</span>
        </h1>
        
        <p className="text-white/70 text-lg mb-8">
          The source code for this project is private and not available for public viewing due to client confidentiality agreements.
        </p>
        
        <button 
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to portfolio</span>
        </button>
      </motion.div>
    </div>
  );
};

export default ComingSoon; 