"use client";

import dynamic from "next/dynamic";

// ssr: false must live inside a Client Component (Next.js 16 restriction)
const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0d0010] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-violet-500/40 border-t-violet-400 animate-spin" />
    </div>
  ),
});

export default function HeroLoader() {
  return <Hero />;
}
