import type { ReactHTML } from 'react';
import AnimateView from '../animate-view';
import type { AnimatePropsWithoutMotion } from './type';

export default function ClickView<T extends keyof ReactHTML>({
	children,
	as,
	onClick = undefined,
	...rest
}: AnimatePropsWithoutMotion<T> & {
	onClick?: (...args: any[]) => any;
}) {
	return (
		<AnimateView
			as={as as any}
			onClick={onClick}
			motionProps={{
				whileHover: { scale: 1.15 },
				whileTap: { scale: 0.9 },
				transition: { type: 'spring', stiffness: 400, damping: 17 },
			}}
			{...rest}
		>
			{children}
		</AnimateView>
	);
}
