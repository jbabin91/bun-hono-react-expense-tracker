import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

console.log('ConnectionString:', connectionString);

const migrationClient = postgres(connectionString, { max: 1 });
await migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' });

await migrationClient.end();
