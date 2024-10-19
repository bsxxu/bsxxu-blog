import Avatar from '@/assets/avatar.jpg';
import Image from 'next/image';
import Link from 'next/link';
import MoreButton from './more-button';
import NavBar from './nav-bar';
import ThemesToggle from './themes-toggle';

export default function Header() {
  return (
    <div className="w-full px-2 md:px-20 py-4 fixed top-0 backdrop-blur shadow overflow-hidden z-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image src={Avatar} alt="avatar" className="w-10 h-10 rounded-xl" />
        </Link>
        <div className="font-semibold">
          Bsx&apos;s tiny website
          <div className="text-xs font-normal text-muted-foreground translate-x-3">
            still alive...?
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 text-muted-foreground">
        <NavBar />
        <ThemesToggle />
        <MoreButton />
      </div>
    </div>
  );
}
