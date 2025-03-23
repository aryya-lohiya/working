// src/app/dashboard/layout.tsx
import { Header } from "@/components/shared/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4">{children}</div>
    </div>
  );
}