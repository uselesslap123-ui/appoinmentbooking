import { DashboardLayout } from "@/components/dashboard-layout";
import { SymptomChecker } from "./_components/symptom-checker";

export default function PatientDashboardPage() {
  return (
    <DashboardLayout userType="patient">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
          AI Symptom Checker
        </h1>
        <p className="max-w-[700px] mx-auto text-lg text-muted-foreground md:text-xl">
          Not feeling well? Describe your symptoms below, and our AI will provide a preliminary analysis and suggest which type of specialist to consult.
        </p>
      </div>
      <SymptomChecker />
    </DashboardLayout>
  );
}
