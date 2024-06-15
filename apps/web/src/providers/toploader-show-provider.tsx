'use client';

import { createContextState } from 'foxact/context-state';

export const [
	TopLoaderShowProvider,
	useTopLoaderShowValue,
	useSetTopLoaderShow,
] = createContextState(true);
