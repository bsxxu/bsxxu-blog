import type { ReactHTML } from 'react';
import type AnimateView from '../animate-view';

export type AnimatePropsWithoutMotion<T extends keyof ReactHTML> = Omit<
	Parameters<typeof AnimateView<T>>[0],
	'motionProps'
>;
