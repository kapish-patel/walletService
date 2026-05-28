import express from 'express';
import { pathToFileURL } from 'node:url';

export const createApp = () => {
	const app = express();

	app.get('/', (_request, response) => {
		response.status(200).json({ message: 'Hello, World!' });
	});

	return app;
};

export const app = createApp();

const isDirectExecution =
	process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectExecution) {
	const port = Number(process.env.PORT ?? 3000);

	app.listen(port, () => {
		console.log(`Server listening on port ${port}`);
	});
}
