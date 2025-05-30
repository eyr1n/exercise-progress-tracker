import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { CSVDatabase } from './csv_database.js';
import { Student } from './student.js';

const db = new CSVDatabase(Student, 'id', 'db.csv');

const app = new Hono();

app.get('/', async (c) => {
  const records = await db.records();
  return c.text(JSON.stringify(records));
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
