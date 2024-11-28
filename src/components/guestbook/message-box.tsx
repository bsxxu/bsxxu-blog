import { auth } from '@/lib/auth';
import LoginButton from '../common/login-button';
import { Button } from '../ui/button';
import MessageForm from './message-form';

export default async function MessageBox() {
  const session = await auth();
  return (
    <div className="mx-auto max-w-lg mt-14">
      {session ? (
        <MessageForm />
      ) : (
        <div className="flex justify-center items-center gap-4">
          <span className="text-muted-foreground text-sm">留言前请先登录</span>
          <LoginButton button={<Button>登录</Button>} />
        </div>
      )}
    </div>
  );
}
