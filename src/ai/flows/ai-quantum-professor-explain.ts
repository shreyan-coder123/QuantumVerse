'use server';
/**
 * @fileOverview This file implements a Genkit flow for the AI Quantum Professor.
 * It allows learners to ask questions about quantum computing and receive simplified explanations.
 *
 * - explainConcept - A function to ask the AI Quantum Professor a question.
 * - AIQuantumProfessorExplainInput - The input type for the explainConcept function.
 * - AIQuantumProfessorExplainOutput - The return type for the explainConcept function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIQuantumProfessorExplainInputSchema = z.object({
  question: z.string().describe('The quantum computing question the learner is asking.'),
  currentUnderstandingLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('The current understanding level of the learner, to tailor the explanation.'),
});
export type AIQuantumProfessorExplainInput = z.infer<typeof AIQuantumProfessorExplainInputSchema>;

const AIQuantumProfessorExplainOutputSchema = z.object({
  explanation: z.string().describe('A clear, simplified explanation tailored to the learner\'s understanding level.'),
});
export type AIQuantumProfessorExplainOutput = z.infer<typeof AIQuantumProfessorExplainOutputSchema>;

export async function explainConcept(input: AIQuantumProfessorExplainInput): Promise<AIQuantumProfessorExplainOutput> {
  return aiQuantumProfessorExplainFlow(input);
}

const aiQuantumProfessorExplainPrompt = ai.definePrompt({
  name: 'aiQuantumProfessorExplainPrompt',
  input: { schema: AIQuantumProfessorExplainInputSchema },
  output: { schema: AIQuantumProfessorExplainOutputSchema },
  prompt: `You are the friendly AI Quantum Professor from "QuantumVerse". Your goal is to explain complex quantum computing concepts in a clear, simple, and engaging way, tailored to the learner's current understanding level.

Here is the learner's question and their current understanding level:

Question: {{{question}}}
Understanding Level: {{{currentUnderstandingLevel}}}

Please provide a concise explanation, avoiding overly technical jargon where possible, and using analogies appropriate for a {{{currentUnderstandingLevel}}} level learner. Focus on answering the question directly and helpfully.`,
});

const aiQuantumProfessorExplainFlow = ai.defineFlow(
  {
    name: 'aiQuantumProfessorExplainFlow',
    inputSchema: AIQuantumProfessorExplainInputSchema,
    outputSchema: AIQuantumProfessorExplainOutputSchema,
  },
  async (input) => {
    const { output } = await aiQuantumProfessorExplainPrompt(input);
    return output!;
  }
);
