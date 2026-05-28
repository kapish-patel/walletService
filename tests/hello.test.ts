import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import type { AddressInfo } from 'node:net';

import { app } from '../src/index.js';

let server: ReturnType<typeof app.listen>;
let baseUrl: string;

beforeAll(async () => {
  server = app.listen(0);

  await new Promise<void>((resolve) => {
    server.on('listening', () => {
      const address = server.address() as AddressInfo;
      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
});

describe('GET /', () => {
  it('returns the hello-world payload', async () => {
    const response = await fetch(`${baseUrl}/`);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ message: 'Hello, World!' });
  });

  it('returns 404 for unknown routes', async () => {
    const response = await fetch(`${baseUrl}/missing`);

    expect(response.status).toBe(404);
  });
});