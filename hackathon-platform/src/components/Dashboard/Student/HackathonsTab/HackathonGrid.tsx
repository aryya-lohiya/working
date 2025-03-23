"use client";

import { useRouter } from "next/navigation";
import { HackathonCard } from "@/components/shared/HackathonCard";

interface HackathonGridProps {
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

export const HackathonGrid = ({ hackathons }: HackathonGridProps) => {
  const router = useRouter();

  const handleCardClick = (id: number) => {
    router.push(`/hackathons/${id}`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {hackathons.map((hackathon) => (
        <HackathonCard
          key={hackathon.id}
          {...hackathon}
          onClick={() => handleCardClick(hackathon.id)}
          
        />
      ))}

      {hackathons.length === 0 && (
        <div className="col-span-full py-8 text-center text-muted-foreground">
          No hackathons found in this category
        </div>
      )}
    </div>
  );
};
