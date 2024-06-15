'use client';

import { useSetTopLoaderShow } from '@/providers/toploader-show-provider';
import { useEffect } from 'react';

export default function TopLoaderCtrl({
	children,
}: {
	children: React.ReactNode;
}) {
	const setTopLoaderShow = useSetTopLoaderShow();
	useEffect(() => {
		setTimeout(() => setTopLoaderShow(false), 1000);
		return () => setTopLoaderShow(true);
	}, [setTopLoaderShow]);
	return children;
}
