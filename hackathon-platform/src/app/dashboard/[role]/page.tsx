"use client"; 

import { useParams } from "next/navigation";
import { StudentView } from "@/components/Dashboard/Student/StudentView";
import TeacherDashboard from "@/components/Dashboard/TeacherView";
import AdminDashboard from "@/components/Dashboard/AdminView";

const mockHackathons = [
  {
    id: 1,
    name: "AI Innovation Challenge",
    creatorId: "t_001",
    regDeadline: "2024-03-15",
    subDeadline: "2024-03-25",
    participants: 142,
    isRegistered: true,
    image: "public/black.jpg"
  },
  {
    id: 2,
    name: "Blockchain Hack",
    creatorId: "t_002",
    regDeadline: "2024-03-18",
    subDeadline: "2024-03-28",
    participants: 89,
    isRegistered: false,
    image: "public/black.jpg"
  },
  {
    id: 3,
    name: "Climate Tech Showdown",
    creatorId: "t_003",
    regDeadline: "2024-03-20",
    subDeadline: "2024-03-30",
    participants: 204,
    isRegistered: true,
    image: "public/black.jpg"
  }
];

export default function DashboardPage() {
  const params = useParams(); 

  if (!params?.role) return <div>Loading...</div>; 

  return (
    <div>
      {params.role === "student" && <StudentView hackathons={mockHackathons} />}
      {params.role === "teacher" && <TeacherDashboard />}
      {params.role === "admin" && <div>Admin Dashboard Content</div>}
    </div>
  );
}
