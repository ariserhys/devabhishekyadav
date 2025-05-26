import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'New Portfolio Contact Form Submission',
    honeypot: '', // Anti-spam field
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If the honeypot field is filled, it's likely a bot
    if (formState.honeypot) {
      // Pretend submission was successful to fool bots
      setStatus('success');
      setResponseMessage('Your message has been sent successfully!');
      return;
    }

    try {
      setStatus('submitting');
      
      const formData = new FormData();
      // Add Web3Forms access key
      formData.append('access_key', 'd90164fa-64b5-49ae-91aa-b03bcb1f8afe');
      
      // Add form fields
      Object.entries(formState).forEach(([key, value]) => {
        if (key !== 'honeypot') {
          formData.append(key, value);
        }
      });
      
      // Send data to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Reset form
        setFormState({
          name: '',
          email: '',
          message: '',
          subject: 'New Portfolio Contact Form Submission',
          honeypot: '',
        });
        
        setStatus('success');
        setResponseMessage('Your message has been sent successfully! I will get back to you soon.');
      } else {
        throw new Error(data.message || 'Something went wrong!');
      }
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setResponseMessage('');
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setResponseMessage('Oops! Something went wrong. Please try again later.');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setResponseMessage('');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-32 relative bg-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.15),transparent_70%)]"></div>
      
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
            GET IN TOUCH
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">Connect</span>
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Have a project in mind or want to discuss potential collaborations? I'd love to hear from you.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-medium mb-1">Email</h4>
                    <a href="mailto:aiamyaduvanshi@gmail.com" className="text-white/70 hover:text-white transition-colors">
                      aiamyaduvanshi@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-medium mb-1">Phone</h4>
                    <a href="tel:+919109435440" className="text-white/70 hover:text-white transition-colors">
                      +91 9109435440
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-medium mb-1">Location</h4>
                    <p className="text-white/70">
                      Indore (M.P), India
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-white text-lg font-medium mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/ariserhys" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-lg text-white/70 hover:text-white hover:bg-gray-700 transition-all duration-300"
                    aria-label="Visit my GitHub profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"></path>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/abhishek-yadav-40b513364/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-lg text-white/70 hover:text-white hover:bg-gray-700 transition-all duration-300"
                    aria-label="Visit my LinkedIn profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a 
                    href="https://x.com/aiamyaduvanshi" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-lg text-white/70 hover:text-white hover:bg-gray-700 transition-all duration-300"
                    aria-label="Visit my X (Twitter) profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/iamyaduvanshi" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-lg text-white/70 hover:text-white hover:bg-gray-700 transition-all duration-300"
                    aria-label="Visit my Instagram profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden field for Web3Forms access key */}
                <input type="hidden" name="access_key" value="d90164fa-64b5-49ae-91aa-b03bcb1f8afe" />
                <input type="hidden" name="subject" value={formState.subject} />
                <input type="hidden" name="from_name" value="Portfolio Contact Form" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your Name"
                      required
                      disabled={status === 'submitting'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                    Your Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formState.message}
                    onChange={handleChange}
                    rows={6} 
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Hi, I'd like to talk about..."
                    required
                    disabled={status === 'submitting'}
                  ></textarea>
                </div>
                
                {/* Hidden honeypot field to prevent spam submissions */}
                <div className="hidden">
                  <input
                    type="text"
                    name="honeypot"
                    value={formState.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    className={`px-8 py-4 rounded-full text-white font-medium text-lg w-full md:w-auto flex items-center justify-center transition-all duration-300 ${
                      status === 'submitting' 
                      ? 'bg-gray-700 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                    }`}
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>
                </div>
                
                {responseMessage && (
                  <div className={`mt-4 p-4 rounded-lg ${status === 'success' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {responseMessage}
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;