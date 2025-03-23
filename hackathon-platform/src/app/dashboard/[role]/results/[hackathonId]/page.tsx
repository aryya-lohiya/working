import { useParams } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock results
const mockResults = [
  {
    id: "S001",
    parameters: { innovation: 9, execution: 8, presentation: 8.5 },
    aggregate: 8.5,
    position: 1
  },
  {
    id: "S002",
    parameters: { innovation: 8, execution: 8.5, presentation: 7.5 },
    aggregate: 8.0,
    position: 2
  }
];

export default function ResultsPage() {
  const params = useParams();
  const role = params.role;  // Get role from the URL
  const hackathonId = params.hackathonId;  // Get hackathonId from the URL

  // Ensure only teachers can access
  if (role !== "teacher") {
    return <div className="text-center text-red-500">Unauthorized Access</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{`Results for Hackathon ID: ${hackathonId}`}</h1>
        <span className="text-lg text-muted-foreground">Results - Finalized</span>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Innovation</TableHead>
              <TableHead>Execution</TableHead>
              <TableHead>Presentation</TableHead>
              <TableHead className="text-right">Aggregate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell>#{result.position}</TableCell>
                <TableCell className="font-medium">{result.id}</TableCell>
                <TableCell>{result.parameters.innovation}</TableCell>
                <TableCell>{result.parameters.execution}</TableCell>
                <TableCell>{result.parameters.presentation}</TableCell>
                <TableCell className="text-right">{result.aggregate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
