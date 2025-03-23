// app/dashboard/[role]/page.tsx
import { StudentView } from "@/components/Dashboard/Student/StudentView";

const mockHackathons = [
  {
    id: 1,
    name: "AI Innovation Challenge",
    creatorId: "t_001",
    regDeadline: "2024-03-15",
    subDeadline: "2024-03-25",
    participants: 142,
    isRegistered: true,
    image: "<public/black.jpg"
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

export default function DashboardPage({ params }: { params: { role: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{params.role} Dashboard</h1>
      
      {params.role === "student" && <StudentView hackathons={mockHackathons} />}
      
      {params.role === "teacher" && <div>Teacher Dashboard Content</div>}
      {params.role === "admin" && <div>Admin Dashboard Content</div>}
    </div>
  );
}