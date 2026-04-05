import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="bg-background">
      <div className="relative h-screen w-full flex flex-col text-white">
        {/* Background Image & Overlay */}
        <Image
          src="https://picsum.photos/seed/indian-doctor/1920/1080"
          alt="A group of medical professionals"
          fill
          className="object-cover z-0"
          data-ai-hint="indian doctor medical professional"
        />
        <div className="absolute inset-0 bg-gray-900/60 z-10" />

        {/* Header */}
        <header className="relative z-20 px-4 lg:px-8 py-5 flex items-center">
           <Link href="/" className="flex items-baseline gap-3">
            <span className="font-bold text-3xl tracking-wider">eDoc.</span>
            <span className="text-xs font-light tracking-widest uppercase hidden sm:inline">The Echanneling Project</span>
          </Link>
        </header>

        {/* Hero Content */}
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="space-y-8 max-w-4xl">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl drop-shadow-md">
              Avoid Hassles & Delays.
            </h1>
            <p className="max-w-[700px] text-gray-200 text-lg mx-auto leading-relaxed">
              Not feeling well? Don't worry. Find your doctor online and book as you wish with eDoc. We offer a free doctor channeling service. Make your appointment now.
            </p>
            <Button asChild size="lg" className="text-lg px-10 py-7 rounded-full font-semibold">
              <Link href="/patient/dashboard">Make Appointment</Link>
            </Button>
            <div className="flex justify-center gap-4 items-center tracking-wider">
                <Button asChild variant="outline" className="rounded-full bg-white/5 border-white/30 text-gray-200 hover:bg-white/10 hover:border-white hover:text-white backdrop-blur-sm">
                    <Link href="/patient/dashboard">Patient Login</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full bg-white/5 border-white/30 text-gray-200 hover:bg-white/10 hover:border-white hover:text-white backdrop-blur-sm">
                    <Link href="/doctor/dashboard">Doctor Login</Link>
                </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
