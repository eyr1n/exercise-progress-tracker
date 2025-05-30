import { z } from 'zod';

export const ExerciseSchema = z.enum(['ex1', 'ex2', 'ex3', 'ex4', 'ex5']);

export type Exercise = z.infer<typeof ExerciseSchema>;
