'use server';
/**
 * @fileOverview This file implements a Genkit flow for simulating quantum code execution.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExecuteCodeInputSchema = z.object({
  code: z.string().describe('The quantum code to execute.'),
  language: z.enum(['python', 'qiskit', 'cirq']).describe('The programming language/framework used.'),
});

const ExecuteCodeOutputSchema = z.object({
  logs: z.string().describe('Standard output logs from the execution.'),
  measurements: z.record(z.number()).optional().describe('Probabilities of measurement outcomes (e.g., {"00": 0.5, "11": 0.5}).'),
  explanation: z.string().describe('A brief explanation of what the code achieved.'),
  circuitDiagram: z.string().optional().describe('An ASCII or descriptive representation of the quantum circuit.'),
});

export async function simulateExecution(input: z.infer<typeof ExecuteCodeInputSchema>) {
  return aiSimulateExecutionFlow(input);
}

const simulateExecutionPrompt = ai.definePrompt({
  name: 'simulateExecutionPrompt',
  input: { schema: ExecuteCodeInputSchema },
  output: { schema: ExecuteCodeOutputSchema },
  prompt: `You are a Quantum Computing Runtime Simulator.
The user has provided code in {{language}}:

\`\`\`{{language}}
{{code}}
\`\`\`

Analyze this code and simulate its execution as if it ran on a quantum simulator.
1. Provide standard output logs (e.g., "Job status: completed", "Simulation successful").
2. If it measures qubits, provide a dictionary of probabilities (e.g., {"00": 0.5, "11": 0.5}).
3. Explain what the code does in one or two sentences.
4. If applicable, provide a simple ASCII representation of the circuit.

Focus on accuracy to the {{language}} syntax and quantum mechanics principles.`,
});

const aiSimulateExecutionFlow = ai.defineFlow(
  {
    name: 'aiSimulateExecutionFlow',
    inputSchema: ExecuteCodeInputSchema,
    outputSchema: ExecuteCodeOutputSchema,
  },
  async (input) => {
    const { output } = await simulateExecutionPrompt(input);
    return output!;
  }
);
