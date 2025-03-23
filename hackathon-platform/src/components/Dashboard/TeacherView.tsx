"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const hackathons = [
  { id: 1, name: "AI Innovation Challenge", creatorId: "t_001", regDeadline: "2025-03-15", participants: 142, status: "active" },
  { id: 2, name: "Blockchain Hack", creatorId: "t_002", regDeadline: "2025-03-18", participants: 89, status: "result_to_be_announced" },
  { id: 3, name: "Climate Tech Showdown", creatorId: "t_003", regDeadline: "2025-03-10", participants: 204, status: "previous" },
  { id: 4, name: "Cybersecurity Challenge", creatorId: "t_004", regDeadline: "2025-03-22", participants: 99, status: "active" },
  { id: 5, name: "Healthcare AI", creatorId: "t_005", regDeadline: "2025-03-20", participants: 65, status: "result_to_be_announced" }
];

const students = [
  { id: "s_001", name: "Alice Johnson", organization: "MIT" },
  { id: "s_002", name: "Bob Smith", organization: "Stanford" },
  { id: "s_003", name: "Charlie Lee", organization: "Harvard" }
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("hackathons");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newHackathon, setNewHackathon] = useState({
    name: "",
    description: "",
    judgingCriteria: "",
    regDeadline: "",
    submissionDeadline: "",
    resultDate: ""
  });

  const statusOrder = { active: 1, result_to_be_announced: 2, previous: 3 };
  const filteredHackathons = hackathons
    .filter(h => activeFilter === "all" || h.status === activeFilter)
    .sort((a, b) => {
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return a.name.localeCompare(b.name);
    });

  const handleCreateHackathon = () => {
    if (!newHackathon.name || !newHackathon.regDeadline) {
      alert("Problem statement & registration deadline are required!");
      return;
    }
    console.log("Creating Hackathon:", newHackathon);
    alert("Hackathon Created Successfully!");
    setNewHackathon({
      name: "",
      description: "",
      judgingCriteria: "",
      regDeadline: "",
      submissionDeadline: "",
      resultDate: ""
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
        <button
          className={`flex-1 text-center py-2 ${activeTab === "students" ? "border-b-2 border-black font-bold" : ""}`}
          onClick={() => setActiveTab("students")}
        >
          Students
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
            <Textarea
              placeholder="Judging Criteria"
              value={newHackathon.judgingCriteria}
              onChange={(e) => setNewHackathon({ ...newHackathon, judgingCriteria: e.target.value })}
              className="w-full mb-2"
            />
            <Input
              type="date"
              placeholder="Registration Deadline"
              value={newHackathon.regDeadline}
              onChange={(e) => setNewHackathon({ ...newHackathon, regDeadline: e.target.value })}
              className="w-full mb-2"
            />
            <Input
              type="date"
              placeholder="Submission Deadline"
              value={newHackathon.submissionDeadline}
              onChange={(e) => setNewHackathon({ ...newHackathon, submissionDeadline: e.target.value })}
              className="w-full mb-2"
            />
            <Input
              type="date"
              placeholder="Date of Results"
              value={newHackathon.resultDate}
              onChange={(e) => setNewHackathon({ ...newHackathon, resultDate: e.target.value })}
              className="w-full mb-2"
            />
            <Button className="w-full bg-black text-white mt-2" onClick={handleCreateHackathon}>
              Create Hackathon
            </Button>
          </div>

          {/* Hackathon Filters */}
          <div className="col-span-3">
            <div className="flex border-b mb-4">
              {["active", "result_to_be_announced", "previous", "all"].map(filter => (
                <button
                  key={filter}
                  className={`flex-1 text-center py-2 capitalize ${activeFilter === filter ? "border-b-2 border-black font-bold" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter.replace(/_/g, " ")}
                </button>
              ))}
            </div>

            {/* Hackathon List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHackathons.map(hackathon => (
                <div key={hackathon.id} className="border rounded-lg p-6 shadow-md flex justify-between">
                  <div>
                    <h2 className="font-semibold">{hackathon.name}</h2>
                    <p className="text-sm text-gray-600">Creator ID: <span className="font-mono">{hackathon.creatorId}</span></p>
                    <p className="text-sm text-gray-600">Participants: {hackathon.participants}</p>
                    <p className="text-sm text-gray-600">Reg. Deadline: {hackathon.regDeadline}</p>
                  </div>
                  <p className={`font-bold ${hackathon.status === "active" ? "text-green-600" :
                      hackathon.status === "result_to_be_announced" ? "text-red-600" :
                      "text-blue-600"}`}>
                    {hackathon.status.replace(/_/g, " ").toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === "students" && (
        <div className="mt-6">
          <Input
            type="text"
            placeholder="Search by name, ID, or organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4"
          />
          <div className="space-y-2">
            {students.filter(student =>
              student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
              student.organization.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(student => (
              <div key={student.id} className="border p-4 rounded-md">
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-gray-500">ID: {student.id} | {student.organization}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

