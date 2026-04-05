"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { doctors } from "@/lib/data";
import { notFound, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

function BookingForm({ params }: { params: { doctorId: string } }) {
    const router = useRouter();
    const { toast } = useToast();
    const doctor = doctors.find((d) => d.id === params.doctorId);

    if (!doctor) {
        notFound();
    }

    const availableSlots = Object.entries(doctor.availability).flatMap(
        ([day, times]) => times.map((time) => ({ day, time }))
    );

    const handleBooking = () => {
        toast({
            title: "Appointment Booked!",
            description: `Your appointment with ${doctor.name} has been confirmed.`,
        });
        router.push('/patient/appointments');
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Book Appointment
                </h1>
                <p className="text-muted-foreground">
                    Select a time slot to book an appointment with {doctor.name}.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Select a Date & Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {availableSlots.length > 0 ? (
                                <RadioGroup
                                    defaultValue={
                                        availableSlots[0]
                                            ? `${availableSlots[0].day}-${availableSlots[0].time}`
                                            : ""
                                    }
                                    className="space-y-4"
                                >
                                    {availableSlots.map((slot, index) => (
                                        <Label
                                            key={index}
                                            htmlFor={`slot-${index}`}
                                            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent/10 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <Calendar className="w-5 h-5 text-muted-foreground" />
                                                <div>
                                                    <span className="font-semibold">{slot.day}</span>
                                                    <div className="text-muted-foreground">{slot.time}</div>
                                                </div>
                                            </div>
                                            <RadioGroupItem
                                                value={`${slot.day}-${slot.time}`}
                                                id={`slot-${index}`}
                                            />
                                        </Label>
                                    ))}
                                </RadioGroup>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">
                                    No available slots for this doctor.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Patient Details</CardTitle>
                            <CardDescription>
                                Please provide a brief reason for your visit.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="reason">Reason for Visit / Symptoms</Label>
                                <Textarea
                                    id="reason"
                                    placeholder="e.g., 'Follow-up for blood pressure check' or 'I have a persistent cough and a slight fever...'"
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4 md:sticky md:top-24">
                    <Card>
                        <CardHeader className="p-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-12 h-12 border">
                                    <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
                                    <AvatarFallback>
                                        {doctor.name.substring(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold">{doctor.name}</h3>
                                    <p className="text-sm text-primary">{doctor.specialization}</p>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <Button className="w-full" size="lg" onClick={handleBooking}>
                        Confirm Booking
                    </Button>
                </div>
            </div>
        </div>
    )
}

function BookingPageSkeleton() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Skeleton className="h-9 w-1/2 mb-2" />
                <Skeleton className="h-5 w-3/4" />
            </div>
             <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-7 w-1/3" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <Skeleton className="h-16 w-full" />
                           <Skeleton className="h-16 w-full" />
                           <Skeleton className="h-16 w-full" />
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <Skeleton className="h-7 w-1/3" />
                            <Skeleton className="h-4 w-2/3" />
                        </CardHeader>
                        <CardContent>
                           <Skeleton className="h-24 w-full" />
                        </CardContent>
                    </Card>
                </div>
                 <div className="space-y-4">
                     <Card>
                        <CardHeader className="p-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-12 h-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <Skeleton className="h-12 w-full" />
                 </div>
            </div>
        </div>
    )
}

export default function BookAppointmentPage({
  params,
}: {
  params: { doctorId: string };
}) {
  return (
    <DashboardLayout userType="patient">
        <Suspense fallback={<BookingPageSkeleton />}>
            <BookingForm params={params} />
        </Suspense>
    </DashboardLayout>
  );
}
