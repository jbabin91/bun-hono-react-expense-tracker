import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  driver: 'pg',
  out: './drizzle',
  schema: './src/schema',
});
