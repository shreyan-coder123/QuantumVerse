'use server';
/**
 * @fileOverview This file implements a Genkit flow for the AI Quantum Professor
 * to provide intelligent hints for coding challenges without giving direct solutions.
 *
 * - getAiCodingHint - A function that handles the generation of coding hints.
 * - AiCodingHintInput - The input type for the getAiCodingHint function.
 * - AiCodingHintOutput - The return type for the getAiCodingHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCodingHintInputSchema = z.object({
  challengeDescription: z
    .string()
    .describe('The full description of the quantum coding challenge.'),
  userCode: z
    .string()
    .describe('The user\u2019s current code attempt for the challenge.'),
  errorMessage: z
    .string()
    .optional()
    .describe('Any error message encountered during the execution of the user\u2019s code.'),
});
export type AiCodingHintInput = z.infer<typeof AiCodingHintInputSchema>;

const AiCodingHintOutputSchema = z.object({
  hint: z
    .string()
    .describe(
      'A helpful, intelligent hint that guides the user towards solving the problem without revealing the direct solution.'
    ),
  isConceptualHint: z
    .boolean()
    .optional()
    .describe('True if the hint is focused on a conceptual understanding rather than code syntax.'),
  suggestedFocusArea: z
    .string()
    .optional()
    .describe('Suggests a specific area the user should focus on (e.g., \u201cquantum gates,\u201d \u201ccircuit structure,\u201d \u201cerror handling\u201d).'),
});
export type AiCodingHintOutput = z.infer<typeof AiCodingHintOutputSchema>;

export async function getAiCodingHint(input: AiCodingHintInput): Promise<AiCodingHintOutput> {
  return aiCodingHintFlow(input);
}

const aiCodingHintPrompt = ai.definePrompt({
  name: 'aiCodingHintPrompt',
  input: {schema: AiCodingHintInputSchema},
  output: {schema: AiCodingHintOutputSchema},
  prompt: `You are the friendly AI Quantum Professor, an expert in quantum computing.
Your role is to provide intelligent, guiding hints for coding challenges without giving away the direct solution. Encourage independent problem-solving.

Consider the following information to formulate your hint:

Coding Challenge Description:
{{{challengeDescription}}}

User's Current Code Attempt:
\`\`\`python
{{{userCode}}}
\`\`\`

{{#if errorMessage}}
Error Message from Execution:
{{{errorMessage}}}
{{/if}}

Based on the challenge, the user's code, and any errors, provide a concise and helpful hint. Focus on guiding the user's thought process or pointing them to a relevant concept or part of their code without directly giving the answer. If an error is present, prioritize addressing that to help the user debug. Structure your hint to be encouraging and educational.`,
});

const aiCodingHintFlow = ai.defineFlow(
  {
    name: 'aiCodingHintFlow',
    inputSchema: AiCodingHintInputSchema,
    outputSchema: AiCodingHintOutputSchema,
  },
  async input => {
    const {output} = await aiCodingHintPrompt(input);
    return output!;
  }
);
