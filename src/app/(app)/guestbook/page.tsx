import RightToLeftView from '@/components/motion/right-to-left-view';

export default function Page() {
  return (
    <RightToLeftView className="mt-24 ">
      <div className="text-right text-4xl font-bold pr-10 text-muted-foreground">
        <div>Guestbook</div>
        <div className="text-base text-muted-foreground/50 font-normal">
          Welcome to leave a message.
        </div>
      </div>
    </RightToLeftView>
  );
}
