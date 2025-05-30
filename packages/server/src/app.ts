import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { join } from 'node:path';
import { z } from 'zod';
import { ExerciseProgressTracker } from './exerciseProgressTracker.js';
import {
  ExerciseSchema,
  StudentSchema,
  type Exercise,
} from './schemas/index.js';
import { cors } from 'hono/cors';

const tracker = new ExerciseProgressTracker(
  join(import.meta.dirname, '../../../db.csv'),
);

export const app = new Hono()
  .use('/*', cors())
  .get('/students', async (c) => {
    const students = await tracker.students();
    return c.json(students);
  })
  .get('/student/:id', async (c) => {
    const id = c.req.param('id');
    return c.json(await tracker.get(id));
  })
  .post(
    '/check/:id/:exercise',
    zValidator(
      'param',
      z.object({
        id: z.string(),
        exercise: ExerciseSchema,
      }),
    ),
    async (c) => {
      const { id, exercise } = c.req.valid('param');
      await tracker.check(id, exercise);
      return c.json(await tracker.get(id));
    },
  )
  .post(
    '/edit/:id',
    zValidator(
      'json',
      StudentSchema.pick(
        Object.fromEntries(
          ExerciseSchema.options.map((key) => [key, true]),
        ) as Record<Exercise, true>,
      ),
    ),
    async (c) => {
      const id = c.req.param('id');
      const exercises = c.req.valid('json');
      await tracker.set(id, exercises);
      return c.json(await tracker.get(id));
    },
  );
