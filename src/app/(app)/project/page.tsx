import BgDot from '@/components/common/bg-dot';
import RightToLeftView from '@/components/motion/right-to-left-view';

export default function Life() {
  return (
    <>
      <BgDot />
      <RightToLeftView className="mt-24 ">
        <div className="text-right text-4xl font-bold pr-10 text-muted-foreground">
          <div>Projects</div>
          <div className="text-base text-muted-foreground/50 font-normal">
            Projects that I created or maintaining.
          </div>
        </div>
      </RightToLeftView>
    </>
  );
}
