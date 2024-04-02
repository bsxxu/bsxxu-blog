import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/assets/avatar.jpg';

export default function Header() {
  return (
    <div className="w-full h-10 px-20 py-7 flex items-center justify-between fixed top-0 backdrop-blur-sm">
      <Link href="/">
        <Image
          src={Avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full hover:rotate-180 transition-transform duration-500"
        />
      </Link>
      <div className="space-x-5">
        <Link href="/blog">blog</Link>
        <Link href="/gallery">gallery</Link>
      </div>
    </div>
  );
}
