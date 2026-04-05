"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  patientSymptomAnalysisAndRecommendation,
  type PatientSymptomAnalysisOutput,
} from "@/ai/flows/patient-symptom-analysis-recommendation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Loader2, HeartPulse, List, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

type FormState = {
  data: PatientSymptomAnalysisOutput | null;
  error: string | null;
};

const initialState: FormState = {
  data: null,
  error: null,
};

async function analyzeSymptomsAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const symptoms = formData.get("symptoms") as string;
  if (!symptoms || symptoms.trim().length < 10) {
    return { data: null, error: "Please describe your symptoms in at least 10 characters." };
  }

  try {
    const result = await patientSymptomAnalysisAndRecommendation({ symptoms });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: "An unexpected error occurred. Please try again." };
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
        </>
      ) : (
        <>
          <HeartPulse className="mr-2 h-4 w-4" /> Analyze Symptoms
        </>
      )}
    </Button>
  );
}

export function SymptomChecker() {
  const [state, formAction] = useFormState(analyzeSymptomsAction, initialState);

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Describe Your Symptoms</CardTitle>
          <CardDescription>
            Be as detailed as possible for a more accurate analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="symptoms">Your Symptoms</Label>
              <Textarea
                id="symptoms"
                name="symptoms"
                placeholder="e.g., 'I have a persistent cough, a slight fever, and a headache that started two days ago...'"
                rows={6}
                required
                minLength={10}
              />
            </div>
            {state.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            <div className="flex justify-end">
                <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>

      {state.data && (
        <Card className="bg-primary/5 border-primary/20 animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="text-primary" />
              AI Analysis Results
            </CardTitle>
            <CardDescription>
              Based on the symptoms you provided, here is our analysis. This is not a medical diagnosis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4 p-4 bg-background rounded-lg">
                <h3 className="font-semibold flex items-center gap-2 text-lg"><ShieldCheck className="text-accent" /> Recommended Specialist</h3>
                <p className="text-2xl font-bold text-accent">{state.data.recommendedSpecialization}</p>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Confidence Score</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={state.data.confidenceScore * 100} className="w-full" />
                    <span className="font-semibold text-sm">{(state.data.confidenceScore * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-4 bg-background rounded-lg">
                <h3 className="font-semibold flex items-center gap-2 text-lg"><List /> Possible Issues</h3>
                <ul className="space-y-2 list-disc list-inside">
                  {state.data.possibleIssues.map((issue, index) => (
                    <li key={index} className="text-muted-foreground">{issue}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t mt-2">
              <Button asChild>
                <Link href={`/patient/doctors?specialization=${encodeURIComponent(state.data.recommendedSpecialization)}`}>
                  Find Nearby Doctors <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
