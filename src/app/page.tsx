import AboutMe from '@/components/home/about-me';
import Contact from '@/components/home/contact';
import Gallery from '@/components/home/gallery';
import Hero from '@/components/home/hero';
import Recently from '@/components/home/recently';

//TODO 开往https://list.travellings.cn/
export default function Home() {
  return (
    <div className="h-[500vh]">
      <Hero />
      <Recently />
      <Gallery />
      <Contact />
      <AboutMe />
    </div>
  );
}
