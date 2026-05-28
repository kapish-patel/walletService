import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const rootDir = process.cwd();
const envPath = resolve(rootDir, '.env');
const envExamplePath = resolve(rootDir, '.env.example');
const envOnly = process.argv.includes('--env-only');

function parseEnv(content) {
  const result = {};

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
      continue;
    }

    const [rawKey, ...rawValue] = trimmed.split('=');
    const key = rawKey.trim();
    const value = rawValue.join('=').trim();
    result[key] = value;
  }

  return result;
}

function hasPlaceholderValues(env) {
  return (
    !env.DB_HOST ||
    !env.DB_USER ||
    !env.DB_NAME ||
    !env.DB_PASSWORD ||
    env.DB_PASSWORD === 'your_password'
  );
}

if (!existsSync(envPath)) {
  if (!existsSync(envExamplePath)) {
    console.error('Cannot initialize .env: .env.example does not exist.');
    process.exit(1);
  }

  copyFileSync(envExamplePath, envPath);
  console.log('Created .env from .env.example');
} else {
  console.log('.env already exists, skipping file creation');
}

if (envOnly) {
  console.log('Environment initialization complete.');
  process.exit(0);
}

const envContent = readFileSync(envPath, 'utf-8');
const env = parseEnv(envContent);

if (hasPlaceholderValues(env)) {
  console.log('Skipped DB check: update .env with real MySQL credentials, then run npm run db:check');
  process.exit(0);
}

const dbCheck = spawnSync('npm', ['run', 'db:check'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (dbCheck.status !== 0) {
  process.exit(dbCheck.status ?? 1);
}

console.log('Project initialization complete.');
