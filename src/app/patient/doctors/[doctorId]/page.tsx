import { DashboardLayout } from "@/components/dashboard-layout";
import { doctors } from "@/lib/data";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Briefcase, IndianRupee, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function DoctorProfilePage({ params }: { params: { doctorId: string } }) {
  const doctor = doctors.find((d) => d.id === params.doctorId);

  if (!doctor) {
    notFound();
  }

  return (
    <DashboardLayout userType="patient">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header card */}
        <Card className="overflow-hidden">
          <div className="bg-muted/30 p-8">
             <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                  <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-bold tracking-tight">{doctor.name}</h1>
                  <p className="text-xl text-primary font-medium mt-1">{doctor.specialization}</p>
                   <div className="flex items-center gap-4 text-muted-foreground mt-3 justify-center md:justify-start">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-lg">{doctor.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                         <Briefcase className="w-5 h-5" /> {doctor.experience} years experience
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <CardFooter className="p-4 bg-muted/50 justify-center">
             <Button asChild size="lg" className="w-full md:w-auto">
                <Link href={`/patient/book/${doctor.id}`}>Book an Appointment</Link>
             </Button>
          </CardFooter>
        </Card>

        {/* Details grid */}
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Professional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <div className="flex items-start">
                        <MapPin className="w-5 h-5 mr-3 mt-1 text-primary shrink-0" />
                        <div>
                            <span className="font-semibold text-foreground">{doctor.clinic}</span>
                            <p>{doctor.location}</p>
                        </div>
                    </div>
                     <div className="flex items-start">
                        <IndianRupee className="w-5 h-5 mr-3 mt-1 text-primary shrink-0" />
                        <div>
                            <span className="font-semibold text-foreground">₹{doctor.fees}</span>
                            <p>Consultation Fee</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Object.keys(doctor.availability).length > 0 ? (
                        Object.entries(doctor.availability).map(([day, times]) => (
                            <div key={day}>
                                <h4 className="font-semibold mb-2">{day}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {times.map(time => (
                                        <Badge variant="secondary" key={time} className="flex items-center gap-1.5">
                                            <Clock className="w-3 h-3" />
                                            {time}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">Not available.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
