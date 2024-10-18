import 'server-only';

const checkEnv = (name: string, defaultVal?: string) => {
  const val = process.env[name] ?? defaultVal;
  if (!val) {
    console.error(`env ${name} not existed`);
    process.exit(1);
  }
  return val;
};

export const MEILI_APIKEY = checkEnv('MEILI_APIKEY');
export const MEILI_HOST = checkEnv('MEILI_HOST');
export const POSTS_PATH = checkEnv('POSTS_PATH');
export const DB_FILE_PATH = checkEnv('DB_FILE_PATH');

const env = {
  MEILI_APIKEY,
  MEILI_HOST,
  POSTS_PATH,
  DB_FILE_PATH,
};

export default env;
