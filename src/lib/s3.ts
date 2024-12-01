import {
  GetObjectCommand,
  HeadObjectCommand,
  NotFound,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import env from './env';

export const s3Client = new S3Client({
  region: env.AWS_S3_REGIN,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export const s3UploadFile = async (key: string, file: Buffer) => {
  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Body: file,
    Key: key,
  });
  return await s3Client.send(command);
};

export const checkObjectExists = async (key: string) => {
  const command = new HeadObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
  });
  try {
    await s3Client.send(command);
    return true;
  } catch (error) {
    if (error instanceof NotFound) {
      return false;
    }
    throw error;
  }
};

export const genPresignedUrl = (key: string, expire: number) => {
  const command = new GetObjectCommand({ Bucket: env.AWS_S3_BUCKET, Key: key });
  return getSignedUrl(s3Client, command, { expiresIn: expire });
};
