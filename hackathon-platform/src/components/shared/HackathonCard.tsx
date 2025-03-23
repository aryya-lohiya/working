// components/shared/HackathonCard.tsx
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarDays, Users } from "lucide-react";

type HackathonCardProps = {
  name: string;
  creatorId: string;
  regDeadline: string;
  subDeadline?: string;
  participants: number;
  isRegistered: boolean;
  image?: string;
};

export const HackathonCard = ({
  name,
  creatorId,
  regDeadline,
  subDeadline,
  participants,
  isRegistered,
  image
}: HackathonCardProps) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold truncate">{name}</h3>
          <span 
            className={cn(
              "px-2 py-1 text-xs rounded-full",
              isRegistered 
                ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400"
                : "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400"
            )}
          >
            {isRegistered ? "Registered" : "Open"}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Organizer:</span>
            <span className="font-mono text-xs">{creatorId}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{participants.toLocaleString()} participants</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            <span>
              Reg. by {new Date(regDeadline).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        <div className="pt-2 border-t">
          <button className="w-full text-sm font-medium text-primary hover:underline">
            {isRegistered ? "View details →" : "Learn more →"}
          </button>
        </div>
      </div>
    </Card>
  );
};