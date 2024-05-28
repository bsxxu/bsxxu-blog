'use client';

import { errorToast, successToast } from '@/lib/toast';
import { useClipboard } from 'foxact/use-clipboard';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RiFileCopyFill } from 'react-icons/ri';

//TODO 代码展开收起
//TODO 滚动条
export default function Pre(
	props: React.ComponentPropsWithoutRef<'pre'> & {
		['data-lang']?: string;
	},
) {
	const { children, 'data-lang': dataLang, ...rest } = props;
	const lang = (dataLang ?? 'plaintext').toUpperCase();
	const ref = useRef<HTMLDivElement>(null);
	const [code, setCode] = useState('');
	const { copy } = useClipboard({
		onCopyError(error) {
			errorToast(error.message);
		},
	});
	const handleCopy = useCallback(() => {
		copy(code).then(() => successToast('已复制到剪切板'));
	}, [code, copy]);

	useEffect(() => {
		ref.current && setCode(ref.current.textContent ?? '');
	}, []);

	return (
		<div className="relative group">
			<pre {...rest}>
				<button
					onClick={handleCopy}
					className="opacity-0 absolute top-1 right-1 transition-opacity text-lg text-ft-minor group-hover:opacity-100 hover:text-ft-minor/50 z-10"
				>
					<RiFileCopyFill />
				</button>
				<span className="lang absolute right-2 bottom-3">{lang}</span>
				<div ref={ref}>{children}</div>
			</pre>
		</div>
	);
}
