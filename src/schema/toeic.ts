import { z } from 'zod';

// Part 1: Photographs (6 questions)
export const Part1QuestionSchema = z.object({
  id: z.string(),
  number: z.number(),
  image: z.string(),
  audioUrl: z.string(),
  options: z.record(z.string(), z.string()),
  correctAnswer: z.string(),
  transcript: z.string().optional(),
  explanation: z.string().optional(),
  questionType: z.string().optional(),
  subCategory: z.string().optional(),
});
export const Part1DataSchema = z.array(Part1QuestionSchema);

// Part 2: Question-Response (25 questions)
export const Part2QuestionSchema = z.object({
  id: z.string(),
  number: z.number(),
  audioUrl: z.string(),
  options: z.record(z.string(), z.string()),
  correctAnswer: z.string(),
  transcript: z.string().optional(),
  explanation: z.string().optional(),
  questionType: z.string().optional(),
  subCategory: z.string().optional(),
});
export const Part2DataSchema = z.array(Part2QuestionSchema);

// Listening Sub-Question Schema (Part 3 & 4)
export const ListeningSubQuestionSchema = z.object({
  id: z.string(),
  number: z.number(),
  text: z.string(),
  options: z.record(z.string(), z.string()),
  correctAnswer: z.string(),
  explanation: z.string().optional(),
  questionType: z.string().optional(),
  subCategory: z.string().optional(),
});

// Part 3: Short Conversations (13 sets)
export const Part3SetSchema = z.object({
  id: z.string(),
  audioUrl: z.string(),
  image: z.string().optional(),
  context: z.string().optional(),
  transcript: z.string().optional(),
  questions: z.array(ListeningSubQuestionSchema),
});
export const Part3DataSchema = z.array(Part3SetSchema);

// Part 4: Short Talks (10 sets)
export const Part4SetSchema = z.object({
  id: z.string(),
  audioUrl: z.string(),
  image: z.string().optional(),
  context: z.string().optional(),
  transcript: z.string().optional(),
  questions: z.array(ListeningSubQuestionSchema),
});
export const Part4DataSchema = z.array(Part4SetSchema);

export const Part5QuestionSchema = z.object({
  id: z.string(),
  number: z.number(),
  text: z.string(),
  options: z.record(z.string(), z.string()), // A: "...", B: "..."
  correctAnswer: z.string(),
  explanation: z.string(),
  type: z.string().optional(),
  subCategory: z.string().optional(),
  grammarTag: z.string().optional(),
});

export const Part5DataSchema = z.array(Part5QuestionSchema);

export const Part6QuestionSchema = z.object({
  id: z.string(),
  number: z.number(),
  text: z.string(),
  options: z.record(z.string(), z.string()),
  correctAnswer: z.string(),
  explanation: z.string(),
  type: z.string().optional(),
  blankNumber: z.number().optional(),
  subCategory: z.string().optional(),
  grammarTag: z.string().optional(),
});

export const Part6PassageSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string(),
  content: z.string(),
  source: z.string().optional(),
  questions: z.array(Part6QuestionSchema),
});

export const Part6DataSchema = z.array(Part6PassageSchema);

export const Part7QuestionSchema = z.object({
  id: z.string(),
  number: z.number(),
  text: z.string(),
  options: z.record(z.string(), z.string()),
  correctAnswer: z.string(),
  explanation: z.string(),
  questionType: z.string().optional(),
  subCategory: z.string().optional(),
  strategyHint: z.string().optional(),
});

export const Part7PassageSetSchema = z.object({
  id: z.string(),
  type: z.string(), // Single, Double, Triple
  source: z.string().optional(),
  passages: z.array(z.object({
    id: z.string(),
    type: z.string(),
    title: z.string(),
    content: z.string(),
    sender: z.string().optional(),
    recipient: z.string().optional(),
    date: z.string().optional(),
  })),
  questions: z.array(Part7QuestionSchema),
});

export const Part7DataSchema = z.array(Part7PassageSetSchema);

// Tests index schema
export const TestIndexSchema = z.array(z.object({
  id: z.string(), // "ets2022_test1"
  name: z.string(), // "ETS 2022 - Test 1"
  year: z.number(), // 2022
  path: z.string(), // "/data/ets2022/test1"
}));

export type Part1Question = z.infer<typeof Part1QuestionSchema>;
export type Part2Question = z.infer<typeof Part2QuestionSchema>;
export type ListeningSubQuestion = z.infer<typeof ListeningSubQuestionSchema>;
export type Part3Set = z.infer<typeof Part3SetSchema>;
export type Part4Set = z.infer<typeof Part4SetSchema>;

export type Part5Question = z.infer<typeof Part5QuestionSchema>;
export type Part6Question = z.infer<typeof Part6QuestionSchema>;
export type Part6Passage = z.infer<typeof Part6PassageSchema>;
export type Part7Question = z.infer<typeof Part7QuestionSchema>;
export type Part7PassageSet = z.infer<typeof Part7PassageSetSchema>;
export type TestIndex = z.infer<typeof TestIndexSchema>;

// Normalized type after component adds blankNumber
export type NormalizedPart6Question = Part6Question & { blankNumber: number };
export type NormalizedPart6Passage = Omit<Part6Passage, 'questions'> & {
  questions: NormalizedPart6Question[];
};
