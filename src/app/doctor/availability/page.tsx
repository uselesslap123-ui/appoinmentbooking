import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

export default function DoctorAvailabilityPage() {
  return (
    <DashboardLayout userType="doctor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Set Availability</h1>
          <p className="text-muted-foreground">
            Choose the days and times you are available for appointments.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>
              Select your available time slots for the week. Patients will only
              be able to book appointments during these times.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {days.map((day) => (
              <div key={day} className="space-y-4 rounded-lg border p-4">
                <h3 className="font-semibold">{day}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {timeSlots.map((slot) => (
                    <div key={slot} className="flex items-center space-x-2">
                      <Checkbox id={`${day}-${slot}`} />
                      <Label htmlFor={`${day}-${slot}`}>{slot}</Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <Button>Update Availability</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
