'use client';

import { useScrollValue } from '@/providers/scroll-provider';
import { cm } from '@/utils/common';
import { memo } from 'react';
import { RxArrowUp } from 'react-icons/rx';

function BackTop(props: React.ComponentPropsWithoutRef<'button'>) {
	const { className, ...rest } = props;
	const y = useScrollValue();

	return (
		<button
			className={cm(
				'transition-opacity hover:text-ft flex items-center gap-2',
				{ 'opacity-0': y <= 500 },
				className,
			)}
			onClick={() => window.scrollTo({ top: 0 })}
			{...rest}
		>
			<RxArrowUp />
			回到顶部
		</button>
	);
}

export default memo(BackTop);
