"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Hackathon {
  name: string;
  problemStatement: string;
  registrationDeadline: string;
  submissionDeadline: string;
  tags: string[];
}

const hackathons: Record<string, Hackathon> = {
  "1": {
    name: "AI Innovation Challenge",
    problemStatement:
      "Develop an AI model that predicts energy consumption in smart cities.",
    registrationDeadline: "March 25, 2025",
    submissionDeadline: "April 10, 2025",
    tags: ["Creativity", "Feasibility", "Technical Soundness"],
  },
  "2": {
    name: "Blockchain Hackfest",
    problemStatement: "Build a decentralized identity verification system.",
    registrationDeadline: "March 28, 2025",
    submissionDeadline: "April 15, 2025",
    tags: ["Security", "Innovation", "Scalability"],
  },
};

const HackathonDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const hackathon = hackathons[params.id];

  if (!hackathon) return notFound();

  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      toast.error("Please upload a file before submitting.");
      return;
    }

    console.log("Submission Details:", {
      fileName: file.name,
      altText,
    });

    toast.success("Successfully submitted!");

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push("/dashboard/student");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold">{hackathon.name} : Submission</h1>
      <p className="mt-2 text-gray-600">{hackathon.problemStatement}</p>

      <div className="mt-4 text-sm text-gray-500">
        <p>
          <strong>Registration Deadline:</strong> {hackathon.registrationDeadline}
        </p>
        <p>
          <strong>Submission Deadline:</strong> {hackathon.submissionDeadline}
        </p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Judgement Criteria</h2>
        <div className="flex gap-2 mt-2">
          {hackathon.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Label className="block text-sm font-medium">Upload Submission</Label>
        <Input
          type="file"
          accept=".pdf,.docx,.mp4,.mp3,.wav,.jpg,.png"
          onChange={handleFileChange}
          className="mt-2"
        />
      </div>

      <div className="mt-4">
        <Label className="block text-sm font-medium">Alternate Text</Label>
        <Textarea
          placeholder="Describe your submission (optional)"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          className="mt-2"
        />
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline"  onClick={() => router.push("/dashboard/student")}>
          Back to Dashboard
        </Button>
        <Button onClick={handleSubmit} className="ml-2 bg-black text-white">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default HackathonDetail;
