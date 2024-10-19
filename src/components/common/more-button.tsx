import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import LoginButton from './login-button';

export default function MoreButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="i-ri-more-2-fill hover:text-accent-foreground transition-colors" />
      </PopoverTrigger>
      <PopoverContent
        className="z-30 mx-4 max-w-[150px] w-auto p-2"
        sideOffset={20}
      >
        <LoginButton />
      </PopoverContent>
    </Popover>
  );
}
