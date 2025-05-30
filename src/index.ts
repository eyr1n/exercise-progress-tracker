import { serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { ExerciseSchema } from './exercise.js';
import { ExerciseProgressTracker } from './exerciseProgressTracker.js';

const tracker = new ExerciseProgressTracker('db.csv');

const app = new Hono();

app.get('/api', async (c) => {
  const students = await tracker.students();
  return c.json(students);
});

app.get('/api/:id', async (c) => {
  const id = c.req.param('id');
  const student = await tracker.get(id);
  return student != null ? c.json(student) : c.notFound();
});

app.post(
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
);

app.post(
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

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
