'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const socialLinks = [
  {
    platform: 'GitHub',
    url: 'https://github.com/PILOT-SHARMA',
    icon: FaGithub,
    hoverColor: 'hover:border-gray-400/50 hover:shadow-gray-500/20',
    glowColor: 'group-hover:from-gray-500/40 group-hover:to-gray-600/40',
    iconHover: 'group-hover:text-white',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/arpit-sharma-86246b337/',
    icon: FaLinkedinIn,
    hoverColor: 'hover:border-blue-400/50 hover:shadow-blue-500/20',
    glowColor: 'group-hover:from-blue-500/40 group-hover:to-blue-600/40',
    iconHover: 'group-hover:text-blue-400',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/_.shiks.___/',
    icon: FaInstagram,
    hoverColor: 'hover:border-pink-400/50 hover:shadow-pink-500/20',
    glowColor: 'group-hover:from-pink-500/40 group-hover:to-purple-600/40',
    iconHover: 'group-hover:text-pink-400',
  },
  {
    platform: 'WhatsApp',
    url: 'https://wa.me/918077217921',
    icon: FaWhatsapp,
    hoverColor: 'hover:border-green-400/50 hover:shadow-green-500/20',
    glowColor: 'group-hover:from-green-500/40 group-hover:to-emerald-600/40',
    iconHover: 'group-hover:text-green-400',
  },
  {
    platform: 'Email',
    url: 'mailto:arpitsharma1790@gmail.com',
    icon: MdEmail,
    hoverColor: 'hover:border-cyan-400/50 hover:shadow-cyan-500/20',
    glowColor: 'group-hover:from-cyan-500/40 group-hover:to-blue-600/40',
    iconHover: 'group-hover:text-cyan-400',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset success state after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-[128px]" />
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            <span className="text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text">
              Get In Touch
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
          <p className="mt-4 text-gray-400">
            Have a project in mind? Let&apos;s work together
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-violet-600/30 to-cyan-600/30 opacity-50 blur-md" />
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="mb-6 text-xl font-semibold text-white">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="group relative">
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-gray-400"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-all duration-300 focus:border-violet-500/50 focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(139,92,246,0.15)] focus:ring-1 focus:ring-violet-500/30"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div className="group relative">
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-all duration-300 focus:border-violet-500/50 focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(139,92,246,0.15)] focus:ring-1 focus:ring-violet-500/30"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message */}
                <div className="group relative">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-gray-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 outline-none transition-all duration-300 focus:border-violet-500/50 focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(139,92,246,0.15)] focus:ring-1 focus:ring-violet-500/30"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Success Toast */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400"
                  >
                    <svg
                      className="h-5 w-5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-4"
          >
            <h3 className="mb-2 text-xl font-semibold text-white">Connect With Me</h3>

            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className={`group relative flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 ${link.hoverColor} hover:bg-white/[0.08]`}
                >
                  {/* Icon glow */}
                  <div
                    className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r from-transparent to-transparent ${link.glowColor} opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-40`}
                  />

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors duration-300 group-hover:bg-white/10">
                    <Icon
                      className={`text-xl text-gray-400 transition-colors duration-300 ${link.iconHover}`}
                    />
                  </div>

                  <div className="relative">
                    <p className="font-semibold text-white">{link.platform}</p>
                    <p className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
                      {link.url.replace(/^(https?:\/\/|mailto:)/, '')}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="relative ml-auto h-5 w-5 text-gray-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
