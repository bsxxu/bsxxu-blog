import BgDot from '@/components/common/bg-dot';
import DownToTopView from '@/components/motion/down-to-top-view';

export default function Life() {
  return (
    <>
      <BgDot />
      <DownToTopView className="mt-24 ">
        <div className="text-right text-4xl font-bold pr-10 text-muted-foreground">
          Projects
        </div>
      </DownToTopView>
    </>
  );
}
