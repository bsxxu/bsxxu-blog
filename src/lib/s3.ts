import { BizError, ErrorCode } from '@/service/error';
import {
  GetObjectCommand,
  HeadObjectCommand,
  type ListObjectsV2CommandOutput,
  NotFound,
  PutObjectCommand,
  S3Client,
  paginateListObjectsV2,
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

export const createPager = async (pageSize: number, prefix?: string) => {
  const pagerObject = paginateListObjectsV2(
    {
      client: s3Client,
      pageSize,
    },
    {
      Bucket: env.AWS_S3_BUCKET,
      Prefix: prefix,
    },
  );
  const cache: ListObjectsV2CommandOutput[] = [];

  const page = async (index: number) => {
    const idx = index - 1;
    if (idx < 0) throw new BizError(ErrorCode.NoMore, '这一页没有数据');
    while (cache.length <= idx) {
      const { value, done } = await pagerObject.next();
      if (done) throw new BizError(ErrorCode.NoMore, '这一页没有数据');
      cache.push(value);
    }
    if (idx + 1 < cache.length)
      return {
        data: cache[idx],
        next: index + 1,
      };
    const { value, done } = await pagerObject.next();
    !done && cache.push(value);
    return {
      data: cache[idx],
      next: done ? null : index + 1,
    };
  };

  return {
    page,
    getPageSize: () => pageSize,
    getPrefix: () => prefix,
  };
};
