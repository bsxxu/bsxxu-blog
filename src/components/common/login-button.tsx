import {
  loginWithGithub,
  loginWithGoogle,
} from '@/service/server/actions/auth';
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

const OauthLink = ({
  icon,
  name,
  onClick,
}: { icon: string; name: string; onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 text-lg cursor-pointer hover:underline hover:translate-x-1 transition-transform"
    >
      <span className={icon} />
      <span>{name}</span>
    </div>
  );
};

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
              <div className="flex flex-col items-center space-y-2 py-4 border border-muted rounded-md mt-5">
                <OauthLink
                  icon="i-ri-github-fill"
                  name="Github"
                  onClick={loginWithGithub}
                />
                <OauthLink
                  icon="i-ri-google-fill"
                  name="Google"
                  onClick={loginWithGoogle}
                />
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
