"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { doctors, Doctor } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Briefcase, DollarSign } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 border">
            <AvatarImage src={doctor.avatarUrl} alt={`Dr. ${doctor.name}`} />
            <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl">{doctor.name}</CardTitle>
            <CardDescription className="text-primary font-medium">
              {doctor.specialization}
            </CardDescription>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{doctor.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="flex items-center text-muted-foreground">
          <Briefcase className="w-4 h-4 mr-2" /> {doctor.experience} years
          experience
        </div>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2" /> {doctor.clinic} ({doctor.distance}{" "}
          mi away)
        </div>
        <div className="flex items-center text-muted-foreground">
          <DollarSign className="w-4 h-4 mr-2" /> ${doctor.fees} consultation
          fee
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/patient/book/${doctor.id}`}>Book Appointment</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function DoctorList() {
  const searchParams = useSearchParams();
  const specialization = searchParams.get("specialization");

  const filteredDoctors = specialization
    ? doctors.filter(
        (d) =>
          d.specialization.toLowerCase() === specialization.toLowerCase()
      )
    : doctors;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {specialization ? `${specialization}s Nearby` : "Find a Doctor"}
        </h1>
        <p className="text-muted-foreground">
          {specialization
            ? `Showing doctors matching your AI-recommended specialization.`
            : "Browse all available doctors."}
        </p>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center border-2 border-dashed rounded-lg p-12">
          <p className="text-lg font-semibold">No Doctors Found</p>
          <p className="text-muted-foreground">
            We couldn't find any{" "}
            {specialization ? specialization + "s" : "doctors"}.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/patient/doctors">See All Doctors</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function DoctorsPageSkeleton() {
    return (
        <div>
            <div className="mb-6">
                <Skeleton className="h-9 w-1/2 mb-2" />
                <Skeleton className="h-5 w-3/4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="flex items-start gap-4">
                                <Skeleton className="w-16 h-16 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-1/4" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default function FindDoctorsPage() {
  return (
    <DashboardLayout userType="patient">
      <Suspense fallback={<DoctorsPageSkeleton />}>
        <DoctorList />
      </Suspense>
    </DashboardLayout>
  );
}
