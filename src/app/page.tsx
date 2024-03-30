import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      test
      <Link href="blog">to blog</Link>
    </main>
  );
}
