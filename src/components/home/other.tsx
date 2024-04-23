import Link from 'next/link';
import AnimateView from '../animate-view';
import { ImBlogger, ImYelp } from 'react-icons/im';

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
    <AnimateView
      as="div"
      className="w-full space-y-7 py-24 pt-36 px-5 md:px-32"
      motionProps={{
        initial: {
          y: 50,
          opacity: 0,
        },
        whileInView: {
          y: 0,
          opacity: 1,
        },
        transition: {
          duration: 0.5,
          delay: 0.5,
          ease: 'easeOut',
        },
        viewport: {
          once: true,
        },
      }}
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
            <AnimateView
              as="div"
              className="flex flex-col items-center max-w-24"
              motionProps={{
                whileHover: { scale: 1.15 },
                whileTap: { scale: 0.9 },
                transition: { type: 'spring', stiffness: 400, damping: 17 },
              }}
            >
              <Link href={n.href} className="flex flex-col items-center gap-2">
                {n.icon}
                <span className="text-sm">{n.name}</span>
                <div className="text-xs text-ft-minor text-center">
                  {n.description}
                </div>
              </Link>
            </AnimateView>
          </AnimateView>
        ))}
      </div>
    </AnimateView>
  );
}
