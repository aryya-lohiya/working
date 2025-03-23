// components/Dashboard/Student/StudentView.tsx
"use client";
import { useState } from "react";
import { RoleTabs } from "./RoleTabs";
import { HackathonsTab } from "./HackathonsTab/HackathonsTab";
import { TeachersTab } from "./TeachersTab/TeachersTab";

interface StudentViewProps {
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

export const StudentView = ({ hackathons }: StudentViewProps) => {
  const [activeTab, setActiveTab] = useState<"hackathons" | "teachers">("hackathons");

  return (
    <div className="space-y-6">
      <RoleTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === "hackathons" && <HackathonsTab hackathons={hackathons} />}
      {activeTab === "teachers" && <TeachersTab />}
    </div>
  );
};