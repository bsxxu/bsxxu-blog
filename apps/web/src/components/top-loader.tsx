'use client';

import { useTopLoaderShowValue } from '@/providers/toploader-show-provider';
import { useTheme } from 'next-themes';
import NextTopLoader from 'nextjs-toploader';

//TODO 找代替方案
export default function TopLoader() {
	const show = useTopLoaderShowValue();
	const { theme } = useTheme();

	return show ? (
		theme === 'light' ? (
			<NextTopLoader showSpinner={false} color="#535353" shadow={false} />
		) : (
			<NextTopLoader showSpinner={false} color="#FFFFFF" shadow={false} />
		)
	) : null;
}
