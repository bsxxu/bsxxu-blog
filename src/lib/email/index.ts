import { SESClient } from '@aws-sdk/client-ses';
import env from '../env';

export const sesClient = new SESClient({
  region: env.AWS_EMAIL_REGIN,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
