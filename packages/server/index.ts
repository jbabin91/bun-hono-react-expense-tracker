import app from './app';

Bun.serve({
  fetch: app.fetch,
  hostname: '0.0.0.0',
  port: process.env.PORT ?? 3000,
});

console.log('Server is running at http://localhost:3000/');
