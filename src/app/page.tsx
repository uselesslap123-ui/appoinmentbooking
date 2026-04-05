import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Stethoscope, User } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold text-primary">
          SyncHealth AI
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Your intelligent partner in health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
          <CardHeader className="items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <User className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">For Patients</CardTitle>
            <CardDescription className="px-4">
              Check your symptoms, find the right specialist, and book
              appointments with ease.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild size="lg" className="font-bold">
              <Link href="/patient/dashboard">Enter Patient Portal</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
          <CardHeader className="items-center text-center">
            <div className="p-4 bg-accent/10 rounded-full mb-4">
              <Stethoscope className="h-10 w-10 text-accent" />
            </div>
            <CardTitle className="font-headline text-2xl">For Doctors</CardTitle>
            <CardDescription className="px-4">
              Manage your profile, set your schedule, and connect with patients
              seamlessly.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-bold border-accent text-accent hover:bg-accent/10 hover:text-accent"
            >
              <Link href="/doctor/dashboard">Enter Doctor Portal</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SyncHealth AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
