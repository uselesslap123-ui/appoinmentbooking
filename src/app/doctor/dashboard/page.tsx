import { DashboardLayout } from "@/components/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";

const appointmentRequests = [
  {
    id: 1,
    patient: "Aditya Verma",
    date: "2024-10-28",
    time: "02:00 PM",
    status: "Pending",
  },
  {
    id: 2,
    patient: "Ishika Singh",
    date: "2024-10-29",
    time: "11:00 AM",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Sameer Joshi",
    date: "2024-10-29",
    time: "03:00 PM",
    status: "Confirmed",
  },
];

export default function DoctorDashboardPage() {
  return (
    <DashboardLayout userType="doctor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Dr. Reddy. Here are your appointment requests.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Appointment Requests</CardTitle>
            <CardDescription>
              Review and respond to new appointment requests from patients.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointmentRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.patient}</TableCell>
                    <TableCell>{req.date}</TableCell>
                    <TableCell>{req.time}</TableCell>
                    <TableCell>
                      <Badge variant={req.status === 'Pending' ? 'secondary' : 'default'}>{req.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {req.status === 'Pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:text-green-600 hover:bg-green-100"
                          >
                            <Check className="w-4 h-4" />
                            <span className="sr-only">Accept</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-600 hover:bg-red-100"
                          >
                            <X className="w-4 h-4" />
                            <span className="sr-only">Decline</span>
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
