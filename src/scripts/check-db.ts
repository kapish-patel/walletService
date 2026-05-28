import { checkDatabaseConnection, db } from '../db/knex.js';

async function run(): Promise<void> {
  try {
    await checkDatabaseConnection();
    console.log('MySQL connection successful via Knex.');
  } catch (error) {
    console.error('MySQL connection failed.');
    console.error(error);
    process.exitCode = 1;
  } finally {
    await db.destroy();
  }
}

void run();
