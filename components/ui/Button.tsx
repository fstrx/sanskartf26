"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";

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
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, { stiffness: 220, damping: 18, mass: 0.2 });
  const y = useSpring(offsetY, { stiffness: 220, damping: 18, mass: 0.2 });

  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold text-sm px-6 py-3 transition-all duration-300 cursor-pointer select-none";

  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-900/40",
    secondary:
      "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-900/40",
    ghost:
      "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm",
    outline:
      "bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/5",
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
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
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
