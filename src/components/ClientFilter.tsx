"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

type Agent = {
  name: string;
  description: string;
  status: string;
  category: string;
  pricingModel: string;
};

type Props = {
  agents: Agent[];
};

const statuses = ["Active", "Beta", "Archived"];
const categories = ["Customer Service", "Marketing", "Development"];
const pricingModels = ["Free Tier", "Subscription", "Per-Use"];

export default function ClientFilter({ agents }: Props) {
  const [search, setSearch] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string>("");


  const handleCheckboxChange = (
    value: string,
    type: "status" | "category"
  ): void => {
    if (type === "status") {
      setSelectedStatuses((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setSelectedCategories((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedStatuses([]);
    setSelectedCategories([]);
    setSelectedPricing("");
  };

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(search.toLowerCase()) ||
        agent.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(agent.status);

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(agent.category);

      const matchesPricing =
        selectedPricing === "" || agent.pricingModel === selectedPricing;

      return matchesSearch && matchesStatus && matchesCategory && matchesPricing;
    });
  }, [agents, search, selectedStatuses, selectedCategories, selectedPricing]);

  return (
    <div className="p-6">
      {/* Search */}
      <Input
        type="text"
        placeholder="Search by name or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Status Filter */}
        <div>
          <h3 className="font-semibold mb-2">Status</h3>
          {statuses.map((status) => (
            <label key={status} className="flex items-center gap-2 mb-1">
              <Checkbox
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => handleCheckboxChange(status, "status")}
              />
              {status}
            </label>
          ))}
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="font-semibold mb-2">Category</h3>
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 mb-1">
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => handleCheckboxChange(cat, "category")}
              />
              {cat}
            </label>
          ))}
        </div>

        {/* Pricing Model Filter */}
        <div>
  <h3 className="font-semibold mb-2">Pricing</h3>
  <RadioGroup
    value={selectedPricing}
    onValueChange={(value) => {
      setSelectedPricing((prev) => (prev === value ? "" : value));
    }}
  >
    {pricingModels.map((model) => (
      <label key={model} className="flex items-center gap-2 mb-1">
        <RadioGroupItem value={model} id={model} />
        {model}
      </label>
    ))}
  </RadioGroup>
</div>

      </div>

      {/* Clear Filters Button */}
      <Button onClick={clearFilters} variant="outline" className="mb-6">
        Clear All Filters
      </Button>

      {/* Filtered Agent Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredAgents.length > 0 ? (
          filteredAgents.map((agent, index) => (
            <Card key={index}>
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
          ))
        ) : (
          <p>No matching agents found.</p>
        )}
      </div>
    </div>
  );
}
