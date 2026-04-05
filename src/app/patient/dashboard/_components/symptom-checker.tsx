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
  WandSparkles,
  Loader2,
  BrainCircuit,
  ListChecks,
  UserCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Bot,
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
    <Button type="submit" disabled={pending} className="w-full font-bold text-lg" size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Cooking...
        </>
      ) : (
        <>
          <WandSparkles className="mr-2 h-5 w-5" /> Get the Lowdown
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
      <Card className="lg:sticky lg:top-24 bg-card/80 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <WandSparkles className="w-7 h-7 text-primary" />
            Spill the Symptoms
          </CardTitle>
          <CardDescription>
            Go on, don&apos;t be shy. The more deets you give the AI, the better it can read the vibes.
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
                placeholder="e.g., 'lowkey been having this headache for 3 days, my back is acting up, and I'm tired af...'"
                rows={8}
                required
                minLength={10}
                className="text-base bg-background/50 border-2 border-dashed focus-visible:border-solid focus-visible:border-primary"
              />
            </div>
            {state.error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Whoops!</AlertTitle>
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
          <Card className="border-accent/40 bg-gradient-to-br from-accent/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BrainCircuit className="text-accent" />
                AI Vibe Check
              </CardTitle>
              <CardDescription>
                Quick heads up: I&apos;m just a bot, not a doc. Def get a real one to check you out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-background/50 rounded-xl border-2 border-primary/50 shadow-lg">
                <h3 className="font-semibold flex items-center gap-2 text-base mb-2 text-primary">
                  <UserCheck /> Main Character
                </h3>
                <p className="text-3xl font-bold">
                  {state.data.recommendedSpecialization}
                </p>
                <div className="mt-3">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Confidence Level
                  </p>
                  <div className="flex items-center gap-3">
                    <Progress
                      value={state.data.confidenceScore * 100}
                      className="w-full h-3 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent"
                    />
                    <span className="font-bold text-lg">
                      {(state.data.confidenceScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-background/50 rounded-xl border">
                <h3 className="font-semibold flex items-center gap-2 text-lg mb-3">
                  <ListChecks /> The TL;DR
                </h3>
                <ul className="space-y-3">
                  {state.data.possibleIssues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-4">
              <p className="text-sm text-center text-muted-foreground">
                Aight, what&apos;s next?
              </p>
              <Button asChild size="lg" className="font-bold text-lg">
                <Link
                  href={`/patient/doctors?specialization=${encodeURIComponent(
                    state.data.recommendedSpecialization
                  )}`}
                >
                  Find a {state.data.recommendedSpecialization}{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}

        {!pending && !state.data && (
           <div className="flex flex-col justify-center items-center text-center p-8 lg:p-16 border-2 border-dashed rounded-2xl">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Bot className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">The AI is waiting...</h2>
            <p className="text-muted-foreground mt-2 max-w-sm">
                Drop your symptoms on the left and see what it thinks. No judgment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
