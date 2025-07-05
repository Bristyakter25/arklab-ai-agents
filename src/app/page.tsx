import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "ArkLab AI Agent Directory",
  description: "Explore powerful AI agents for marketing, customer service, and more.",
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ArkLab</h1>
      <p className="text-lg md:text-xl max-w-xl text-muted-foreground mb-6">
        Discover and explore a curated catalog of powerful AI agents across various industries like Marketing, Development, and Customer Service.
      </p>

      <Link href="/ai-agents">
        <Button size="lg">View AI Agents</Button>
      </Link>
    </main>
  );
}
