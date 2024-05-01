import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { expensesRoute } from './routes/expenses';

const app = new Hono();

app.use(logger());
app.use(cors());

app.get('/', (c) => {
  return c.json({ message: 'Hello, World!!' });
});

app.route('/api/expenses', expensesRoute);

export default app;
