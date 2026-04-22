"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/content";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import Button from "@/components/ui/Button";
import Glyph from "@/components/ui/Glyph";

export default function Navbar() {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const isLight = theme === "light";
  const navText = isLight ? "text-slate-700 hover:text-slate-950" : "text-slate-400 hover:text-white";
  const activeText = isLight ? "text-slate-950" : "text-white";
  const navGroupSurface = isLight
    ? "border border-slate-900/10 bg-white/76 shadow-[0_18px_38px_-24px_rgba(15,23,42,0.24)]"
    : "border border-white/10 bg-slate-950/42 shadow-[0_18px_42px_-28px_rgba(0,0,0,0.45)]";
  const navLinkChip = isLight
    ? "border border-transparent bg-white/56 hover:bg-white/82"
    : "border border-transparent bg-white/[0.03] hover:bg-white/[0.08]";
  const navActiveOutline = isLight
    ? "border border-slate-900/14 bg-white shadow-[0_12px_30px_-22px_rgba(15,23,42,0.24)]"
    : "border border-cyan-300/18 bg-white/[0.08] shadow-[0_12px_30px_-22px_rgba(34,211,238,0.18)]";
  const logoText = isLight ? "text-slate-950" : "text-white";
  const mobileButtonBg = isLight
    ? "border border-slate-900/10 bg-white/76 shadow-[0_16px_34px_-24px_rgba(15,23,42,0.35)] hover:bg-white"
    : "border border-white/10 bg-white/5 hover:bg-white/10";
  const mobileBurger = isLight ? "bg-slate-900" : "bg-white";
  const mobileMenuSurface = isLight
    ? "rgba(245, 242, 236, 0.94)"
    : "rgba(5, 2, 12, 0.97)";

  // Scroll listener for navbar style change
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled && isLight ? "shadow-none" : ""
        }`}
        animate={{
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <a
              href="#hero"
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 backdrop-blur-xl transition-all duration-300 ${navGroupSurface}`}
              onClick={closeMenu}
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${isLight ? "border-slate-900/10 bg-slate-950/[0.03] text-slate-950" : "border-white/10 bg-white/[0.03] text-white"}`}>
                <Glyph name="harmony" className="h-4 w-4" title="Harmony" />
              </span>
              <span className={`font-black tracking-widest text-sm uppercase ${logoText}`}>
                HARMONY
              </span>
            </a>

            {/* Desktop nav links */}
            <nav className={`hidden lg:flex items-center gap-2 rounded-full px-2 py-2 backdrop-blur-xl ${navGroupSurface}`} aria-label="Main navigation">
              {navLinks.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-250 ${navLinkChip} ${
                      isActive
                        ? activeText
                        : navText
                    }`}
                  >
                    {isActive && (
                      <>
                        <motion.span
                          layoutId="nav-pill-fill"
                          className="absolute inset-0 rounded-full"
                          style={{ background: isLight ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.04)" }}
                          transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.8 }}
                        />
                        <motion.span
                          layoutId="nav-pill-outline"
                          className={`absolute inset-0 rounded-full ${navActiveOutline}`}
                          transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.8 }}
                        />
                      </>
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className={`hidden lg:flex items-center gap-3 rounded-full px-3 py-2 backdrop-blur-xl ${navGroupSurface}`}>
              <ThemeToggle />
              <Button href="#cta" variant="secondary">
                Take Action
              </Button>
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle compact className="px-2.5" />
              <button
                className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl transition-colors duration-200 ${mobileButtonBg}`}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className={`block w-5 h-0.5 rounded-full origin-center ${mobileBurger}`}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className={`block w-5 h-0.5 rounded-full ${mobileBurger}`}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className={`block w-5 h-0.5 rounded-full origin-center ${mobileBurger}`}
                  transition={{ duration: 0.25 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2.5rem) 2rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{
              background: mobileMenuSurface,
              backdropFilter: "blur(20px)",
            }}
          >
            <nav className="flex flex-col items-center gap-2 w-full max-w-xs px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-3"
              >
                <ThemeToggle />
              </motion.div>

              {navLinks.map((link, i) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.4 }}
                    onClick={closeMenu}
                    className={`w-full text-center py-3.5 rounded-xl font-semibold text-lg transition-colors duration-200 ${
                      isActive
                        ? isLight
                          ? "bg-white text-slate-950 shadow-[0_18px_36px_-28px_rgba(15,23,42,0.32)] ring-1 ring-slate-900/8"
                          : "text-white bg-white/10"
                        : isLight
                          ? "text-slate-700 hover:bg-white/80 hover:text-slate-950"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.07, duration: 0.4 }}
                className="w-full mt-4"
              >
                <Button href="#cta" variant="secondary" className="w-full">
                  Take Action
                </Button>
              </motion.div>
            </nav>

            {/* Decorative */}
            <div className={`absolute bottom-12 flex items-center gap-2 text-xs tracking-[0.24em] uppercase ${isLight ? "text-slate-500" : "text-slate-600"}`}>
              <Glyph name="harmony" className="h-3.5 w-3.5" />
              <span>Peace &amp; Global Harmony</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
