'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating personalized quizzes.
 *
 * - generatePersonalizedQuiz - A function that handles the personalized quiz generation process.
 * - GeneratePersonalizedQuizInput - The input type for the generatePersonalizedQuiz function.
 * - GeneratePersonalizedQuizOutput - The return type for the generatePersonalizedQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedQuizInputSchema = z.object({
  topic: z.string().describe('The quantum computing topic for the quiz.'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).describe('The desired difficulty level for the quiz.'),
  userPerformanceData: z.string().describe('A summary of the user\u0027s past performance, including areas of strength and weakness, to personalize the quiz.'),
});
export type GeneratePersonalizedQuizInput = z.infer<typeof GeneratePersonalizedQuizInputSchema>;

const QuizQuestionSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).describe('An array of multiple-choice options for the question.'),
  correctAnswer: z.string().describe('The correct answer option string.'),
  explanation: z.string().describe('A detailed explanation for the correct answer.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The perceived difficulty of this specific question.'),
});

const GeneratePersonalizedQuizOutputSchema = z.object({
  quizTitle: z.string().describe('The title of the generated personalized quiz.'),
  questions: z.array(QuizQuestionSchema).describe('An array of personalized quiz questions.'),
});
export type GeneratePersonalizedQuizOutput = z.infer<typeof GeneratePersonalizedQuizOutputSchema>;

export async function generatePersonalizedQuiz(input: GeneratePersonalizedQuizInput): Promise<GeneratePersonalizedQuizOutput> {
  return aiPersonalizedQuizFlow(input);
}

const personalizedQuizPrompt = ai.definePrompt({
  name: 'personalizedQuizPrompt',
  input: {schema: GeneratePersonalizedQuizInputSchema},
  output: {schema: GeneratePersonalizedQuizOutputSchema},
  prompt: `You are the friendly AI Quantum Professor from the educational platform QuantumVerse.\nYour goal is to create a highly personalized and effective quiz for a student.\n\nThe student has requested a quiz on the quantum computing topic: "{{{topic}}}".\nThe desired overall difficulty level for this quiz is "{{{difficulty}}}".\n\nHere is a summary of the student's past performance and learning history:\n{{{userPerformanceData}}}\n\nBased on this information, please generate a quiz that:\n1. Focuses on the student's identified weak areas within the "{{{topic}}}" to help them strengthen their understanding.\n2. Reinforces concepts where the student is strong, ensuring a comprehensive review.\n3. Aligns with the overall desired "{{{difficulty}}}" level, but individual questions can vary in difficulty (easy, medium, hard) as appropriate for personalization.\n4. Consists of multiple-choice questions.\n5. Provides a detailed explanation for each correct answer to aid learning.\n\nStructure the output as a JSON object with a 'quizTitle' and an array of 'questions', where each question has 'questionText', 'options', 'correctAnswer', 'explanation', and 'difficulty'.`,
});

const aiPersonalizedQuizFlow = ai.defineFlow(
  {
    name: 'aiPersonalizedQuizFlow',
    inputSchema: GeneratePersonalizedQuizInputSchema,
    outputSchema: GeneratePersonalizedQuizOutputSchema,
  },
  async (input) => {
    const {output} = await personalizedQuizPrompt(input);
    return output!;
  }
);
