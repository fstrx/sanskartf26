"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, { stiffness: 220, damping: 18, mass: 0.2 });
  const y = useSpring(offsetY, { stiffness: 220, damping: 18, mass: 0.2 });

  const base =
    "theme-button group relative inline-flex items-center justify-center overflow-hidden rounded-full border text-sm font-semibold px-6 py-3 transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2";

  const variants: Record<string, string> = isLight
    ? {
        primary:
          "border-violet-500/70 bg-gradient-to-r from-violet-600 to-sky-600 text-white shadow-[0_18px_38px_-20px_rgba(124,58,237,0.55)] hover:from-violet-500 hover:to-sky-500 focus-visible:ring-offset-[#f6f4ef]",
        secondary:
          "border-emerald-500/70 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_38px_-20px_rgba(5,150,105,0.5)] hover:from-emerald-500 hover:to-teal-500 focus-visible:ring-offset-[#f6f4ef]",
        ghost:
          "border-slate-900/10 bg-white/82 text-slate-900 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.35)] backdrop-blur-md hover:bg-white",
        outline:
          "border-slate-900/14 bg-white/56 text-slate-900 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.28)] backdrop-blur-md hover:border-slate-900/22 hover:bg-white/76",
      }
    : {
        primary:
          "border-violet-500/30 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-900/40 focus-visible:ring-offset-[#050208]",
        secondary:
          "border-emerald-500/30 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/40 focus-visible:ring-offset-[#050208]",
        ghost:
          "border-white/18 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm focus-visible:ring-offset-[#050208]",
        outline:
          "border-white/40 bg-transparent text-white hover:border-white hover:bg-white/5 focus-visible:ring-offset-[#050208]",
      };

  const classes = `${base} ${variants[variant]} ${className}`;

  const motionProps = useMemo(() => ({
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.18 },
  }), []);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const moveX = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
    const moveY = ((event.clientY - rect.top) / rect.height - 0.5) * 14;

    offsetX.set(moveX);
    offsetY.set(moveY);
  }

  function handlePointerLeave() {
    offsetX.set(0);
    offsetY.set(0);
  }

  const content = (
    <>
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-variant={variant}
          className={classes}
          style={{ x, y }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          {...motionProps}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div
        style={{ x, y }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...motionProps}
      >
        <Link href={href} className={classes} data-variant={variant}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      data-variant={variant}
      className={classes}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
