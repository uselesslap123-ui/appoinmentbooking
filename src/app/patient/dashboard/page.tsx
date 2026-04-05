import { DashboardLayout } from "@/components/dashboard-layout";
import { SymptomChecker } from "./_components/symptom-checker";

export default function PatientDashboardPage() {
  return (
    <DashboardLayout userType="patient">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Symptom Checker</h1>
          <p className="text-muted-foreground">
            Describe your symptoms, and our AI will suggest possible issues and a
            specialist.
          </p>
        </div>
        <SymptomChecker />
      </div>
    </DashboardLayout>
  );
}
