import path from "path";
import fs from "fs/promises";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type Agent = {
  name: string;
  description: string;
  status: string;
  category: string;
  pricingModel: string;
};

export default async function AiAgentsPage() {
  // ✅ Simulate network delay (SSR style)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // ✅ Read from the mock JSON file (located in public/data/)
  const filePath = path.join(process.cwd(), "public", "data", "mock-agents.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const agents: Agent[] = JSON.parse(jsonData);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {agents.map((agent, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{agent.name}</CardTitle>
            <CardDescription>{agent.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Status:</strong> {agent.status}</p>
            <p><strong>Category:</strong> {agent.category}</p>
            <p><strong>Pricing:</strong> {agent.pricingModel}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
