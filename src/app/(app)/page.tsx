import DownToTopView from '@/components/motion/down-to-top-view';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flow-root grid-bg">
      <main className="max-w-5xl mx-auto min-h-screen">
        <div className="max-w-2xl mx-auto mt-44 px-5">
          <DownToTopView className="font-semibold text-4xl">
            Hi! 👋, I&apos;m Bsx.
          </DownToTopView>
          <DownToTopView delay={0.05} className="mt-10">
            I am a college student studying software engineering. I mainly use
            react for front-end development.
          </DownToTopView>
          <DownToTopView delay={0.1} className="mt-6 font-semibold text-lg">
            about me
          </DownToTopView>
          <DownToTopView delay={0.15} className="mt-3">
            I am a coder driven by interest, and I love learning new knowledge
            or skills. Besides programming, I like reading and watching
            documentaries in free time. I am also an anime fan, as you can see
            from my avatar, which was drew by myself.
          </DownToTopView>
          <DownToTopView delay={0.2} className="mt-6 font-semibold text-lg">
            find me
          </DownToTopView>
          <DownToTopView delay={0.25} className="mt-3">
            You can find me at&nbsp;
            <Link href="https://github.com/BsXwerse" className=" underline">
              GitHub
            </Link>
            ,&nbsp;
            <Link href="https://x.com/_bsxxu_" className=" underline">
              X
            </Link>
            ,&nbsp;
            <Link href="https://t.me/bsxxu" className=" underline">
              telegram
            </Link>
          </DownToTopView>
        </div>
      </main>
    </div>
  );
}