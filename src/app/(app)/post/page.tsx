import BgDot from '@/components/common/bg-dot';
import DownToTopView from '@/components/motion/down-to-top-view';
import PostList from '@/components/post/post-list';
import SideMenu from '@/components/post/side-menu';
import { getPostsGroupByYear } from '@/service/server/post';

export const revalidate = 3600;

export default async function Posts() {
  const data = await getPostsGroupByYear();
  return (
    <>
      <BgDot />
      <DownToTopView className="mt-24 ">
        <div className="text-right text-4xl font-bold pr-10 text-muted-foreground">
          Posts
        </div>
      </DownToTopView>
      <div className="mt-16 px-5 md:px-32 space-y-32 pb-32">
        {data.map((d) => (
          <PostList key={d[0]} data={d[1]} year={d[0]} />
        ))}
      </div>
      <div className="right-5 fixed top-[50vh]">
        <SideMenu />
      </div>
    </>
  );
}
