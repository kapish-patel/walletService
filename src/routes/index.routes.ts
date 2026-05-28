import { Router } from 'express';

import { getHelloWorld } from '../controllers/hello.controller.js';

export const indexRouter = Router();

indexRouter.get('/', getHelloWorld);
