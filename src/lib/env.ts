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
const GITHUB_CLIENT_ID = checkEnv('GITHUB_CLIENT_ID');
const GITHUB_CLIENT_SECRET = checkEnv('GITHUB_CLIENT_SECRET');

const env = {
  MEILI_APIKEY,
  MEILI_HOST,
  POSTS_PATH,
  DB_FILE_PATH,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
};

export default env;
