import { serverConfig } from './configs/index.config';
import { createServer } from './server/server';
import test from './test';

(async () => {
  const server = createServer();
  try {
    server.register(test);
    server.get('/bsxxu', (_, rpy) => {
      rpy.send('success');
    });
    await server.listen({ port: serverConfig.port, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
