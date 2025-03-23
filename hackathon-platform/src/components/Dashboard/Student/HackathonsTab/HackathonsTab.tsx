// components/Dashboard/Student/HackathonsTab/HackathonsTab.tsx
"use client";
import { useState } from "react";
import { HackathonSubTabs } from "./HackathonSubTabs";
import { HackathonGrid } from "./HackathonGrid";

interface HackathonsTabProps {
  hackathons: Array<{
    id: number;
    name: string;
    creatorId: string;
    regDeadline: string;
    subDeadline?: string;
    participants: number;
    isRegistered: boolean;
    image?: string;
  }>;
}

export const HackathonsTab = ({ hackathons }: HackathonsTabProps) => {
  const [activeSubTab, setActiveSubTab] = useState("available");

  const filteredHackathons = hackathons.filter((hackathon) => {
    switch (activeSubTab) {
      case "registered":
        return hackathon.isRegistered;
      case "available":
        return !hackathon.isRegistered;
      // Add cases for other tabs as needed
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <HackathonSubTabs 
        activeTab={activeSubTab}
        onTabChange={setActiveSubTab}
      />
      <HackathonGrid hackathons={filteredHackathons} />
    </div>
  );
};