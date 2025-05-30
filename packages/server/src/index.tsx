import { serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { ExerciseSchema } from './exercise.js';
import { ExerciseProgressTracker } from './exerciseProgressTracker.js';
import { join } from 'node:path';
import { Layout } from './Layout.js';
import { jsxRenderer } from 'hono/jsx-renderer';

const tracker = new ExerciseProgressTracker(
  join(import.meta.dirname, '../../../db.csv'),
);

const app = new Hono();

app.get(
  '/*',
  jsxRenderer(({ children }) => {
    return <Layout>{children}</Layout>;
  }),
);

app.get('/', async (c) => {
  const students = await tracker.students();
  return c.render(
    <>
      <input id="id" type="text" />
      <button type="button">完了確認</button>
      <button type="button">訂正</button>
      <table>
        <thead>
          <tr>
            <th scope="col">学籍番号</th>
            <th scope="col">名前</th>
            <th scope="col">グループ</th>
            <th scope="col">ex1</th>
            <th scope="col">ex2</th>
            <th scope="col">ex3</th>
            <th scope="col">ex4</th>
            <th scope="col">ex5</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.group}</td>
              <td>{student.ex1}</td>
              <td>{student.ex2}</td>
              <td>{student.ex3}</td>
              <td>{student.ex4}</td>
              <td>{student.ex5}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <script type="text/javascript">
        const idElm = document.querySelector("#id");
      </script>
    </>,
  );
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
