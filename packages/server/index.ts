import app from './app';

Bun.serve({
  fetch: app.fetch,
});

console.log('Server is running at http://localhost:3000/');
