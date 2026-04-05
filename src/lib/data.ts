export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  experience: number; // in years
  clinic: string;
  location: string;
  fees: number; // in USD
  rating: number; // out of 5
  distance: number; // in miles
  avatarUrl: string;
  availability: Record<string, string[]>; // e.g., { "Monday": ["10:00 AM", "11:00 AM"] }
};

export const doctors: Doctor[] = [
  {
    id: "doc1",
    name: "Dr. John Carter",
    specialization: "Cardiologist",
    experience: 15,
    clinic: "City Heart Clinic",
    location: "Downtown, Metro City",
    fees: 250,
    rating: 4.8,
    distance: 2.5,
    avatarUrl: "https://picsum.photos/seed/doc1/200/200",
    availability: { "Monday": ["10:00 AM", "11:00 AM"], "Wednesday": ["2:00 PM", "3:00 PM"] },
  },
  {
    id: "doc2",
    name: "Dr. Sarah Adams",
    specialization: "Dermatologist",
    experience: 8,
    clinic: "Skin & Wellness Center",
    location: "Uptown, Metro City",
    fees: 180,
    rating: 4.9,
    distance: 5.1,
    avatarUrl: "https://picsum.photos/seed/doc2/200/200",
    availability: { "Tuesday": ["9:00 AM", "10:00 AM"], "Thursday": ["1:00 PM"] },
  },
  {
    id: "doc3",
    name: "Dr. Michael Chen",
    specialization: "General Practitioner",
    experience: 12,
    clinic: "Community Health Services",
    location: "Suburbia, Metro City",
    fees: 120,
    rating: 4.7,
    distance: 8.3,
    avatarUrl: "https://picsum.photos/seed/doc3/200/200",
    availability: { "Monday": ["3:00 PM"], "Friday": ["9:00 AM", "10:00 AM", "11:00 AM"] },
  },
  {
    id: "doc4",
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatrician",
    experience: 10,
    clinic: "KidsCare Pediatrics",
    location: "Westside, Metro City",
    fees: 150,
    rating: 4.9,
    distance: 4.0,
    avatarUrl: "https://picsum.photos/seed/doc4/200/200",
    availability: { "Wednesday": ["10:00 AM"], "Friday": ["2:00 PM"] },
  },
    {
    id: "doc5",
    name: "Dr. Ben Green",
    specialization: "General Practitioner",
    experience: 20,
    clinic: "Green Family Practice",
    location: "Eastside, Metro City",
    fees: 135,
    rating: 4.8,
    distance: 1.2,
    avatarUrl: "https://picsum.photos/seed/doc5/200/200",
    availability: { "Tuesday": ["2:00 PM"], "Thursday": ["10:00 AM", "11:00 AM"] },
  },
  {
    id: "doc6",
    name: "Dr. Olivia White",
    specialization: "Dermatologist",
    experience: 5,
    clinic: "The Dermatology Group",
    location: "Financial District, Metro City",
    fees: 220,
    rating: 4.6,
    distance: 6.8,
    avatarUrl: "https://picsum.photos/seed/doc6/200/200",
    availability: { "Monday": ["1:00 PM", "2:00 PM"], "Wednesday": ["9:00 AM"] },
  }
];
