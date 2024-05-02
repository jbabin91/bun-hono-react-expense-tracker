import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';

import { expensesRoute } from './routes/expenses';

const app = new Hono();

app.use(logger());

app.get('/api/healthcheck', (c) => {
  return c.text('OK');
});

app.route('/api/expenses', expensesRoute);

app.get('*', serveStatic({ root: '../frontend/dist' }));
app.get('*', serveStatic({ path: '../frontend/dist/index.html' }));

export default app;
