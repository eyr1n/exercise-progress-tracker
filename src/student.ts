import { z } from 'zod';

export const StudentSchema = z.object({
  id: z.string(),
  group: z.string(),
  name: z.string(),
  ex1: z.enum(['', 'x']),
  ex2: z.enum(['', 'x']),
  ex3: z.enum(['', 'x']),
  ex4: z.enum(['', 'x']),
  ex5: z.enum(['', 'x']),
});

export type Student = z.infer<typeof StudentSchema>;
