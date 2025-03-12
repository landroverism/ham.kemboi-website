
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data/experiences';

const AboutSection: React.FC = () => {
  const [activeExperience, setActiveExperience] = useState(6);
  
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex items-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <hr className="w-12 border-primary" />
          <span className="text-primary">About Me</span>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold">Skills</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Languages, Frameworks, and Databases</h4>
                <div className="flex flex-wrap gap-2">
                  {["Flask", "JavaScript", "TypeScript", "Python", "Vue", "React", "Node.js", "Django", "PostgreSQL", "NextJS"].map((skill) => (
                    <motion.span
                      key={skill}
                      className="skill-chip"
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Cloud, and Other Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {["AWS", "Docker", "Git", "CI/CD", "Linux", "REST APIs", "GraphQL"].map((skill) => (
                    <motion.span
                      key={skill}
                      className="skill-chip"
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-8">Experience</h3>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-700 mb-4 md:mb-0">
                {experiences.map((exp) => (
                  <motion.button
                    key={exp.id}
                    className={`block w-full text-left px-4 py-3 transition-colors ${
                      activeExperience === exp.id
                        ? "text-primary bg-primary/10"
                        : "hover:bg-primary/5"
                    }`}
                    onClick={() => setActiveExperience(exp.id)}
                    whileHover={{ x: 5 }}
                  >
                    {exp.company}
                  </motion.button>
                ))}
              </div>
              <div className="w-full md:w-2/3 p-4">
                {experiences.map((exp) => (
                  <motion.div
                    key={exp.id}
                    className={`space-y-4 ${
                      activeExperience === exp.id ? "block" : "hidden"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-xl font-bold">{exp.role}</h4>
                    <p className="text-muted-foreground">{exp.timeline}</p>
                    <p className="text-gray-300">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
