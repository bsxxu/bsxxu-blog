import DownToTopView from '@/components/motion/down-to-top-view';

export default function Life() {
	return (
		<div className="max-w-3xl mx-auto">
			<DownToTopView
				as="div"
				className="mt-24 mb-3 text-ft-strong text-3xl font-bold"
			>
				日常
			</DownToTopView>
			<DownToTopView as="div" className="text-xs text-ft-minor">
				这里是一些我的生活点滴
			</DownToTopView>
		</div>
	);
}
