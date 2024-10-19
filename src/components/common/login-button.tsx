import { validateRequest } from '@/lib/auth';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export default async function LoginButton() {
  const { session } = await validateRequest();

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center gap-3  hover:bg-muted transition-colors rounded px-2 py-1">
          {session ? (
            <>
              <span className="i-ri-logout-box-line" />
              Logout
            </>
          ) : (
            <>
              <span className="i-ri-login-box-line" />
              Login
            </>
          )}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Login</DialogTitle>
        <div className="mx-auto">
          <Tabs defaultValue="oauth" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="oauth">OAuth</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="oauth">
              <div>
                <Link href="/api/login/github">github</Link>
              </div>
            </TabsContent>
            <TabsContent value="password">password</TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
