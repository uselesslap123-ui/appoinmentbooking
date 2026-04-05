import { DashboardLayout } from "@/components/dashboard-layout";
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
import { Calendar, Clock, User } from "lucide-react";

const confirmedAppointments = [
  {
    id: 1,
    patient: "Sameer Joshi",
    date: "2024-10-29",
    time: "03:00 PM",
    reason: "Follow-up for blood pressure check",
  },
  {
    id: 2,
    patient: "Anjali Sharma",
    date: "2024-10-30",
    time: "10:00 AM",
    reason: "Annual check-up",
  },
];

export default function AcceptedAppointmentsPage() {
  return (
    <DashboardLayout userType="doctor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accepted Appointments</h1>
          <p className="text-muted-foreground">
            Here is a list of your confirmed upcoming appointments.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Confirmed Appointments</CardTitle>
            <CardDescription>
              Patients have been notified of their confirmed appointment time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Reason for Visit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {confirmedAppointments.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                       <User className="w-4 h-4 text-muted-foreground" />
                      {appt.patient}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" /> {appt.date}
                      </div>
                       <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                        <Clock className="w-4 h-4" /> {appt.time}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{appt.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {confirmedAppointments.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p>You have no accepted appointments.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
