import React from 'react';
import { motion } from 'framer-motion';
import { Code, Clock, Users, Award } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: <Clock size={24} />,
    value: "2+",
    label: "Years Experience"
  },
  {
    icon: <Code size={24} />,
    value: "15+",
    label: "Projects Completed"
  },
  {
    icon: <Users size={24} />,
    value: "10+",
    label: "Happy Clients"
  },
  {
    icon: <Award size={24} />,
    value: "7+",
    label: "Certificates"
  }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 relative bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.15),transparent_70%)]"></div>
      
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
            WHO I AM
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">Me</span>
          </motion.h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-6">
              <p className="text-white/80 text-lg leading-relaxed">
                I'm a passionate Full Stack Developer with extensive experience in creating modern web applications. I specialize in building responsive, accessible, and performance-optimized applications that deliver exceptional user experiences.
              </p>
              
              <p className="text-white/80 text-lg leading-relaxed">
                With a strong foundation in both frontend and backend technologies, I enjoy working across the entire development stack to create cohesive, efficient solutions that help businesses achieve their goals and connect with their audiences.
              </p>
              
              <p className="text-white/80 text-lg leading-relaxed">
                I'm constantly learning and experimenting with new technologies to stay at the cutting edge of web development. My approach combines technical expertise with creative problem-solving to deliver results that exceed expectations.
              </p>
              
              <div className="pt-6">
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white rounded-full inline-flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 font-medium"
                >
                  <span>Get In Touch</span>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-900/80 backdrop-blur-sm border border-blue-900/20 p-6 rounded-xl flex flex-col items-center text-center hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400 mb-4">
                    {stat.icon}
                  </div>
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 mb-2">{stat.value}</span>
                  <span className="text-white/70">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;