

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArkLab AI Agent Directory",
  description:
    "Explore powerful AI agents for marketing, customer service, and more.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-10 text-center overflow-hidden">

      {/* 🔹 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute  top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/videos/ai_agent.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  <div className="absolute top-3 left-0 w-full h-full bg-black/50 z-[-1]" />
      {/* 🔸 Content Overlay */}
      <div className="relative z-10  p-8 rounded-xl  text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ArkLab</h1>
        <p className="text-lg md:text-xl max-w-xl text-white/90 mb-6">
          Discover and explore a curated catalog of powerful AI agents across various industries like Marketing, Development, and Customer Service.
        </p>

        <Link href="/ai-agents">
          <Button size="lg" className="text-white bg-blue-600 hover:bg-blue-700">
            View AI Agents
          </Button>
        </Link>
      </div>
    </main>
  );
}
