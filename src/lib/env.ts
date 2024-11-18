import 'server-only';

const checkEnv = (name: string, defaultVal?: string) => {
  const val = process.env[name] ?? defaultVal;
  if (!val) {
    console.error(`env ${name} not existed`);
    process.exit(1);
  }
  return val;
};

export const MEILI_MASTER_KEY = checkEnv('MEILI_MASTER_KEY');
export const MEILI_HOST = checkEnv('MEILI_HOST');
export const POSTS_PATH = checkEnv('POSTS_PATH');
export const DB_FILE_PATH = checkEnv('DB_FILE_PATH');
const AWS_ACCESS_KEY_ID = checkEnv('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY = checkEnv('AWS_SECRET_ACCESS_KEY');
const AWS_REGIN = checkEnv('AWS_REGIN');
checkEnv('AUTH_GITHUB_ID');
checkEnv('AUTH_GITHUB_SECRET');

const env = {
  MEILI_MASTER_KEY,
  MEILI_HOST,
  POSTS_PATH,
  DB_FILE_PATH,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGIN,
};

export default env;
