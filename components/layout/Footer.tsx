"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

// GitHub SVG icon
function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// Twitter/X SVG icon
function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#050208] border-t border-white/5 overflow-hidden">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-32 rounded-full bg-violet-900/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center gap-5"
        >
          {/* Logo & tagline */}
          <motion.div variants={fadeUp} className="text-center">
            <p className="text-2xl font-black text-white tracking-wide mb-1">
              🌍 Peace &amp; Global Harmony
            </p>
            <p className="text-slate-400 text-sm">
              An interactive web experience
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          {/* Social icons (decorative) */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <a
              href="https://github.com/fstrx/sanskartf26.vercel."
              aria-label="GitHub"
              className="text-slate-500 hover:text-white transition-colors duration-200"
            >
              <GitHubIcon />
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            variants={fadeUp}
            className="text-slate-600 text-xs text-center"
          >
            &copy; 2026 DPSK Headways Club. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
