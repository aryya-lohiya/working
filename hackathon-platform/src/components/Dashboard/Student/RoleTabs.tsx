// components/Dashboard/Student/RoleTabs.tsx
"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RoleTabsProps {
  activeTab: "hackathons" | "teachers";
  onTabChange: (value: "hackathons" | "teachers") => void;
}

export const RoleTabs = ({ activeTab, onTabChange }: RoleTabsProps) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={(value) => onTabChange(value as "hackathons" | "teachers")}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
        <TabsTrigger value="teachers">Teachers</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};