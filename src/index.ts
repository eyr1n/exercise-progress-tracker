import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { CSVDatabase } from './csv_database.js';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
  group: z.string(),
  ex1: z.enum(['', 'x']).optional(),
  ex2: z.enum(['', 'x']).optional(),
  ex3: z.enum(['', 'x']).optional(),
  ex4: z.enum(['', 'x']).optional(),
  ex5: z.enum(['', 'x']).optional(),
});

const db = new CSVDatabase(schema, 'id', 'db.csv');

const app = new Hono();

app.get('/', async (c) => {
  const record = await db.get('M211808');
  return c.text(JSON.stringify(record));
});

app.get('/set', async (c) => {
  const record = await db.get('M211808');
  if (record == null) {
    return;
  }
  record.ex1 = 'x';
  await db.set('M211808', record);
  return c.text(JSON.stringify(record));
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
