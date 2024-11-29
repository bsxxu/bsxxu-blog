import DefaultAvatar from '@/assets/default-avatar.png';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { auth, isAdmin } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';

const items = [
  {
    title: '返回博客',
    url: '/',
    icon: <span className="i-ri-home-4-line" />,
  },
  {
    title: '上传文章',
    url: '/admin/upload',
    icon: <span className="i-ri-upload-2-line" />,
  },
];

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  const session = await auth();

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
                    <Collapsible defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            test
                            <span className="i-ri-arrow-right-s-line transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuSubItem>testsub</SidebarMenuSubItem>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
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
    </div>
  );
}
