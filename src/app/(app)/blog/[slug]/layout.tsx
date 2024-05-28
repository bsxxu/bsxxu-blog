import ProgressBar from '@/components/progress-bar';
import TopLoaderCtrl from '@/components/top-loader-ctrl';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<TopLoaderCtrl>
			<ProgressBar />
			{children}
		</TopLoaderCtrl>
	);
}
