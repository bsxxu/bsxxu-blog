import AboutMe from '@/components/home/about-me';
import Gallery from '@/components/home/gallery';
import Hero from '@/components/home/hero';
import Recently from '@/components/home/recently';

//TODO 开往https://list.travellings.cn/
export default function Home() {
  return (
    <div className="h-[400vh]">
      <Hero />
      <Recently />
      <Gallery />
      <AboutMe />
    </div>
  );
}
