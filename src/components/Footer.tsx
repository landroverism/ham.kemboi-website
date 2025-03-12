
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ham Kemboi. All rights reserved.
        </div>
        <div className="flex gap-6">
          {[
            { icon: Github, href: "https://github.com/landroverism" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/ham-kemboi-916940260/" },
            { icon: Twitter, href: "https://twitter.com/hamkemboi/" },
            { icon: Mail, href: "mailto:kemboiham3@gmail.com" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
