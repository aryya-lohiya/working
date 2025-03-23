// app/dashboard/[role]/page.tsx
import { HackathonCard } from "@/components/shared/HackathonCard";

const mockHackathons = [
  {
    id: 1,
    name: "AI Innovation Challenge",
    creatorId: "t_001",
    regDeadline: "2024-03-15",
    subDeadline: "2024-03-25",
    participants: 142,
    isRegistered: true,
    image: "/placeholder-hackathon.jpg"
  },
  {
    id: 2,
    name: "Blockchain Hack",
    creatorId: "t_002",
    regDeadline: "2024-03-18",
    subDeadline: "2024-03-28",
    participants: 89,
    isRegistered: false,
    image: "/placeholder-hackathon.jpg"
  },
  {
    id: 3,
    name: "Climate Tech Showdown",
    creatorId: "t_003",
    regDeadline: "2024-03-20",
    subDeadline: "2024-03-30",
    participants: 204,
    isRegistered: true,
    image: "/placeholder-hackathon.jpg"
  }
];

export default function DashboardPage({ params }: { params: { role: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{params.role} Dashboard</h1>
      
      {params.role === "student" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockHackathons.map((hackathon) => (
            <HackathonCard
              key={hackathon.id}
              {...hackathon}
            />
          ))}
        </div>
      )}
    </div>
  );
}