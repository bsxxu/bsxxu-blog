import Hero from '@/components/home/hero';
import Other from '@/components/home/other';
import Recently from '@/components/home/recently';

//TODO 开往https://list.travellings.cn/
export default function Home() {
  return (
    <>
      <Hero />
      <Recently />
      <Other />
    </>
  );
}
