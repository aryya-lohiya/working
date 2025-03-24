"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea2";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

// ... (keep the hackathons array and other initial imports same as before)

export default function TeacherDashboard() {
  // ... (keep all the existing state and toast declarations same)

  // Modified judging criteria section JSX
  const judgingCriteriaSection = (
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2">Judging Criteria</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {newHackathon.judgingCriteria.map((criterion, index) => (
          <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
            <span>{criterion.name}</span>
            <button
              onClick={() => {
                if (newHackathon.judgingCriteria.length <= 1) {
                  toast({
                    title: "Cannot remove",
                    description: "You must have at least one judging criterion.",
                    variant: "destructive",
                  });
                  return;
                }
                const updatedCriteria = newHackathon.judgingCriteria.filter((_, i) => i !== index);
                setNewHackathon({ ...newHackathon, judgingCriteria: updatedCriteria });
              }}
              className="ml-2 hover:text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <Input
        type="text"
        placeholder="Add criteria and press Enter"
        value={newHackathon.criterionInput}
        onChange={(e) => setNewHackathon({ ...newHackathon, criterionInput: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (!newHackathon.criterionInput.trim()) return;
            if (newHackathon.judgingCriteria.length >= 10) {
              toast({
                title: "Maximum criteria reached",
                description: "You can have a maximum of 10 judging criteria.",
                variant: "destructive",
              });
              return;
            }
            setNewHackathon({
              ...newHackathon,
              judgingCriteria: [
                ...newHackathon.judgingCriteria,
                { name: newHackathon.criterionInput.trim(), maxMarks: 10 }, // Default marks hidden
              ],
              criterionInput: "",
            });
          }
        }}
        className="w-full"
      />
    </div>
  );

  // ... (keep the rest of the component exactly the same until the return statement)

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* ... (keep all the existing JSX structure same) */}

      {/* Modified Create Hackathon Form section */}
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

        {judgingCriteriaSection}

        {/* ... (keep submission deadline section and create button same) */}
      </div>

      {/* ... (keep the hackathon list section exactly the same) */}
    </div>
  );
}
