
'use server';
/**
 * @fileOverview Genkit flow for solving and explaining quantum equations.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SolveEquationInputSchema = z.object({
  equationType: z.enum(['schrodinger', 'matrix', 'tensor', 'custom']),
  inputData: z.string().describe('The equation string or parameters to solve.'),
});

const SolveEquationOutputSchema = z.object({
  latex: z.string().describe('The formatted LaTeX representation of the equation/solution.'),
  steps: z.array(z.string()).describe('Step-by-step breakdown of the solution.'),
  explanation: z.string().describe('Conceptual explanation of the result.'),
  visualizationHint: z.string().optional().describe('Advice on how to visualize this result.'),
});

export async function solveEquation(input: z.infer<typeof SolveEquationInputSchema>) {
  return solveEquationFlow(input);
}

const solveEquationPrompt = ai.definePrompt({
  name: 'solveEquationPrompt',
  input: { schema: SolveEquationInputSchema },
  output: { schema: SolveEquationOutputSchema },
  prompt: `You are a Quantum Physics and Mathematics Professor.
The user wants to solve or understand a quantum equation:

Type: {{equationType}}
Input: {{inputData}}

Tasks:
1. Provide a beautiful LaTeX string (compatible with KaTeX) of the final result or the fully expanded equation.
2. Break down the solution or explanation into clear, numbered steps.
3. Explain the physical significance of this operation or equation in quantum computing.
4. If it's a matrix or tensor product, show the intermediate results.

Focus on accuracy and clear mathematical notation.`,
});

const solveEquationFlow = ai.defineFlow(
  {
    name: 'solveEquationFlow',
    inputSchema: SolveEquationInputSchema,
    outputSchema: SolveEquationOutputSchema,
  },
  async (input) => {
    const { output } = await solveEquationPrompt(input);
    return output!;
  }
);
