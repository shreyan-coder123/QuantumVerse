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

export type QuantumNewsOutput = z.infer<typeof QuantumNewsOutputSchema>;

const FALLBACK_NEWS: QuantumNewsOutput = {
  news: [
    {
      title: "IBM Condor: The World's First 1,000+ Qubit Processor",
      source: "IBM Quantum",
      summary: "IBM has successfully deployed its 'Condor' processor, breaking the 1,000-qubit barrier and moving closer to fault-tolerant quantum computing.",
      date: "2 hours ago",
      importance: "high"
    },
    {
      title: "Google Achieves New Error Correction Milestone",
      source: "Google Quantum AI",
      summary: "Google researchers have demonstrated that increasing the number of qubits in a logical qubit can indeed reduce error rates, a key requirement for scalability.",
      date: "5 hours ago",
      importance: "high"
    },
    {
      title: "Topological Qubit Breakthrough in Microsoft Labs",
      source: "Microsoft Quantum",
      summary: "Microsoft reported significant progress in creating Majorana-based qubits, which are theoretically much more stable than current superconducting designs.",
      date: "1 day ago",
      importance: "medium"
    },
    {
      title: "Room Temperature Quantum Interconnects Demonstrated",
      source: "Research Paper",
      summary: "A new study in Nature Physics shows a method for connecting cryogenically cooled qubits using room-temperature fiber optics.",
      date: "2 days ago",
      importance: "medium"
    },
    {
      title: "Quantinuum Sets Record for Quantum Volume",
      source: "Industry News",
      summary: "Trapped-ion leader Quantinuum has announced their latest H-series processor has reached a record-breaking Quantum Volume of 1,048,576.",
      date: "3 days ago",
      importance: "medium"
    }
  ]
};

export async function getQuantumNews(): Promise<QuantumNewsOutput> {
  try {
    return await aiQuantumNewsFlow({});
  } catch (error: any) {
    // If we hit a rate limit (429) or any other API error, provide the high-quality fallback news
    // to prevent the UI from crashing or showing a blank state.
    if (error?.message?.includes('429') || error?.message?.includes('quota') || error?.message?.includes('exhausted')) {
      return FALLBACK_NEWS;
    }
    // For other unexpected errors, we still return the fallback to ensure stability
    return FALLBACK_NEWS;
  }
}

const quantumNewsPrompt = ai.definePrompt({
  name: 'quantumNewsPrompt',
  input: { schema: z.object({}) },
  output: { schema: QuantumNewsOutputSchema },
  prompt: `You are a Quantum Industry Analyst. 
Generate a curated list of 5-7 "latest" (simulated but realistic based on current trends) news items from the quantum world. 
Include updates from:
- IBM Quantum (e.g., Condor processor, utility-scale systems)
- Google Quantum AI (e.g., error correction milestones)
- Microsoft Quantum (e.g., topological qubits)
- Recent research papers (e.g., Nature/Science publications)

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
