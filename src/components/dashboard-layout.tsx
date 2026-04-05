'use client';

import Link from 'next/link';
import {
  Home,
  User,
  Stethoscope,
  Calendar,
  Settings,
  ClipboardCheck,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

type DashboardLayoutProps = {
  children: React.ReactNode;
  userType: 'patient' | 'doctor';
};

const patientNav = [
  { name: 'Symptom Checker', href: '/patient/dashboard', icon: Home },
  { name: 'Find Doctors', href: '/patient/doctors', icon: Stethoscope },
  { name: 'My Appointments', href: '/patient/appointments', icon: Calendar },
  { name: 'My Profile', href: '/patient/profile', icon: User },
];

const doctorNav = [
  { name: 'Dashboard', href: '/doctor/dashboard', icon: Home },
  {
    name: 'Accepted Appointments',
    href: '/doctor/accepted-appointments',
    icon: ClipboardCheck,
  },
  { name: 'My Availability', href: '/doctor/availability', icon: Calendar },
  { name: 'My Profile', href: '/doctor/profile', icon: Settings },
];

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const navItems = userType === 'patient' ? patientNav : doctorNav;
  const user =
    userType === 'patient'
      ? {
          name: 'Rohan Kumar',
          email: 'rohan.kumar@example.com',
          image: 'https://picsum.photos/seed/indian-patient/100/100',
        }
      : {
          name: 'Dr. Sneha Reddy',
          email: 's.reddy@clinic.com',
          image: 'https://picsum.photos/seed/indian-doctor-female/100/100',
        };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="flex items-baseline gap-2 px-2">
            <span className="font-bold text-2xl tracking-wider text-primary">
              eDoc.
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm overflow-hidden">
              <span className="font-semibold truncate">{user.name}</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10 md:p-3 md:pl-2">
          <SidebarTrigger />
          <Button variant="ghost" asChild>
            <Link href="/">Logout</Link>
          </Button>
        </header>
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
