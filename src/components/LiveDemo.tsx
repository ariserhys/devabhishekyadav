import React, { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectData {
  title: string;
  image: string;
  tags: string[];
}

const projectsData: Record<string, ProjectData> = {
  "E-Commerce Platform": {
    title: "E-Commerce Platform",
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["React", "Node.js", "MongoDB", "Stripe"]
  },
  "SEO Analytics Dashboard": {
    title: "SEO Analytics Dashboard",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Vue.js", "D3.js", "Express", "PostgreSQL"]
  }
};

const LiveDemo: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  
  useEffect(() => {
    // Get project title from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('demo-project');
    
    if (title && projectsData[title]) {
      setProjectData(projectsData[title]);
    } else {
      setProjectData({
        title: title || 'Project',
        image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['React', 'TypeScript', 'Tailwind CSS']
      });
    }
  }, []);

  // Handle navigation without triggering loading screen
  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  };

  if (!projectData) return <div className="min-h-screen bg-black"></div>;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15),transparent_70%)]"></div>
      
      <motion.div 
        className="max-w-3xl w-full bg-gradient-to-br from-gray-900 to-black border border-blue-900/30 rounded-xl p-8 md:p-12 relative z-10 shadow-xl shadow-blue-900/10 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative">
          <div className="mb-8 overflow-hidden rounded-lg h-40 relative">
            <div 
              className="absolute inset-0 bg-cover bg-center transform scale-105 hover:scale-110 transition-transform duration-700"
              style={{ backgroundImage: `url(${projectData.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
            
            <div className="absolute bottom-0 left-0 p-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">{projectData.title}</span>
              </h1>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {projectData.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-3 py-1 text-xs font-medium bg-blue-900/20 text-blue-300 rounded-full border border-blue-800/20"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/30 border border-blue-700/30">
            <ExternalLink size={28} className="text-blue-400" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4 text-white">
            Demo Coming Soon
          </h2>
          
          <p className="text-white/70 text-lg mb-8">
            The live demo for this project is currently in development. Check back soon for a fully interactive experience!
          </p>
          
          <button 
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to portfolio</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveDemo; 