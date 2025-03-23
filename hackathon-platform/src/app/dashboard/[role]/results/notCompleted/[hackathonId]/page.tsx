"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; 
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Parameter = {
  name: string;
  score: number;
};

type Student = {
  id: number;
  name: string;
  parameters: Parameter[];
  aggregate: number;
  submission: {
    type: "text" | "audio" | "video" | "pdf";
    content: string;
    description: string;
  };
};

// Mock Data
const mockHackathonData = {
  "1": [
    {
      id: 2,
      name: "Alice Johnson",
      parameters: [
        { name: "Innovation", score: 8.5 },
        { name: "Feasibility", score: 7.0 },
        { name: "Presentation", score: 9.0 },
      ],
      aggregate: 8.17,
      submission: {
        type: "text",
        content: "Our project focuses on AI-driven healthcare solutions...",
        description: "AI-based diagnosis assistance system.",
      },
    },
    {
      id: 3,
      name: "Bob Smith",
      parameters: [
        { name: "Innovation", score: 6.5 },
        { name: "Feasibility", score: 8.0 },
        { name: "Presentation", score: 7.5 },
      ],
      aggregate: 7.33,
      submission: {
        type: "text",
        content: "We developed a blockchain-based voting system...",
        description: "Decentralized and transparent voting system.",
      },
    },
  ],
  "2": [
    {
      id: 5,
      name: "Eve Adams",
      parameters: [
        { name: "Innovation", score: 7.5 },
        { name: "Feasibility", score: 9.0 },
        { name: "Presentation", score: 8.5 },
      ],
      aggregate: 8.33,
      submission: {
        type: "text",
        content: "A self-sustaining energy project using solar and wind...",
        description: "Renewable energy for smart cities.",
      },
    },
  ],
};

export default function HackathonResults() {
  const router = useRouter();
  // const { hackathonId } = useParams();
  const { role, hackathonId } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [hackathonName, setHackathonName] = useState(`Hackathon ${hackathonId}`);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (!hackathonId) return;

    let storedHackathons = localStorage.getItem("hackathonData");
    if (!storedHackathons) {
      localStorage.setItem("hackathonData", JSON.stringify(mockHackathonData));
      storedHackathons = JSON.stringify(mockHackathonData);
    }

    const hackathonData = JSON.parse(storedHackathons);
    const hackathonStudents = hackathonData[String(hackathonId)] || [];


    setStudents(hackathonStudents);
    setLoading(false);
  }, [hackathonId]);

  if (loading) {
    return <div className="container mx-auto py-8 px-4 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="outline" className="mb-4" onClick={() => router.push("/dashboard/teacher")}>
        ← Back to Results
      </Button>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>{hackathonName} - Student Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Submission</TableHead>
                <TableHead>Aggregate Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length > 0 ? (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.submission.description}</TableCell>
                    <TableCell className="font-bold">{student.aggregate}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No students found for this hackathon.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
