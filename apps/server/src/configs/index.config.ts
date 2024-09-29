import type {
  CommonConfig,
  DbConfig,
  SearchConfig,
  ServerConfig,
} from '../data/interfaces/config';

const checkEmpty = (key: string) => {
  const value = process.env[key];
  if (typeof value !== 'string' || value.length === 0) {
    console.error(`env variable ${key} is empty`);
    process.exit(1);
  }
  return value;
};

export const dbConfig: DbConfig = {
  name: 'test',
};

export const serverConfig: ServerConfig = {
  port: 8080,
};

export const searchConfig: SearchConfig = {
  host: checkEmpty('MEILI_HOST'),
  apikey: checkEmpty('MEILI_APIKEY'),
};

export const commonConfig: CommonConfig = {
  postsPath: checkEmpty('POSTS_PATH'),
};
