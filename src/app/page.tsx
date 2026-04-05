import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="https://picsum.photos/seed/doctors-hero/1920/1080"
        alt="A team of doctors"
        fill
        className="object-cover object-center"
        data-ai-hint="doctors medical"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex min-h-screen flex-col text-white">
        <header className="flex items-center justify-between p-4 md:p-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
             <Stethoscope className="h-6 w-6" />
             <span>eDoc.</span>
             <span className="font-light text-sm ml-2 pl-2 border-l border-gray-400 hidden sm:inline">
                THE ECHANNELING PROJECT
             </span>
          </Link>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="link" asChild className="text-white hover:underline uppercase">
              <Link href="/patient/dashboard">Patient Login</Link>
            </Button>
            <Button variant="link" asChild className="text-white hover:underline uppercase">
               <Link href="/doctor/dashboard">Doctor Login</Link>
            </Button>
          </nav>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Avoid Hassles & Delays.
          </h1>
          <p className="mt-4 max-w-xl sm:max-w-2xl text-lg text-gray-200">
            Not feeling well? Don't worry. Find your doctor and book an appointment online with eDoc. We offer a free doctor channeling service to help you get care without delay.
          </p>
          <Button asChild size="lg" className="mt-8 font-bold">
            <Link href="/patient/doctors">Make Appointment</Link>
          </Button>
        </main>
      </div>
    </div>
  );
}
