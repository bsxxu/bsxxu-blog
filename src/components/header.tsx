import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/assets/avatar.jpg';

export default function Header() {
  return (
    <div className="w-full h-10 flex items-center justify-between bg-slate-400  fixed top-0">
      <Link href="/">
        <Image src={Avatar} alt="avatar" className="w-10 h-10 rounded-full" />
      </Link>
      <Link href="/blog">blog</Link>
    </div>
  );
}
