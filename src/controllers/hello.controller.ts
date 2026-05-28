import type { RequestHandler } from 'express';

export const getHelloWorld: RequestHandler = (_request, response) => {
  response.status(200).json({ message: 'Hello, World!' });
};
