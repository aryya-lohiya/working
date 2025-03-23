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
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      <div className="flex border-b">
        <button
          className={`flex-1 text-center py-2  border-b-2 border-black font-bold`}
          
        >
          Hackathons
        </button>
      </div>
      <HackathonsTab hackathons={hackathons} />
    </div>
  );
};
