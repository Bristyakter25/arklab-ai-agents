"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      className="px-10 pt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
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
        <AnimatePresence>
          {filteredAgents.map((agent, index) => (
            <motion.div
  key={agent.name + index}
  initial={{ opacity: 0, scale: 0.95, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.9, y: -10 }}
  whileHover={{
    scale: 1.03,
    y: -4,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeInOut" },
  }}
  transition={{
    duration: 0.4,
    ease: "easeInOut",
    delay: index * 0.06,
  }}
>
  <Card
    className="transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 dark:border-gray-700 dark:hover:border-blue-400"
  >
    <CardHeader>
      <CardTitle className="transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-300">
        {agent.name}
      </CardTitle>
      <CardDescription>{agent.description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-1 text-sm">
      <p><strong>Status:</strong> {agent.status}</p>
      <p><strong>Category:</strong> {agent.category}</p>
      <p><strong>Pricing:</strong> {agent.pricingModel}</p>
    </CardContent>
  </Card>
</motion.div>

          ))}

          {filteredAgents.length === 0 && (
            <motion.p
              key="no-results"
              className="col-span-full text-center text-gray-500 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
               No matching agents found.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
