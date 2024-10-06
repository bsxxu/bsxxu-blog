import 'server-only';

const checkEnv = (name: string, defaultVal?: string) => {
  const val = process.env[name] ?? defaultVal;
  if (!val) {
    console.error(`env ${name} not existed`);
    process.exit(1);
  }
  return val;
};

export const SERVER_TRPC_API = checkEnv('SERVER_TRPC_API');
export const MEILI_APIKEY = checkEnv('MEILI_APIKEY');
export const MEILI_HOST = checkEnv('MEILI_HOST');
