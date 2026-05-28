import 'dotenv/config';
import express, { type RequestHandler } from 'express';
import { pathToFileURL } from 'node:url';

const bearerToken = process.env.BEARER_TOKEN;

const requireBearerToken: RequestHandler = (request, response, next) => {
	const authorization = request.get('authorization');
	const match = authorization?.match(/^Bearer\s+(.+)$/i);
	if (!match || match[1] !== bearerToken) {
		response.status(401).json({ message: 'Unauthorized' });
		return;
	}

	next();
};

export const createApp = () => {
	const app = express();

	app.use(requireBearerToken);

	app.get('/', (_request, response) => {
		response.status(200).json({ message: 'Hello, World!' });
	});

	return app;
}; 

export const app = createApp();

const port = Number(process.env.PORT ?? 3000);

const isDirectExecution =
	process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectExecution) {
	app.listen(port, () => {
		console.log(`Server listening on port ${port}`);
	});
}
