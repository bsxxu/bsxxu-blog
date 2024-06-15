'use client';

import type { PostMetadata } from '@/lib/mdx';
import { useSetPostMetadata } from '@/providers/post-metadata-provider';
import { useEffect } from 'react';

export default function PostMetadataSetter({
	children,
	data,
}: {
	children: React.ReactNode;
	data: PostMetadata;
}) {
	const setPostMetaData = useSetPostMetadata();
	useEffect(() => setPostMetaData(data), [data, setPostMetaData]);
	//移除文章末尾的分号
	useEffect(() => {
		const article = document.querySelector('article');
		if (!article) return;
		const node = Array.from(article.childNodes).at(-1);
		node && node.nodeType === Node.TEXT_NODE && article.removeChild(node);
	}, []);
	return children;
}
