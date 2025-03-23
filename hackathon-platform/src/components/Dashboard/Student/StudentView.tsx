// components/Dashboard/Student/StudentView.tsx
"use client";
import { HackathonsTab } from "./HackathonsTab/HackathonsTab";

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
  return (
    <div className="w-full space-y-6">
      <HackathonsTab hackathons={hackathons} />
    </div>
  );
};
