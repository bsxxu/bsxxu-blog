import fs from 'node:fs';
import path from 'node:path';
import { type RunOptions, compile, run } from '@mdx-js/mdx';
import matter from 'gray-matter';
import * as devRuntime from 'react/jsx-dev-runtime';
import * as prodRuntime from 'react/jsx-runtime';
import readingTime, { type ReadTimeResults } from 'reading-time';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkGithubAlerts from 'remark-github-alerts';
import rehypeCode from './plugins/rehype-code';
import rehypeInlineCode from './plugins/rehype-inline-code';
import remarkHeading, { type TocHeading } from './plugins/remark-heading';

export type PostMetadata = {
	title: string;
	date: string;
	tags?: string[];
	description?: string;
	lastModified?: string;
	readingTime?: ReadTimeResults;
};

const articlesDir = path.join(process.cwd(), 'src', 'articles');

export function readMDXFile(path: string) {
	const raw = fs.readFileSync(path, 'utf-8');
	const { content, data } = matter(raw);

	return {
		content: content,
		metadata: {
			...data,
			readingTime: readingTime(content),
		} as PostMetadata,
	};
}

//TODO slug去除后缀
export function getAllPost() {
	const dir = path.join(articlesDir, 'posts');
	const files = fs
		.readdirSync(dir)
		.filter((name) => name.endsWith('.md') || name.endsWith('.mdx'));

	return files.map((slug) => ({
		...readMDXFile(path.join(dir, slug)).metadata,
		slug,
	}));
}

export function getPost(...slug: string[]) {
	return readMDXFile(path.join(articlesDir, ...slug));
}

export async function getHeadings(content: string) {
	const result = await remark().use(remarkHeading).process(content);
	return (result.data.headings ?? []) as TocHeading[];
}

export async function compileAndRun(content: string) {
	const compiledMdx = String(
		//TODO vfile
		await compile(content, {
			outputFormat: 'function-body',
			development: process.env.NODE_ENV === 'development',
			remarkPlugins: [remarkHeading, remarkGithubAlerts, remarkGfm],
			rehypePlugins: [rehypeInlineCode, rehypeCode],
		}),
	);
	const runtime =
		process.env.NODE_ENV === 'development' ? devRuntime : prodRuntime;
	const res = (await run(compiledMdx, runtime as RunOptions)).default;
	return res;
}
