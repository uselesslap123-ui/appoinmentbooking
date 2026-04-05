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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const initialData = {
  name: 'Dr. Sneha Reddy',
  specialization: 'dermatologist',
  experience: '8',
  fees: '1500',
  clinic: 'Skin & Wellness Center, Uptown, Metro City',
  bio: 'Dr. Reddy is a board-certified dermatologist with a passion for holistic skincare and patient education.',
};

export default function DoctorProfilePage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState(initialData);
  const [savedProfile, setSavedProfile] = useState(initialData);

  const isChanged = useMemo(() => {
    return JSON.stringify(profile) !== JSON.stringify(savedProfile);
  }, [profile, savedProfile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setProfile((prev) => ({ ...prev, specialization: value }));
  };

  const handleSaveChanges = () => {
    toast({
      title: 'Profile Updated',
      description: 'Your professional profile has been saved successfully.',
    });
    setSavedProfile(profile);
  };

  return (
    <DashboardLayout userType="doctor">
      <div className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Professional Profile
          </h1>
          <p className="text-muted-foreground">
            Keep your professional information up-to-date for patients.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Changes will be visible to patients searching for doctors.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={profile.name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Select
                  value={profile.specialization}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="specialization">
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiologist">Cardiologist</SelectItem>
                    <SelectItem value="dermatologist">Dermatologist</SelectItem>
                    <SelectItem value="general-practitioner">
                      General Practitioner
                    </SelectItem>
                    <SelectItem value="pediatrician">Pediatrician</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  value={profile.experience}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fees">Consultation Fee (₹)</Label>
                <Input
                  id="fees"
                  type="number"
                  value={profile.fees}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clinic">Clinic Name & Location</Label>
              <Input
                id="clinic"
                value={profile.clinic}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell patients a little about yourself..."
                rows={4}
                value={profile.bio}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveChanges} disabled={!isChanged}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
