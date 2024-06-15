'use client';

import type { TocHeading } from '@/lib/mdx/plugins/remark-heading';
import { cm } from '@/utils/common';
import * as Separator from '@radix-ui/react-separator';
import { useEffect, useMemo, useRef, useState } from 'react';
import BackTop from './back-top';

//TODO 用fox重构
export default function Toc({ headings }: { headings: TocHeading[] }) {
	const hs = useMemo(() => {
		const min = Math.min(...headings.map((h) => h.depth));
		return headings.map((h) => ({ ...h, depth: h.depth - min }));
	}, [headings]);

	const [active, setActive] = useState('');
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		observer.current?.disconnect();
		const headings = hs.map((h) => document.getElementById(h.slug));

		observer.current = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						setActive(e.target.id);
						break;
					}
				}
			},
			{ rootMargin: '0% 0% -75% 0%' },
		);
		for (const h of headings) h && observer.current?.observe(h);

		return () => observer.current?.disconnect();
	}, [hs]);

	return (
		<div className="hidden p-2 sticky top-20 min-w-44 max-w-60 max-h-[80vh] self-start space-y-2 text-sm text-ft-minor sm:block overflow-y-auto overflow-x-hidden">
			<div>Table of Contents</div>
			{hs.map((h) => (
				<a
					key={h.slug}
					href={`#${h.slug}`}
					className={cm(
						'block whitespace-nowrap transition-all duration-500 hover:text-ft truncate',
						{
							['text-ft-strong translate-x-2']: active === h.slug,
						},
					)}
					style={{ paddingLeft: h.depth * 20 }}
				>
					{h.title}
				</a>
			))}
			<Separator.Root
				className="w-full h-[1px] bg-ft-minor"
				orientation="horizontal"
			/>
			<BackTop />
		</div>
	);
}
