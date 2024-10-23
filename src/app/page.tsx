import BgHome from '@/components/common/bg-home';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <BgHome />
      <div className="max-w-2xl mx-auto mt-44 px-5">
        <div className="font-semibold text-4xl">Hi! 👋, I&apos;m Bsx.</div>
        <div className="mt-10">
          I am a college student studying software engineering. I mainly use
          react for front-end development.
        </div>
        <div className="mt-6 font-semibold text-lg">about me</div>
        <div className="mt-3">
          I am a coder driven by interest, and I love learning new knowledge or
          skills. Besides programming, I like reading and watching documentaries
          in free time. I am also an anime fan, as you can see from my avatar,
          which was drew by myself.
        </div>
        <div className="mt-6 font-semibold text-lg">find me</div>
        <div className="mt-3">
          You can find me at&nbsp;
          <Link href="https://github.com/BsXwerse" className=" underline">
            GitHub
          </Link>
          ,{' '}
          <Link href="https://x.com/_bsxxu_" className=" underline">
            X
          </Link>
          ,&nbsp;
          <Link href="https://t.me/bsxxu" className=" underline">
            telegram
          </Link>
        </div>
      </div>
    </>
  );
}
