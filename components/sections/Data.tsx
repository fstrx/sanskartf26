"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { dataStats, Stat } from "@/lib/content";
import { fadeUp, staggerContainer, scaleIn, viewportConfig } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Count-up hook using requestAnimationFrame
function useCountUp(
  end: number,
  duration: number,
  shouldStart: boolean
): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldStart) return;

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, shouldStart]);

  return count;
}

interface StatCardProps {
  stat: Stat;
}

function StatCard({ stat }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(stat.value, 2.2, isInView);

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      className="relative group rounded-2xl border border-white/8 p-6 lg:p-8 overflow-hidden transition-all duration-300"
      style={{
        background: "rgba(2, 13, 8, 0.7)",
        backdropFilter: "blur(12px)",
      }}
      whileHover={{
        borderColor: stat.color + "60",
        boxShadow: `0 0 28px ${stat.color}25, 0 0 0 1px ${stat.color}30`,
        scale: 1.02,
        transition: { duration: 0.25 },
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
      />

      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${stat.color}0f 0%, transparent 70%)`,
        }}
      />

      {/* Number */}
      <div className="relative z-10 mb-3">
        <span
          className="text-5xl sm:text-6xl font-black tabular-nums leading-none"
          style={{ color: stat.color }}
        >
          {count.toLocaleString()}
        </span>
        <span
          className="text-3xl font-bold ml-1"
          style={{ color: stat.color + "cc" }}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <h3 className="relative z-10 text-white font-bold text-base mb-2 leading-snug">
        {stat.label}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-slate-400 text-sm leading-relaxed">
        {stat.description}
      </p>

      {/* Bottom accent dot */}
      <div
        className="absolute bottom-4 right-4 w-2 h-2 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-300"
        style={{ background: stat.color }}
      />
    </motion.div>
  );
}

export default function Data() {
  return (
    <SectionWrapper
      id="data"
      className="min-h-screen py-24 bg-[#020d08]"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-400 mb-3"
          >
            THE SCALE OF THE CHALLENGE
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            What Conflict Costs{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              and Peace Protects
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto"
          >
            These figures reveal both the damage conflict causes and the
            systems still working to contain it. The stakes are human, not
            abstract.
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {dataStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center text-slate-600 text-xs mt-12 max-w-xl mx-auto"
        >
          Sources: UNHCR, World Bank, Institute for Economics & Peace, United
          Nations, Stockholm International Peace Research Institute (SIPRI).
          Data reflects 2023-2024 estimates and is directional, not final.
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
