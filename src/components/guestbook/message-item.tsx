import DefaultAvatar from '@/assets/default-avatar.png';
import type { MessageType } from '@/service/type/message';
import dayjs from 'dayjs';
import Image from 'next/image';
import DownToTopView from '../motion/down-to-top-view';

export default function MessageItem({ data }: { data: MessageType }) {
  return (
    <DownToTopView
      className="p-4 space-y-3 rounded-xl border break-inside-avoid"
      delay={Math.random() * 0.5}
    >
      <div className="flex items-center gap-3">
        <Image
          src={data.user.image ?? DefaultAvatar}
          alt="avatar"
          width={25}
          height={25}
          className="rounded-full"
        />
        <div className="line-clamp-1">{data.user.name}</div>
      </div>
      <div className="text-muted-foreground break-words text-sm">
        {data.content}
      </div>
      <div className="space-y-1">
        <hr className="border-muted-foreground/10" />
        <div className="text-muted-foreground/80 text-[11px]">
          {dayjs(data.createdAt).utcOffset(8).format('YYYY-MM-DD HH:mm:ss CST')}
        </div>
      </div>
    </DownToTopView>
  );
}
