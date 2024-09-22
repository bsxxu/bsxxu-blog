import { serverConfig } from './configs/index.config';
import { createServer } from './server/server';
import test from './test';

(async () => {
  const server = createServer();
  try {
    server.register(test);
    await server.listen({ port: serverConfig.port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
