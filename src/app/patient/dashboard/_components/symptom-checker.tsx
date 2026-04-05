"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  patientSymptomAnalysisAndRecommendation,
  type PatientSymptomAnalysisOutput,
} from "@/ai/flows/patient-symptom-analysis-recommendation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Lightbulb,
  Loader2,
  HeartPulse,
  List,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

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
    return {
      data: null,
      error: "Please describe your symptoms in at least 10 characters.",
    };
  }

  try {
    const result = await patientSymptomAnalysisAndRecommendation({ symptoms });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return {
      data: null,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
        </>
      ) : (
        <>
          <HeartPulse className="mr-2 h-4 w-4" /> Get AI Analysis
        </>
      )}
    </Button>
  );
}

function ResultsSkeleton() {
  return (
    <Card className="flex flex-col justify-center">
      <CardHeader>
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 rounded-lg border">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-8 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <div className="space-y-4 p-4 rounded-lg border">
          <Skeleton className="h-6 w-1/3" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-48 ml-auto" />
      </CardFooter>
    </Card>
  );
}

export function SymptomChecker() {
  const [state, formAction] = useFormState(analyzeSymptomsAction, initialState);
  const { pending } = useFormStatus();

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card className="lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            Symptom Input
          </CardTitle>
          <CardDescription>
            Describe your symptoms in detail. The more information you provide,
            the more accurate the AI analysis will be.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="symptoms" className="sr-only">
                Your Symptoms
              </Label>
              <Textarea
                id="symptoms"
                name="symptoms"
                placeholder="e.g., 'For the last three days, I've had a sharp pain in my lower back, a mild but persistent headache, and I've been feeling unusually tired...'"
                rows={8}
                required
                minLength={10}
                className="text-base"
              />
            </div>
            {state.error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Input Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <div className="animate-in fade-in-50 duration-500">
        {pending && <ResultsSkeleton />}

        {!pending && state.data && (
          <Card className="border-primary/40 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lightbulb className="text-primary" />
                AI Analysis & Recommendation
              </CardTitle>
              <CardDescription>
                This is a preliminary analysis based on your symptoms and not a
                medical diagnosis. Please consult with a qualified doctor.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-background rounded-xl border-2 border-accent/50 shadow-sm">
                <h3 className="font-semibold flex items-center gap-2 text-lg mb-2">
                  <ShieldCheck className="text-accent" /> Recommended Specialist
                </h3>
                <p className="text-3xl font-bold text-accent">
                  {state.data.recommendedSpecialization}
                </p>
                <div className="mt-3">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Analysis Confidence
                  </p>
                  <div className="flex items-center gap-3">
                    <Progress
                      value={state.data.confidenceScore * 100}
                      className="w-full h-2"
                    />
                    <span className="font-bold text-base text-accent">
                      {(state.data.confidenceScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-background rounded-xl border">
                <h3 className="font-semibold flex items-center gap-2 text-lg mb-3">
                  <List /> Possible Medical Issues
                </h3>
                <ul className="space-y-3">
                  {state.data.possibleIssues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-4">
              <p className="text-sm text-center text-muted-foreground">
                Ready for the next step?
              </p>
              <Button asChild size="lg">
                <Link
                  href={`/patient/doctors?specialization=${encodeURIComponent(
                    state.data.recommendedSpecialization
                  )}`}
                >
                  Find a {state.data.recommendedSpecialization}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}

        {!pending && !state.data && (
          <Card className="flex flex-col justify-center items-center text-center p-8 lg:p-16 border-dashed">
            <div className="p-4 bg-secondary rounded-full mb-4">
              <HeartPulse className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">
              Your Health Analysis Awaits
            </h2>
            <p className="text-muted-foreground mt-2 max-w-sm">
              Fill out your symptoms on the left, and our AI will provide a
              preliminary analysis and recommend a specialist to consult.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
