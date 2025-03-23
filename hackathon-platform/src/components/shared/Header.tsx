"use client"; // Required for shadcn's <Avatar>
import { Avatar } from "@/components/ui/avatar";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      {/* Logo */}
      <nav>
        <h1 className="text-lg font-semibold">HackPortal</h1>
      </nav>

      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <span className="text-sm">John Doe</span>
        <Avatar className="h-8 w-8">
          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
            <span className="text-xs font-medium">JD</span>
          </div>
        </Avatar>
      </div>
    </header>
  );
};