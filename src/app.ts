import 'dotenv/config';
import express from 'express';

import { requireAuth } from './middlewares/auth.middleware.js';
import { indexRouter } from './routes/index.routes.js';

export const createApp = () => {
	const app = express();

	app.use(requireAuth);
	app.use(indexRouter);

	return app;
};

export const app = createApp();
