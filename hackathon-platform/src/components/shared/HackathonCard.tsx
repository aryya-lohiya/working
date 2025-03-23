// components/shared/HackathonCard.tsx
import { Card } from "@/components/ui/card";

type HackathonCardProps = {
  id: number;
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
    <Card className="overflow-hidden h-full flex flex-col">
      {/* Image Section - Top Half */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-sm">Hackathon Logo</span>
          </div>
        )}
      </div>

      {/* Content Section - Bottom Half */}
      <div className="p-4 flex-1">
        <h3 className="font-medium text-lg mb-2">{name}</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Creator ID:</span>
            <span className="font-mono">{creatorId}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Participants:</span>
            <span>{participants.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Reg. Deadline:</span>
            <span>{new Date(regDeadline).toLocaleDateString()}</span>
          </div>
          
          {isRegistered && subDeadline && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sub. Deadline:</span>
              <span>{new Date(subDeadline).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <div className="mt-4 text-sm font-medium">
          {isRegistered ? (
            <span className="text-green-600">✓ Registered</span>
          ) : (
            <span className="text-red-600">✗ Registration Open</span>
          )}
        </div>
      </div>
    </Card>
  );
};