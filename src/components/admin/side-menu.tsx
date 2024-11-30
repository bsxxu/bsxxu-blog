import DefaultAvatar from '@/assets/default-avatar.png';
import { auth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '../ui/sidebar';

const items = [
  {
    title: '返回博客',
    url: '/',
    icon: <span className="i-ri-home-4-line" />,
  },
  {
    title: '文章上传',
    url: '/admin/upload',
    icon: <span className="i-ri-upload-2-line" />,
  },
  {
    title: '文章列表',
    url: '/admin/post',
    icon: <span className="i-ri-file-list-3-line" />,
  },
  {
    title: '评论列表',
    url: '/admin/comment',
    icon: <span className="i-ri-message-3-line" />,
  },
  {
    title: '留言管理',
    url: '/admin/guestbook',
    icon: <span className="i-ri-message-2-line" />,
  },
  {
    title: '用户管理',
    url: '/admin/user',
    icon: <span className="i-ri-user-3-line" />,
  },
];

export default async function SideMenu({
  children,
}: { children?: React.ReactNode }) {
  const session = await auth();

  return (
    <SidebarProvider>
      <div className="flex items-start">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-4 py-2 pl-4">
              <Image
                src={session?.user?.image ?? DefaultAvatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <div>
                <div className="font-semibold">{session?.user?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {session?.user?.email}
                </div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex items-center gap-2 justify-center py-5"
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarTrigger className="m-3" />
      </div>
      {children}
    </SidebarProvider>
  );
}
