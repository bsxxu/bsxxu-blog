import { loginWithGithub } from '@/service/client/actions/auth';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import EmailLoginForm from './email-login-form';

export default async function LoginButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center gap-3  hover:bg-muted transition-colors rounded px-2 py-1">
          <span className="i-ri-login-box-line" />
          Login
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Select a login method.</DialogDescription>
        </DialogHeader>
        <div className="mx-auto">
          <Tabs defaultValue="oauth" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="oauth">OAuth</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>
            <TabsContent value="oauth">
              <div>
                <Button onClick={loginWithGithub}>github</Button>
              </div>
            </TabsContent>
            <TabsContent value="email">
              <EmailLoginForm />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
