'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp, FaHeart, FaChevronUp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/PILOT-SHARMA', label: 'GitHub', color: 'hover:text-white' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/arpit-sharma-86246b337/', label: 'LinkedIn', color: 'hover:text-blue-400' },
  { icon: FaInstagram, href: 'https://www.instagram.com/_.shiks.___/', label: 'Instagram', color: 'hover:text-pink-400' },
  { icon: FaWhatsapp, href: 'https://wa.me/918077217921', label: 'WhatsApp', color: 'hover:text-green-400' },
  { icon: MdEmail, href: 'mailto:arpitsharma1790@gmail.com', label: 'Email', color: 'hover:text-cyan-400' },
];

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-3">
              Arpit Sharma
            </h3>
            <p className="text-sm text-gray-400 max-w-xs">
              BTech CS(AIML) Student passionate about building innovative solutions with AI/ML and modern web technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-violet-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            © {new Date().getFullYear()} Arpit Sharma. Made with
            <FaHeart className="text-red-500 text-[10px] animate-pulse" />
            using Next.js
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-gray-500 hover:text-violet-400 transition-colors duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Top
            <span className="p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-violet-500/50 group-hover:bg-violet-500/10 transition-all duration-300">
              <FaChevronUp size={10} />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
