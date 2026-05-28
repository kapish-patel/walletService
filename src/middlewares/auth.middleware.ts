import type { RequestHandler } from 'express';

const expectedBearerToken = process.env.BEARER_TOKEN;

export const requireAuth: RequestHandler = (request, response, next) => {
  const authorizationHeader = request.get('authorization');
  const tokenMatch = authorizationHeader?.match(/^Bearer\s+(.+)$/i);

  if (!tokenMatch || tokenMatch[1] !== expectedBearerToken) {
    response.status(401).json({ message: 'Unauthorized' });
    return;
  }

  next();
};
