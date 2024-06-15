'use client';

import { createContextState } from 'foxact/context-state';
import { useMotionValueEvent, useScroll } from 'framer-motion';

const [Provider, useScrollValue, useSetScroll] = createContextState(0);

export { useScrollValue };

function ScrollSetter({ children }: { children: React.ReactNode }) {
	const { scrollY } = useScroll();
	const setScroll = useSetScroll();
	useMotionValueEvent(scrollY, 'change', (value) => setScroll(value));
	return children;
}

export default function ScrollProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Provider>
			<ScrollSetter>{children}</ScrollSetter>
		</Provider>
	);
}
