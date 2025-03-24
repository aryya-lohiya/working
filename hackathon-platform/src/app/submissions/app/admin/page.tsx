"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const { toast } = useToast()
  const [hackathonName, setHackathonName] = useState("NextGen Innovation Hackathon 2025")
  const [criteria, setCriteria] = useState([
    { name: "Innovation", maxMarks: 10 },
    { name: "Technical Implementation", maxMarks: 10 },
    { name: "Design & User Experience", maxMarks: 10 },
    { name: "Presentation", maxMarks: 10 },
    { name: "Business Potential", maxMarks: 10 },
  ])

  const [newCriterion, setNewCriterion] = useState("")

  const addCriterion = () => {
    if (!newCriterion.trim()) return

    if (criteria.length >= 10) {
      toast({
        title: "Maximum criteria reached",
        description: "You can have a maximum of 10 judging criteria.",
        variant: "destructive",
      })
      return
    }

    setCriteria([...criteria, { name: newCriterion, maxMarks: 10 }])
    setNewCriterion("")
  }

  const removeCriterion = (index: number) => {
    if (criteria.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You must have at least one judging criterion.",
        variant: "destructive",
      })
      return
    }

    const updatedCriteria = [...criteria]
    updatedCriteria.splice(index, 1)
    setCriteria(updatedCriteria)
  }

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Hackathon settings have been updated successfully.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-8">Hackathon Admin Settings</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Hackathon Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hackathon-name">Hackathon Name</Label>
            <Input id="hackathon-name" value={hackathonName} onChange={(e) => setHackathonName(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Judging Criteria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {criteria.map((criterion, index) => (
              <div key={index} className="flex items-center gap-4">
                <Input
                  value={criterion.name}
                  onChange={(e) => {
                    const updated = [...criteria]
                    updated[index].name = e.target.value
                    setCriteria(updated)
                  }}
                  className="flex-1"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">Max: 10</span>
                  <Button variant="outline" size="sm" onClick={() => removeCriterion(index)} className="h-8 w-8 p-0">
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="New criterion"
              value={newCriterion}
              onChange={(e) => setNewCriterion(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addCriterion}>Add</Button>
          </div>

          <div className="text-sm text-muted-foreground">
            {criteria.length}/10 criteria defined. You must have between 1 and 10 judging criteria.
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveSettings}>Save Settings</Button>
      </div>
    </div>
  )
}

