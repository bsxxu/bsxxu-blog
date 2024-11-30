import RightToLeftView from '@/components/motion/right-to-left-view';
import PostList from '@/components/post/post-list';
import SideMenu from '@/components/post/side-menu';
import { getPostsGroupByYear } from '@/service/server/post';

export const revalidate = 3600;

export default async function Page() {
  const { error, result: data } = await getPostsGroupByYear();
  if (error) throw new Error(error.message);

  return (
    <>
      <RightToLeftView className="mt-24 ">
        <div className="text-right text-4xl font-bold pr-10 text-muted-foreground">
          <div>Posts</div>
          <div className="text-base text-muted-foreground/50 font-normal">
            Some articles I wrote.
          </div>
        </div>
      </RightToLeftView>
      <div className="mt-16 px-5 md:px-32 space-y-32 pb-32">
        {data.map((d) => (
          <PostList key={d[0]} data={d[1]} year={d[0]} />
        ))}
      </div>
      <div className="right-5 fixed top-1/2 -translate-y-1/2">
        <SideMenu />
      </div>
    </>
  );
}
