import type { ReadTimeResults } from 'reading-time';

export interface PostMetadata {
  key: string;
  title: string;
  tags: string[];
  description: string;
  date: string;
}

export interface PostData extends PostMetadata {
  timestamp: number;
  content: string;
  readingTime: ReadTimeResults;
}

export type PostDataWithoutContent = Omit<PostData, 'content'>;
