import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    demo?: string;
    github?: string;
  };
}

const projects: Project[] = [
  {
    title: "KTM X-BOW Showcase",
    description: "A modern, interactive web showcase for the KTM X-BOW GT-XR, featuring stunning visuals, detailed specifications, and an immersive user experience.",
    image: "https://i.postimg.cc/Vkt4d93R/KTM-XBOW-IMAGE.png",
    tags: [
      "React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Framer Motion"
    ],
    links: {
      demo: "https://ktm-xbow-showcase.vercel.app/",
      github: "https://github.com/ariserhys/ktm-xbow-showcase.git"
    }
  },
  {
    title: "AI Study Assistant",
    description: "Tamaya is a revolutionary AI-powered study assistant that enhances learning through smart note-taking, interactive practice problems, and real-time concept explanations.",
    image: "https://i.postimg.cc/3xKSbfNc/Tamaya-AIPreview.png",
    tags: [
      "React", "TypeScript", "Vite", "Supabase", "Gemini API", "Katex", "Mermaid.js", "jspdf", "html2canvas", "Tailwind CSS", "Framer Motion", "Radix UI"
    ],
    links: {
      demo: "https://tamayaai.netlify.app/",
      github: "/?source-code=true"
    }
  },
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with custom product configurations, real-time inventory tracking, and integrated payment solutions.",
    image: "https://i.postimg.cc/Wb6SgRjH/New-Vision-Ecommerce-Website.png",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    links: {
      demo: "/?live-demo=true&demo-project=E-Commerce Platform",
      github: "/?source-code=true"
    }
  },
  {
    title: "SEO Analytics Dashboard",
    description: "Real-time SEO analytics platform with custom reporting, competitor analysis, and automated content optimization suggestions.",
    image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
    links: {
      demo: "/?live-demo=true&demo-project=SEO Analytics Dashboard",
      github: "/?source-code=true"
    }
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    // Only add 3D effect on devices that support hover
    if (window.matchMedia('(hover: hover)').matches) {
      // To prevent cursor locking on cards
      let isHovering = false;
      
      const handleMouseEnter = () => {
        isHovering = true;
      };
      
      const handleMouseLeave = () => {
        isHovering = false;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      };
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!isHovering) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Reduced effect for more subtle rotation
        const rotateY = (x - centerX) / 30;
        const rotateX = (centerY - y) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };
      
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  // Handle navigation without triggering loading effects
  const handleNavigation = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    window.history.pushState({}, '', url);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <motion.div 
      className="group h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px 0px" }}
    >
      <div 
        ref={cardRef}
        className="bg-gradient-to-br from-gray-900 to-black border border-blue-900/20 rounded-xl overflow-hidden h-full transition-all duration-500 hover:border-blue-500/30 shadow-xl shadow-blue-900/5 hover:shadow-blue-500/10 will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="overflow-hidden relative h-48 sm:h-56">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${project.image})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        </div>
        
        <div className="p-4 sm:p-6 relative">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-blue-300 transition-all duration-300">
            {project.title}
          </h3>
          
          <p className="text-white/70 mb-4 sm:mb-6 line-clamp-3 text-sm sm:text-base">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {project.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-2 sm:px-3 py-1 text-xs font-medium bg-blue-900/20 text-blue-300 rounded-full border border-blue-800/20"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-4">
            {project.links.demo && (
              project.links.demo.startsWith('http') ? (
                <a 
                  href={project.links.demo}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300 py-2 touch-manipulation"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              ) : (
                <button 
                  onClick={(e) => handleNavigation(e, project.links.demo!)}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer py-2 touch-manipulation"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </button>
              )
            )}
            
            {project.links.github && (
              project.links.github.startsWith('http') ? (
                <a 
                  href={project.links.github}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300 py-2 touch-manipulation"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code of ${project.title}`}
                >
                  <Github size={16} />
                  <span>Source Code</span>
                </a>
              ) : (
                <button 
                  onClick={(e) => handleNavigation(e, "/?source-code=true")}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer py-2 touch-manipulation"
                  aria-label={`View source code of ${project.title}`}
                >
                  <Github size={16} />
                  <span>Source Code</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Work: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.2),transparent_60%)]"></div>
      
      <div 
        ref={ref}
        className="container mx-auto px-4 sm:px-6 relative"
      >
        <motion.div
          style={{ y }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span 
            className="inline-block py-1 px-4 rounded-full bg-blue-900/30 text-blue-300 border border-blue-700/30 mb-3 sm:mb-4 text-xs sm:text-sm tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            SELECTED PROJECTS
          </motion.span>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">Work</span>
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-base sm:text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A showcase of my best projects, spanning various technologies and industries.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;