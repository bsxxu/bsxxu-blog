import Link from 'next/link';
import { ImBlogger, ImYelp } from 'react-icons/im';
import AnimateView from '../animate-view';
import ClickView from '../motion/click-view';
import DownToTopView from '../motion/down-to-top-view';

type BottomNav = {
  icon: React.ReactNode;
  href: string;
  name: string;
  description?: string;
};

const nav: BottomNav[] = [
  {
    icon: <ImBlogger />,
    href: '/blog',
    name: '文章',
    description: '一些大概率没什么营养的文章',
  },
  {
    icon: <ImYelp />,
    href: '/life',
    name: '日常',
    description: '分享一些我的无聊日常',
  },
];

export default function Other() {
  return (
    <DownToTopView
      as="div"
      delay={0.3}
      className="w-full space-y-7 py-24 pt-36 px-5 md:px-32"
    >
      <div className="text-center font-semibold text-2xl pb-10">想看点什么</div>
      <div className="flex justify-center gap-10">
        {nav.map((n, idx) => (
          <AnimateView
            as="div"
            key={n.href}
            motionProps={{
              initial: {
                opacity: 0,
                y: 30,
              },
              whileInView: {
                opacity: 1,
                y: 0,
              },
              transition: {
                delay: 0.7 + idx * 0.1,
                type: 'spring',
                stiffness: 400,
                damping: 17,
              },
              viewport: {
                once: true,
              },
            }}
          >
            <ClickView as="div" className="flex flex-col items-center max-w-24">
              <Link href={n.href} className="flex flex-col items-center gap-2">
                {n.icon}
                <span className="text-sm">{n.name}</span>
                <div className="text-xs text-muted-foreground text-center">
                  {n.description}
                </div>
              </Link>
            </ClickView>
          </AnimateView>
        ))}
      </div>
    </DownToTopView>
  );
}
