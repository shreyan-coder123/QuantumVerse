'use server';
/**
 * @fileOverview This file implements a Genkit flow for curating and summarizing quantum computing news.
 *
 * - getQuantumNews - A function that returns a curated list of summarized quantum news.
 * - QuantumNewsInput - The input type (optional filters).
 * - QuantumNewsOutput - The return type containing a list of news items.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuantumNewsItemSchema = z.object({
  title: z.string().describe('The headline of the news article.'),
  source: z.enum(['IBM Quantum', 'Google Quantum AI', 'Microsoft Quantum', 'Research Paper', 'Industry News']).describe('The source of the news.'),
  summary: z.string().describe('A concise, AI-generated summary of the update.'),
  date: z.string().describe('The publication date or relative time (e.g., "2 hours ago").'),
  importance: z.enum(['high', 'medium', 'low']).describe('The impact level of this news on the field.'),
  link: z.string().optional().describe('A mock or real link to the source.'),
});

const QuantumNewsOutputSchema = z.object({
  news: z.array(QuantumNewsItemSchema).describe('A list of curated and summarized quantum news items.'),
});

export async function getQuantumNews() {
  return aiQuantumNewsFlow({});
}

const quantumNewsPrompt = ai.definePrompt({
  name: 'quantumNewsPrompt',
  input: { schema: z.object({}) },
  output: { schema: QuantumNewsOutputSchema },
  prompt: `You are a Quantum Industry Analyst. 
Generate a curated list of 5-7 "latest" (simulated but realistic based on current trends) news items from the quantum computing world. 
Include updates from:
- IBM Quantum (e.g., Condor processor, utility-scale systems)
- Google Quantum AI (e.g., error correction milestones, Sycamore updates)
- Microsoft Quantum (e.g., topological qubits, Azure Quantum elements)
- Recent research papers (e.g., Nature/Science publications on entanglement or algorithms)

For each item, provide:
1. A catchy headline.
2. The specific source.
3. A 2-sentence summary that explains why this matters to a student.
4. A realistic recent date.
5. An importance level.

Ensure the tone is professional yet exciting for learners.`,
});

const aiQuantumNewsFlow = ai.defineFlow(
  {
    name: 'aiQuantumNewsFlow',
    inputSchema: z.object({}),
    outputSchema: QuantumNewsOutputSchema,
  },
  async (input) => {
    const { output } = await quantumNewsPrompt(input);
    return output!;
  }
);
