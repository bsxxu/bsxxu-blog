import * as Dialog from '@radix-ui/react-dialog';
import AnimateView from './animate-view';

export default function ModelView({
	children,
	content,
}: {
	children: React.ReactNode;
	content: JSX.Element;
}) {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay asChild>
					<AnimateView
						as="div"
						className="fixed inset-0 bg-black/50 z-0"
						motionProps={{
							initial: {
								opacity: 0,
							},
							animate: {
								opacity: 1,
							},
						}}
					/>
				</Dialog.Overlay>
				<Dialog.Content className="outline-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-show z-50">
					{content}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
