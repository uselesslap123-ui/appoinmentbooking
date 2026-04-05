import { DashboardLayout } from "@/components/dashboard-layout";
import { SymptomChecker } from "./_components/symptom-checker";

export default function PatientDashboardPage() {
  return (
    <DashboardLayout userType="patient">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          AI-Powered Symptom Checker
        </h1>
        <p className="text-xl text-muted-foreground">
          Not feeling your best? Let's figure out what might be going on.
        </p>
      </div>
      <SymptomChecker />
    </DashboardLayout>
  );
}
