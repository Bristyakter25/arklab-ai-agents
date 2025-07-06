import path from "path";
import fs from "fs/promises";
import ClientFilter from "@/components/ClientFilter";

export default async function AiAgentsPage() {
  const filePath = path.join(process.cwd(), "public", "data", "mock-agents.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const agents = JSON.parse(jsonData);

  return <ClientFilter agents={agents} />;
}
