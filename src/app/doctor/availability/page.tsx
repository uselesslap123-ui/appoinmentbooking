'use client';

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

// Assume some initial availability for the logged-in doctor
const initialAvailability: Record<string, string[]> = {
  Monday: ['10:00 AM', '02:00 PM'],
  Wednesday: ['11:00 AM', '03:00 PM', '04:00 PM'],
  Friday: ['09:00 AM'],
};

export default function DoctorAvailabilityPage() {
  const { toast } = useToast();
  const [availability, setAvailability] = useState(initialAvailability);
  const [savedAvailability, setSavedAvailability] =
    useState(initialAvailability);

  const isChanged = useMemo(() => {
    return JSON.stringify(availability) !== JSON.stringify(savedAvailability);
  }, [availability, savedAvailability]);

  const handleSlotToggle = (day: string, slot: string, checked: boolean) => {
    setAvailability((prev) => {
      const daySlots = prev[day] ? [...prev[day]] : [];
      if (checked) {
        if (!daySlots.includes(slot)) {
          daySlots.push(slot);
          daySlots.sort(); // Keep it sorted for consistency
        }
      } else {
        const index = daySlots.indexOf(slot);
        if (index > -1) {
          daySlots.splice(index, 1);
        }
      }
      const newAvailability = { ...prev, [day]: daySlots };
      // If a day has no slots, remove it from the object
      if (newAvailability[day].length === 0) {
        delete newAvailability[day];
      }
      return newAvailability;
    });
  };

  const handleUpdateAvailability = () => {
    setSavedAvailability(availability);
    toast({
      title: 'Availability Updated',
      description: 'Your schedule has been successfully saved.',
    });
  };

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
                      <Checkbox
                        id={`${day}-${slot}`}
                        checked={availability[day]?.includes(slot) ?? false}
                        onCheckedChange={(checked) => {
                          handleSlotToggle(day, slot, !!checked);
                        }}
                      />
                      <Label htmlFor={`${day}-${slot}`}>{slot}</Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <Button onClick={handleUpdateAvailability} disabled={!isChanged}>
                Update Availability
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
