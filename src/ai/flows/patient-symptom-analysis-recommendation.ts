'use server';
/**
 * @fileOverview An AI agent for analyzing patient symptoms and recommending a doctor specialization.
 *
 * - patientSymptomAnalysisAndRecommendation - A function that handles the symptom analysis and recommendation process.
 * - PatientSymptomAnalysisInput - The input type for the patientSymptomAnalysisAndRecommendation function.
 * - PatientSymptomAnalysisOutput - The return type for the patientSymptomAnalysisAndRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PatientSymptomAnalysisInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A detailed description of the patient\'s symptoms.'),
});
export type PatientSymptomAnalysisInput = z.infer<
  typeof PatientSymptomAnalysisInputSchema
>;

const PatientSymptomAnalysisOutputSchema = z.object({
  possibleIssues: z
    .array(z.string())
    .describe('A list of possible medical issues based on the symptoms.'),
  recommendedSpecialization: z
    .string()
    .describe('The recommended doctor specialization (e.g., "Dermatologist", "General Practitioner").'),
  confidenceScore: z
    .number()
    .min(0)
    .max(1)
    .describe('A confidence score (0-1) in the AI\'s recommendation.'),
});
export type PatientSymptomAnalysisOutput = z.infer<
  typeof PatientSymptomAnalysisOutputSchema
>;

export async function patientSymptomAnalysisAndRecommendation(
  input: PatientSymptomAnalysisInput
): Promise<PatientSymptomAnalysisOutput> {
  return patientSymptomAnalysisAndRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'patientSymptomAnalysisPrompt',
  input: {schema: PatientSymptomAnalysisInputSchema},
  output: {schema: PatientSymptomAnalysisOutputSchema},
  prompt: `You are a medical assistant AI. Analyze the patient's symptoms carefully and provide a list of possible medical issues, a single recommended doctor specialization, and a confidence score for your recommendation.

Be concise and focus on common conditions relevant to the symptoms provided. The confidence score should reflect how certain you are about the suggested issues and specialization based on the input.

Symptoms: {{{symptoms}}}`,
});

const patientSymptomAnalysisAndRecommendationFlow = ai.defineFlow(
  {
    name: 'patientSymptomAnalysisAndRecommendationFlow',
    inputSchema: PatientSymptomAnalysisInputSchema,
    outputSchema: PatientSymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
