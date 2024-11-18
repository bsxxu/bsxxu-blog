import { auth } from '@/lib/auth';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import LoginButton from './login-button';
import LogoutButton from './logout-button';

export default async function MoreButton() {
  const session = await auth();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="i-ri-more-2-fill hover:text-accent-foreground transition-colors" />
      </PopoverTrigger>
      <PopoverContent
        className="z-30 mx-4 max-w-[150px] w-auto p-2"
        sideOffset={20}
      >
        {session ? <LogoutButton /> : <LoginButton />}
      </PopoverContent>
    </Popover>
  );
}
