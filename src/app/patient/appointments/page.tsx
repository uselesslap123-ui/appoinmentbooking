import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Stethoscope } from "lucide-react";

export default function PatientAppointmentsPage() {
  return (
    <DashboardLayout userType="patient">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-muted-foreground">
            View your upcoming and past appointments.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-bold text-lg">Dr. Rohan Das</p>
                <div className="flex items-center text-muted-foreground text-sm gap-2">
                  <Stethoscope className="w-4 h-4" /> General Practitioner
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-1">
                <div className="flex items-center font-medium gap-2">
                  <Calendar className="w-4 h-4 text-primary" /> Friday, October
                  25, 2024
                </div>
                <div className="flex items-center font-medium gap-2">
                  <Clock className="w-4 h-4 text-primary" /> 10:00 AM
                </div>
              </div>
            </div>
            <div className="text-center text-muted-foreground pt-4">
                <p>No other appointments scheduled.</p>
                <Button variant="link" className="text-primary">View Past Appointments</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
