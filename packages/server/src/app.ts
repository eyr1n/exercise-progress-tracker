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
  .get('/', async (c) => {
    const students = await tracker.students();
    return c.json(students);
  })
  .get('/:id', async (c) => {
    const id = c.req.param('id');
    const student = await tracker.get(id);
    return student != null ? c.json(student) : c.notFound();
  })
  .post(
    '/:id',
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
      return c.json(await tracker.set(id, exercises));
    },
  )
  .post(
    '/:id/:exercise',
    zValidator(
      'param',
      z.object({
        id: z.string(),
        exercise: ExerciseSchema,
      }),
    ),
    async (c) => {
      const { id, exercise } = c.req.valid('param');
      return c.json(await tracker.check(id, exercise));
    },
  );
