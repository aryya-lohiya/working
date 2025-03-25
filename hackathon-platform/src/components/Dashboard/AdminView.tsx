"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "sonner"
import { Search } from "lucide-react"

// Sample data for hackathons
const hackathons = [
  {
    id: 1,
    name: "AI Innovation Challenge",
    creatorId: "t_001",
    participants: 142,
    status: "Results to be Announced",
    subDeadline: "Mar 15",
  },
  {
    id: 2,
    name: "Blockchain Hack",
    creatorId: "t_002",
    participants: 89,
    status: "Results to be Announced",
    subDeadline: "Mar 18",
  },
  {
    id: 3,
    name: "Climate Tech Showdown",
    creatorId: "t_003",
    participants: 204,
    status: "Completed",
    subDeadline: "Mar 20",
  },
  {
    id: 4,
    name: "Cybersecurity Challenge",
    creatorId: "t_004",
    participants: 99,
    status: "Results to be Announced",
    subDeadline: "Mar 22",
  },
  { id: 5, name: "Healthcare AI", creatorId: "t_005", participants: 65, status: "Completed", subDeadline: "Mar 25" },
]

// Sample data for users
const users = [
  { id: "u_001", name: "John Doe", role: "teacher" },
  { id: "u_002", name: "Jane Smith", role: "student" },
  { id: "u_003", name: "Mike Johnson", role: "admin" },
  { id: "u_004", name: "Sarah Williams", role: null },
  { id: "u_005", name: "David Brown", role: "teacher" },
  { id: "u_006", name: "Emily Davis", role: "student" },
  { id: "u_007", name: "Alex Wilson", role: "admin" },
  { id: "u_008", name: "Olivia Taylor", role: null },
  { id: "u_009", name: "James Anderson", role: "teacher" },
  { id: "u_010", name: "Sophia Martinez", role: "student" },
]

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("hackathons")
  const [activeFilter, setActiveFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")
  const [newHackathon, setNewHackathon] = useState({
    name: "",
    description: "",
    judgingCriteria: [],
    criterionInput: "",
    submissionDeadline: "",
  })
  const [localUsers, setLocalUsers] = useState(users)

  const router = useRouter()
  const statusOrder = {
    "Results to be Announced": 1,
    Completed: 2,
  }

  const filteredHackathons = hackathons
    .filter((h) => activeFilter === "all" || h.status === activeFilter)
    .filter((h) => h.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status] || a.name.localeCompare(b.name))

  const filteredUsers = localUsers
    .filter((u) => userFilter === "all" || u.role === userFilter)
    .filter(
      (u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const handleCreateHackathon = () => {
    if (!newHackathon.name || !newHackathon.submissionDeadline) {
      toast.error("Problem statement and submission deadline are required!")
      return
    }
    console.log("Creating Hackathon:", newHackathon)
    toast.success("Hackathon created successfully!")
    setNewHackathon({
      name: "",
      description: "",
      judgingCriteria: [],
      criterionInput: "",
      submissionDeadline: "",
    })
  }

  const assignRole = (userId, role) => {
    setLocalUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, role } : user)))
    toast.success(`User assigned as ${role} successfully!`)
  }

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex border-b">
        <button
          className={`flex-1 text-center py-2 ${activeTab === "hackathons" ? "border-b-2 border-black font-bold" : ""}`}
          onClick={() => {
            setActiveTab("hackathons")
            setActiveFilter("all")
            setSearchQuery("")
          }}
        >
          Hackathons
        </button>
        <button
          className={`flex-1 text-center py-2 ${activeTab === "users" ? "border-b-2 border-black font-bold" : ""}`}
          onClick={() => {
            setActiveTab("users")
            setUserFilter("all")
            setSearchQuery("")
          }}
        >
          Users
        </button>
      </div>

      {activeTab === "hackathons" && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
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

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Judging Criteria</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {newHackathon.judgingCriteria.map((criterion, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    <span>{criterion.name}</span>
                    <button
                      onClick={() => {
                        if (newHackathon.judgingCriteria.length <= 1) {
                          toast.error("You must have at least one judging criterion.")
                          return
                        }
                        setNewHackathon({
                          ...newHackathon,
                          judgingCriteria: newHackathon.judgingCriteria.filter((_, i) => i !== index),
                        })
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
                    e.preventDefault()
                    if (!newHackathon.criterionInput.trim()) return
                    if (newHackathon.judgingCriteria.length >= 10) {
                      toast.error("You can have a maximum of 10 judging criteria.")
                      return
                    }
                    setNewHackathon({
                      ...newHackathon,
                      judgingCriteria: [
                        ...newHackathon.judgingCriteria,
                        { name: newHackathon.criterionInput.trim(), maxMarks: 10 },
                      ],
                      criterionInput: "",
                    })
                  }
                }}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Submission Deadline</h3>
              <Input
                type="date"
                value={newHackathon.submissionDeadline}
                onChange={(e) => setNewHackathon({ ...newHackathon, submissionDeadline: e.target.value })}
                className="w-full"
              />
            </div>

            <Button className="w-full bg-black text-white mt-2" onClick={handleCreateHackathon}>
              Create Hackathon
            </Button>
          </div>

          <div className="lg:col-span-3">
            <div className="flex border-b mb-4">
              {["Results to be Announced", "Completed", "all"].map((filter) => (
                <button
                  key={filter}
                  className={`flex-1 text-center py-2 capitalize ${activeFilter === filter ? "border-b-2 border-black font-bold" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mb-6 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search hackathons by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHackathons.map((hackathon) => (
                <div
                  key={hackathon.id}
                  className="border rounded-lg p-6 shadow-md flex flex-col cursor-pointer"
                  onClick={() => {
                    if (hackathon.status === "Completed") {
                      router.push(`/dashboard/admin/results/${hackathon.id}`)
                    } else if (hackathon.status === "Results to be Announced") {
                      router.push(`/dashboard/admin/results/notCompleted/${hackathon.id}`)
                    }
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">{hackathon.name}</h2>
                    <p
                      className={`text-sm font-semibold ${hackathon.status === "Results to be Announced" ? "text-green-600" : "text-blue-600"}`}
                    >
                      {hackathon.status}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    Organizer: <span className="font-mono">{hackathon.creatorId}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">👥 {hackathon.participants} participants</p>
                  <p className="text-sm text-gray-600 mt-1">
                    📅 Submission Deadline: <span className="font-semibold">{hackathon.subDeadline}</span>
                  </p>

                  <div className="mt-3 border-t pt-3 text-center font-semibold text-blue-500">View details →</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="mt-6">
          <div className="flex border-b mb-4">
            {["teacher", "student", "admin", "all"].map((filter) => (
              <button
                key={filter}
                className={`flex-1 text-center py-2 capitalize ${userFilter === filter ? "border-b-2 border-black font-bold" : ""}`}
                onClick={() => setUserFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search users by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-4 shadow-md flex flex-col">
                <div className="mb-3">
                  <h2 className="font-semibold truncate">{user.name}</h2>
                  <p className="text-sm text-gray-600 font-mono">{user.id}</p>
                </div>

                <div className="mt-auto pt-3 border-t flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      user.role === "student"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "text-gray-500 bg-gray-100 hover:bg-gray-200"
                    }
                    onClick={() => assignRole(user.id, "student")}
                  >
                    Student
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      user.role === "teacher"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "text-gray-500 bg-gray-100 hover:bg-gray-200"
                    }
                    onClick={() => assignRole(user.id, "teacher")}
                  >
                    Teacher
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      user.role === "admin"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "text-gray-500 bg-gray-100 hover:bg-gray-200"
                    }
                    onClick={() => assignRole(user.id, "admin")}
                  >
                    Admin
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
