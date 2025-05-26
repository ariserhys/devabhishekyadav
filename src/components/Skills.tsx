import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Palette, LineChart, ArrowRight } from 'lucide-react';

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number;
  description: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: <Code size={24} />,
    skills: [
      { name: 'HTML & CSS', level: 90, description: 'Semantic markup and modern CSS with animations' },
      { name: 'JavaScript', level: 85, description: 'ES6+, TypeScript, React, Vue' },
      { name: 'React', level: 85, description: 'Hooks, Context API, Redux, NextJS' },
      { name: 'CSS Frameworks', level: 90, description: 'Tailwind CSS, Bootstrap, Material UI' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: <Server size={24} />,
    skills: [
      { name: 'Node.js', level: 80, description: 'Express, NestJS, RESTful APIs' },
      { name: 'Python', level: 75, description: 'Django, Flask, FastAPI' },
      { name: 'Databases', level: 85, description: 'MongoDB, PostgreSQL, MySQL, Redis' },
      { name: 'API Design', level: 90, description: 'RESTful, GraphQL, WebSockets' },
    ]
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    icon: <Palette size={24} />,
    skills: [
      { name: 'Design Systems', level: 85, description: 'Component libraries, style guides' },
      { name: 'User Research', level: 75, description: 'Usability testing, user interviews' },
      { name: 'Prototyping', level: 80, description: 'Figma, Adobe XD, Sketch' },
      { name: 'Visual Design', level: 85, description: 'Typography, color theory, layout' },
    ]
  },
  {
    id: 'other',
    title: 'Performance & Analytics',
    icon: <LineChart size={24} />,
    skills: [
      { name: 'Performance Optimization', level: 90, description: 'Loading time, rendering performance' },
      { name: 'SEO', level: 85, description: 'Technical SEO, content optimization' },
      { name: 'Analytics', level: 80, description: 'Google Analytics, Hotjar, user metrics' },
      { name: 'Testing', level: 75, description: 'Unit testing, integration testing, E2E testing' },
    ]
  }
];

const SkillBar: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
  return (
    <motion.div 
      className="mb-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex justify-between mb-1 items-center">
        <h4 className="text-white text-base font-medium">{skill.name}</h4>
        <span className="text-white/60 text-sm">{skill.level}%</span>
      </div>
      
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        ></motion.div>
      </div>
      
      <p className="text-white/60 text-sm mt-1">{skill.description}</p>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const activeSkills = skillCategories.find(cat => cat.id === activeCategory)?.skills || [];
  
  return (
    <section id="skills" className="py-32 relative bg-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(14,165,233,0.15),rgba(0,0,0,0)_60%)]"></div>
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-block py-1 px-4 rounded-full bg-blue-900/30 text-blue-300 border border-blue-700/30 mb-4 text-sm tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            EXPERTISE
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">Skills</span>
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A comprehensive breakdown of my technical and professional capabilities.
          </motion.p>
        </motion.div>
        
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Skill categories */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full p-5 rounded-xl text-left flex items-center justify-between transition-all duration-300 ${
                      activeCategory === category.id ? 
                        'bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-500/20' : 
                        'bg-gray-900 border border-gray-800/50 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        activeCategory === category.id ? 
                          'bg-blue-600 text-white' : 
                          'bg-gray-800 text-gray-400'
                      }`}>
                        {category.icon}
                      </div>
                      <span className="text-lg font-medium text-white">{category.title}</span>
                    </div>
                    
                    {activeCategory === category.id && (
                      <ArrowRight size={20} className="text-blue-400" />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Skills */}
          <div className="lg:col-span-3 bg-gray-800/30 rounded-xl p-8 border border-gray-700/30">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {activeSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} delay={index * 0.1} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;