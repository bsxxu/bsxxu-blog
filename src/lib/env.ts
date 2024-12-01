import 'server-only';

const checkEnv = (name: string, defaultVal?: string) => {
  const val = process.env[name] ?? defaultVal;
  if (!val) {
    console.error(`env ${name} not existed`);
    process.exit(1);
  }
  return val;
};

const MEILI_MASTER_KEY = checkEnv('MEILI_MASTER_KEY');
const MEILI_HOST = checkEnv('MEILI_HOST');
const MEILI_PORT = checkEnv('MEILI_PORT', '7700');
const DB_FILE_PATH = checkEnv('DB_FILE_PATH');
const AWS_ACCESS_KEY_ID = checkEnv('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY = checkEnv('AWS_SECRET_ACCESS_KEY');
const AWS_EMAIL_REGIN = checkEnv('AWS_EMAIL_REGIN');
const AWS_S3_REGIN = checkEnv('AWS_S3_REGIN');
const AWS_S3_BUCKET = checkEnv('AWS_S3_BUCKET');
const REDIS_PASSWORD = checkEnv('REDIS_PASSWORD');
const REDIS_HOST = checkEnv('REDIS_HOST');
const REDIS_PORT = checkEnv('REDIS_PORT', '6379');
const BLOG_URL = checkEnv('BLOG_URL');
checkEnv('AUTH_GITHUB_ID');
checkEnv('AUTH_GITHUB_SECRET');

export default {
  BLOG_URL,
  MEILI_MASTER_KEY,
  MEILI_HOST,
  MEILI_PORT,
  DB_FILE_PATH,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_EMAIL_REGIN,
  AWS_S3_REGIN,
  AWS_S3_BUCKET,
  REDIS_PASSWORD,
  REDIS_HOST,
  REDIS_PORT,
};
