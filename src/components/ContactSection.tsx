
import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div 
          className="flex items-center justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <hr className="w-12 border-primary" />
          <span className="text-primary">What's Next?</span>
        </motion.div>

        <motion.div 
          className="max-w-2xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold">Drop Me a Line</h2>
          <p className="text-gray-300">
            Whether it is to check in, say hi, or contract my services for a gig,
            you can reach me any time. Looking forward to working with you.
          </p>
          <motion.a
            href="mailto:kemboiham3@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary rounded-lg text-primary-foreground hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Email Me
            <Mail className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
