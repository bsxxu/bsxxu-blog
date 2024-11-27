import env from '@/lib/env';
import { ofetch } from 'ofetch';

async function handler(req: Request) {
  const headers = req.headers.entries().reduce(
    (acc, [key, value]) => {
      acc[
        key
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join('-')
      ] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  const data = await ofetch(
    `http://${env.MEILI_HOST}:${env.MEILI_PORT}/multi-search`,
    {
      method: req.method,
      body: req.body,
      headers,
    },
  );

  return Response.json(data);
}

export { handler as POST };
