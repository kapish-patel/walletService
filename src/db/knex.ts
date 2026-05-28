import 'dotenv/config';
import knex, { type Knex } from 'knex';

const toInt = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getRequiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const dbConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: getRequiredEnv('DB_HOST'),
    port: toInt(process.env.DB_PORT, 3306),
    user: getRequiredEnv('DB_USER'),
    password: process.env.DB_PASSWORD || '',
    database: getRequiredEnv('DB_NAME'),
  },
  pool: {
    min: toInt(process.env.DB_POOL_MIN, 2),
    max: toInt(process.env.DB_POOL_MAX, 10),
  },
};

export const db = knex(dbConfig);

export async function checkDatabaseConnection(): Promise<void> {
  await db.raw('SELECT 1 as health');
}
