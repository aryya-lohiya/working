"use client";
import React, { useState } from "react";

const ResultsPage = () => {
  const [results, setResults] = useState([
    { id: 1, name: "TEAM TECHIES", parameters: { innovation: 8, feasibility: 9, impact: 7 }, total: 24 },
    { id: 2, name: "ERROR 404", parameters: { innovation: 7, feasibility: 6, impact: 8 }, total: 21 },
    { id: 3, name: "HELLO WORLD", parameters: { innovation: 9, feasibility: 8, impact: 9 }, total: 26 },
  ]);

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [newSubmission, setNewSubmission] = useState({ name: "", innovation: "", feasibility: "", impact: "" });

  const handleViewSubmission = (student: any) => {
    setSelectedStudent(student);
  };

  const handleSort = () => {
    setResults((prevResults) => [...prevResults].sort((a, b) => b.total - a.total));
  };

  const handleAddSubmission = () => {
    const innovation = parseInt(newSubmission.innovation);
    const feasibility = parseInt(newSubmission.feasibility);
    const impact = parseInt(newSubmission.impact);
    if (!newSubmission.name || isNaN(innovation) || isNaN(feasibility) || isNaN(impact)) return;

    const newEntry = {
      id: results.length + 1,
      name: newSubmission.name,
      parameters: { innovation, feasibility, impact },
      total: innovation + feasibility + impact,
    };

    // Insert new submission in the correct order
    const updatedResults = [...results, newEntry].sort((a, b) => b.total - a.total);
    setResults(updatedResults);
    setNewSubmission({ name: "", innovation: "", feasibility: "", impact: "" });
  };

  return (
    <div className="p-6 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      <button onClick={handleSort} className="bg-blue-500 text-white px-3 py-2 rounded mb-4">
        Sort by Total Marks
      </button>

      {/* New Submission Form */}
      <div className="mb-6 p-4 border border-gray-300 bg-gray-50">
        <h2 className="text-lg font-bold mb-2">Add New Submission</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={newSubmission.name}
          onChange={(e) => setNewSubmission({ ...newSubmission, name: e.target.value })}
          className="border border-gray-300 p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Innovation"
          value={newSubmission.innovation}
          onChange={(e) => setNewSubmission({ ...newSubmission, innovation: e.target.value })}
          className="border border-gray-300 p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Feasibility"
          value={newSubmission.feasibility}
          onChange={(e) => setNewSubmission({ ...newSubmission, feasibility: e.target.value })}
          className="border border-gray-300 p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Impact"
          value={newSubmission.impact}
          onChange={(e) => setNewSubmission({ ...newSubmission, impact: e.target.value })}
          className="border border-gray-300 p-2 mr-2"
        />
        <button onClick={handleAddSubmission} className="bg-green-500 text-white px-3 py-2 rounded">
          Add Submission
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="border border-gray-300 px-2 py-1">Student Name</th>
            <th className="border border-gray-300 px-2 py-1">Innovation</th>
            <th className="border border-gray-300 px-2 py-1">Feasibility</th>
            <th className="border border-gray-300 px-2 py-1">Impact</th>
            <th className="border border-gray-300 px-2 py-1">Total Marks</th>
            <th className="border border-gray-300 px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((student) => (
            <tr key={student.id} className="text-center text-black">
              <td className="border border-gray-300 px-2 py-1">{student.name}</td>
              <td className="border border-gray-300 px-2 py-1">{student.parameters.innovation}</td>
              <td className="border border-gray-300 px-2 py-1">{student.parameters.feasibility}</td>
              <td className="border border-gray-300 px-2 py-1">{student.parameters.impact}</td>
              <td className="border border-gray-300 px-2 py-1 font-bold">{student.total}</td>
              <td className="border border-gray-300 px-2 py-1">
                <button
                  onClick={() => handleViewSubmission(student)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="mt-6 p-4 border border-gray-300 bg-gray-50 text-black">
          <h2 className="text-lg font-bold">Submission Details</h2>
          <p><strong>Student:</strong> {selectedStudent.name}</p>
          <p><strong>Innovation:</strong> {selectedStudent.parameters.innovation}</p>
          <p><strong>Feasibility:</strong> {selectedStudent.parameters.feasibility}</p>
          <p><strong>Impact:</strong> {selectedStudent.parameters.impact}</p>
          <p><strong>Total Marks:</strong> {selectedStudent.total}</p>
          <button onClick={() => setSelectedStudent(null)} className="mt-4 bg-red-500 text-white px-3 py-2 rounded">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
