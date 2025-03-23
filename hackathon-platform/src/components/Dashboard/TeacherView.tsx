"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea2";
import { useRouter } from "next/navigation";

const hackathons = [
  { id: 1, name: "AI Innovation Challenge", creatorId: "t_001", participants: 142, status: "Results to be Announced", subDeadline: "Mar 15" },
  { id: 2, name: "Blockchain Hack", creatorId: "t_002", participants: 89, status: "Results to be Announced", subDeadline: "Mar 18" },
  { id: 3, name: "Climate Tech Showdown", creatorId: "t_003", participants: 204, status: "Completed", subDeadline: "Mar 20" },
  { id: 4, name: "Cybersecurity Challenge", creatorId: "t_004", participants: 99, status: "Results to be Announced", subDeadline: "Mar 22" },
  { id: 5, name: "Healthcare AI", creatorId: "t_005", participants: 65, status: "Completed", subDeadline: "Mar 25" }
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("hackathons");
  const [activeFilter, setActiveFilter] = useState("all");
  const [newHackathon, setNewHackathon] = useState<{
    name: string;
    description: string;
    judgingCriteria: string[];
    criterionInput: string;
    submissionDeadline: string;
  }>({
    name: "",
    description: "",
    judgingCriteria: [], // ✅ Ensure it's initialized as an array
    criterionInput: "",
    submissionDeadline: "",
  });
  

  const router = useRouter();
  const statusOrder: Record<string, number> = {
    "Results to be Announced": 1,
    "Completed": 2,
  };
  

  const filteredHackathons = hackathons
    .filter(h => activeFilter === "all" || h.status === activeFilter)
    .sort((a, b) => {
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return a.name.localeCompare(b.name);
    });

  const handleCreateHackathon = () => {
    if (!newHackathon.name || !newHackathon.submissionDeadline) {
      alert("Problem statement & submission deadline are required!");
      return;
    }
    console.log("Creating Hackathon:", newHackathon);
    alert("Hackathon Created Successfully!");
    setNewHackathon({
      name: "",
      description: "",
      judgingCriteria: [],
      criterionInput: "",
      submissionDeadline: ""
    });
  };
  
  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 text-center py-2 ${activeTab === "hackathons" ? "border-b-2 border-black font-bold" : ""}`}
          onClick={() => setActiveTab("hackathons")}
        >
          Hackathons
        </button>
      </div>

      {/* Hackathons Tab */}
      {activeTab === "hackathons" && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Create Hackathon Form */}
          <div className="lg:col-span-1 border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-4">Create Hackathon</h2>
            <Input
              type="text"
              placeholder="Problem Statement"
              value={newHackathon.name}
              onChange={(e) => setNewHackathon({ ...newHackathon, name: e.target.value })}
              className="w-full mb-2"
            />
            <Textarea
              placeholder="Description"
              value={newHackathon.description}
              onChange={(e) => setNewHackathon({ ...newHackathon, description: e.target.value })}
              className="w-full mb-2"
            />

            {/* Judging Criteria Section */}
            <div className="mb-2">
              <h3 className="text-sm font-semibold mb-1">Judging Criteria</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {newHackathon.judgingCriteria.map((criterion, index) => (
                  <div key={index} className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                    {criterion}
                  </div>
                ))}
              </div>
              <Input
                type="text"
                placeholder="Add Judging Criteria..."
                value={newHackathon.criterionInput || ""}
                onChange={(e) => setNewHackathon({ ...newHackathon, criterionInput: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newHackathon.criterionInput.trim() !== "" && newHackathon.judgingCriteria.length < 10) {
                    setNewHackathon({
                      ...newHackathon,
                      judgingCriteria: [...newHackathon.judgingCriteria, newHackathon.criterionInput.trim()],
                      criterionInput: "",
                    });
                    e.preventDefault();
                  }
                }}
                className="w-full mt-2"
              />
            </div>

            {/* Submission Deadline Section */}
            <div className="mb-2">
              <h3 className="text-sm font-semibold mb-1">Submission Deadline</h3>
              <Input
                type="date"
                placeholder="YYYY-MM-DD"
                value={newHackathon.submissionDeadline}
                onChange={(e) => setNewHackathon({ ...newHackathon, submissionDeadline: e.target.value })}
                className="w-full"
              />
            </div>

            <Button className="w-full bg-black text-white mt-2" onClick={handleCreateHackathon}>
              Create Hackathon
            </Button>
          </div>

          {/* Hackathon List */}
          <div className="col-span-3">
            <div className="flex border-b mb-4">
              {["Results to be Announced", "Completed", "all"].map(filter => (
                <button
                  key={filter}
                  className={`flex-1 text-center py-2 capitalize ${activeFilter === filter ? "border-b-2 border-black font-bold" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHackathons.map(hackathon => (
                <div
                  key={hackathon.id}
                  className="border rounded-lg p-6 shadow-md flex flex-col cursor-pointer"
                  onClick={() => {
                    if (hackathon.status === "Completed") {
                      router.push(`/dashboard/teacher/results/${hackathon.id}`);
                    } else if (hackathon.status === "Results to be Announced") {
                      router.push(`/dashboard/teacher/results/notCompleted/${hackathon.id}`);
                    }
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">{hackathon.name}</h2>
                    <p className={`text-sm font-semibold ${hackathon.status === "Results to be Announced" ? "text-green-600" : "text-blue-600"}`}>
                      {hackathon.status}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">Organizer: <span className="font-mono">{hackathon.creatorId}</span></p>
                  <p className="text-sm text-gray-600 mt-1">👥 {hackathon.participants} participants</p>
                  <p className="text-sm text-gray-600 mt-1">📅 Submission Deadline: <span className="font-semibold">{hackathon.subDeadline}</span></p>

                  <div className="mt-3 border-t pt-3 text-center font-semibold text-blue-500">
                    View details →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
