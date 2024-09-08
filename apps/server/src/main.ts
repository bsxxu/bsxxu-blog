import 'dotenv/config';
import { serverConfig } from './configs/server.config';
import { createServer } from './server/server';

(async () => {
	const server = createServer();
	try {
		await server.listen({ port: serverConfig.port });
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
})();
