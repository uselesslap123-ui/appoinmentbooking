import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Stethoscope, Calendar, Search, UserPlus } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg text-primary">SyncHealth AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/patient/dashboard">Patient Login</Link>
          </Button>
          <Button asChild>
            <Link href="/doctor/dashboard">Doctor Login</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Intelligent Symptom Analysis, Seamless Doctor Discovery
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Describe your symptoms and let our AI guide you to the right specialist. Book appointments with ease and take control of your health journey.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/patient/dashboard">Check Symptoms</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/patient/doctors">Find a Doctor</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/hero-image/600/600"
                width="600"
                height="600"
                alt="Hero"
                data-ai-hint="medical doctor patient"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">A Simpler Path to Healthcare</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform simplifies finding the right medical care. Just three easy steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-2 text-center p-4 rounded-lg hover:bg-background transition-all">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background mb-4 border">
                  <UserPlus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">1. Describe Symptoms</h3>
                <p className="text-sm text-muted-foreground">Use our AI-powered symptom checker to detail how you're feeling. It's quick, easy, and confidential.</p>
              </div>
              <div className="grid gap-2 text-center p-4 rounded-lg hover:bg-background transition-all">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background mb-4 border">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">2. Find a Specialist</h3>
                <p className="text-sm text-muted-foreground">Based on your symptoms, we'll recommend the right type of doctor and show you available specialists in your area.</p>
              </div>
              <div className="grid gap-2 text-center p-4 rounded-lg hover:bg-background transition-all">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background mb-4 border">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">3. Book Instantly</h3>
                <p className="text-sm text-muted-foreground">Choose a convenient time slot from the doctor's schedule and book your appointment online in seconds.</p>
              </div>
            </div>
          </div>
        </section>
         <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Take Control of Your Health?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started with our symptom checker or browse for doctors now.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-x-2 flex justify-center">
               <Button asChild size="lg">
                    <Link href="/patient/dashboard">Get Started Now</Link>
                  </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 SyncHealth AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
