
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { db, TodoRow } from './db.js';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';

const usePretty = process.env.USE_PRETTY_LOGS === '1';
const log = usePretty ? pino({ transport: { target: 'pino-pretty' } }) : pino();


type Todo = { id: string; title: string; done: boolean };
const CreateTodo = z.object({ title: z.string().min(1), done: z.boolean().optional() });
const UpdateTodo = z.object({ title: z.string().min(1).optional(), done: z.boolean().optional() });


const app = express();
app.use(helmet());
app.use(express.json());


app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? true,
    credentials: false,
  })
);


app.use(
  rateLimit({
    windowMs: 60_000, 
    max: 120,         
    standardHeaders: true,
    legacyHeaders: false,
  })
);


app.use(express.static('public'));


const openapiPath = path.join(process.cwd(), 'openapi.json');
if (fs.existsSync(openapiPath)) {
  const openapi = JSON.parse(fs.readFileSync(openapiPath, 'utf8'));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));
}


app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.get('/todos', (_req, res) => {
  const rows = db.prepare('SELECT id, title, done FROM todos ORDER BY rowid DESC').all() as TodoRow[];
  const data: Todo[] = rows.map(r => ({ id: r.id, title: r.title, done: !!r.done }));
  res.json(data);
});

app.post('/todos', (req, res) => {
  const parsed = CreateTodo.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_body', issues: parsed.error.issues });

  const id = crypto.randomUUID();
  db.prepare('INSERT INTO todos (id, title, done) VALUES (?, ?, ?)').run(id, parsed.data.title, parsed.data.done ? 1 : 0);
  const row = db.prepare('SELECT id, title, done FROM todos WHERE id = ?').get(id) as TodoRow;
  res.status(201).json({ id: row.id, title: row.title, done: !!row.done } as Todo);
});

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const parsed = UpdateTodo.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_body', issues: parsed.error.issues });

  const row = db.prepare('SELECT id FROM todos WHERE id = ?').get(id) as { id: string } | undefined;
  if (!row) return res.status(404).json({ error: 'not_found' });

  if (parsed.data.title !== undefined) {
    db.prepare('UPDATE todos SET title = ? WHERE id = ?').run(parsed.data.title, id);
  }
  if (parsed.data.done !== undefined) {
    db.prepare('UPDATE todos SET done = ? WHERE id = ?').run(parsed.data.done ? 1 : 0, id);
  }
  const updated = db.prepare('SELECT id, title, done FROM todos WHERE id = ?').get(id) as TodoRow;
  res.json({ id: updated.id, title: updated.title, done: !!updated.done } as Todo);
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const info = db.prepare('DELETE FROM todos WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'not_found' });
  res.status(204).send();
});

app.use((_req, res) => res.status(404).json({ error: 'not_found' }));

const PORT = Number(process.env.PORT || 3000);
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => log.info({ PORT }, 'todo_list_api_started'));
}
export default app;
