import { serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { join } from 'node:path';
import { z } from 'zod';
import { ExerciseSchema } from './exercise.js';
import { ExerciseProgressTracker } from './exerciseProgressTracker.js';

const tracker = new ExerciseProgressTracker(
  join(import.meta.dirname, '../../../db.csv'),
);

export const app = new Hono()
  .get('/api', async (c) => {
    const students = await tracker.students();
    return c.json(students);
  })
  .get('/api/:id', async (c) => {
    const id = c.req.param('id');
    const student = await tracker.get(id);
    return student != null ? c.json(student) : c.notFound();
  })
  .post(
    '/api/:id/check',
    zValidator(
      'form',
      z.object({
        exercise: ExerciseSchema,
      }),
    ),
    async (c) => {
      const id = c.req.param('id');
      const { exercise } = c.req.valid('form');
      return c.json(await tracker.check(id, exercise));
    },
  )
  .post(
    '/api/:id/uncheck',
    zValidator(
      'form',
      z.object({
        exercise: ExerciseSchema,
      }),
    ),
    async (c) => {
      const id = c.req.param('id');
      const { exercise } = c.req.valid('form');
      return c.json(await tracker.check(id, exercise));
    },
  );
