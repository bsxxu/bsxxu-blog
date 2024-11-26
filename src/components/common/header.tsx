import Avatar from '@/assets/avatar.png';
import { auth, isAdmin } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import ClickView from '../motion/click-view';
import MoreButton from './more-button';
import NavBar from './nav-bar';
import ThemesToggle from './themes-toggle';

export default async function Header() {
  const session = await auth();
  const nav = ['post', 'project', 'guestbook'];
  (await isAdmin()) && nav.push('admin');

  return (
    <div className="w-full px-2 md:px-20 py-3 fixed top-0 backdrop-blur shadow overflow-hidden z-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <ClickView>
            <Image
              src={session?.user?.image ?? Avatar}
              alt="avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </ClickView>
        </Link>
        <div className="font-semibold">
          Bsx&apos;s blog ✨
          <div className="text-xs scale-90 font-normal text-muted-foreground translate-x-3">
            {session?.user?.name
              ? `Welcome, ${session.user.name}`
              : '君の銀の庭'}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 text-muted-foreground">
        <NavBar nav={nav} />
        <ThemesToggle />
        <MoreButton />
      </div>
    </div>
  );
}
