import SideMenu from '@/components/admin/side-menu';
import { Button } from '@/components/ui/button';
import { isAdmin } from '@/lib/auth';
import Link from 'next/link';

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  if (!(await isAdmin()))
    return (
      <div className="absolute-center flex flex-col items-center gap-5">
        <div className="text-lg">You are not an administrator.</div>
        <Link href="/">
          <Button>Go home</Button>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen">
      <SideMenu>{children}</SideMenu>
    </div>
  );
}
