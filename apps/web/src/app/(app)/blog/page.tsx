import PostCard from '@/components/post-card';
import PostList from '@/components/post-list';
import SideMenu from '@/components/side-menu';
import { getAllPost } from '@/lib/mdx';

//TODO ssg
export default function AllPosts() {
	const posts = getAllPost();
	return (
		<>
			<div className="text-center mt-40 mb-10 text-ft-strong text-3xl font-bold">
				共{posts.length}篇文章
			</div>
			<PostList posts={posts} />
		</>
	);
}
