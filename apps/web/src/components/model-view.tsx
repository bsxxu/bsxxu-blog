import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AnimateView from './animate-view';

export default function ModelView({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
  // return (
  //   <Dialog>
  //     <DialogTrigger asChild>{children}</DialogTrigger>
  //     <DialogPortal>
  //       <DialogOverlay asChild>
  //         <AnimateView
  //           as="div"
  //           className="fixed inset-0 bg-black/50 z-0"
  //           motionProps={{
  //             initial: {
  //               opacity: 0,
  //             },
  //             animate: {
  //               opacity: 1,
  //             },
  //           }}
  //         />
  //       </DialogOverlay>
  //       <DialogContent className="outline-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-show z-50">
  //         {content}
  //       </DialogContent>
  //     </DialogPortal>
  //   </Dialog>
  // );
}
