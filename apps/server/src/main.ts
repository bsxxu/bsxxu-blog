import 'dotenv/config';
import { serverConfig } from './configs/server.config';
import { createServer } from './server/server';

const server = createServer();

(async () => {
	try {
		server.get('/test', (request, reply) => {
			request.log.debug(process.env.TEST);
			reply.send({ hello: 'world!!!' });
		});
		await server.listen({ port: serverConfig.port });
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
})();
