'use client';

import Avatar from '@/assets/avatar.jpg';
import { useScrollValue } from '@/providers/scroll-provider';
import { cm } from '@/utils/common';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PostHeader from './post-header';
import ThemesToggle from './themes-toggle';

const nav = ['blog', 'life'];

//TODO 移动端适配
export default function Header() {
	const segments = usePathname().split('/');
	const y = useScrollValue();
	const isScroll =
		y >= 110 &&
		((segments.length > 2 && segments[1] === 'blog') ||
			(segments.length === 2 && segments[1] === 'about'));

	return (
		<div className="w-full h-16 px-2 md:px-20 py-2 fixed top-0 backdrop-blur shadow overflow-hidden border-b border-bk-minor z-10">
			<motion.div
				animate={{
					y: isScroll ? -60 : 0,
				}}
			>
				<div className="flex items-center justify-between min-h-12">
					<div className="flex items-center gap-3">
						<Link href="/">
							<Image
								src={Avatar}
								alt="avatar"
								className="w-10 h-10 rounded-xl hover:rotate-180 transition-transform duration-500"
							/>
						</Link>
						<div className="font-semibold">
							Bsx&apos;s tiny website
							<div className="text-xs font-normal text-ft-minor translate-x-3">
								still alive...?
							</div>
						</div>
					</div>
					<div className="flex items-center gap-6 text-ft-minor">
						{nav.map((n) => (
							<Link
								key={n}
								href={`/${n}`}
								className={cm('hover:text-ft-strong transition-colors', {
									['text-ft-strong font-semibold']: segments[1] === n,
								})}
							>
								{n}
							</Link>
						))}
						<ThemesToggle isScroll={isScroll} />
					</div>
				</div>
				<PostHeader />
			</motion.div>
		</div>
	);
}
