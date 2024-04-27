import { StaticImageData } from 'next/image';
import madoHomu from '@/assets/arts/20221222.jpg';
import elysia1 from '@/assets/arts/20230414.jpg';
import elysia2 from '@/assets/arts/20230503.jpg';
import robin from '@/assets/arts/20240217.jpg';
//TODO 删除
export type Artwork = {
  data: StaticImageData | string;
  title?: string;
  pixivUrl?: string;
};

const artworks: Artwork[] = [
  {
    data: madoHomu,
    title: '冬天的粉黑',
  },
  {
    data: elysia1,
    title: '爱门摸鱼图',
    pixivUrl: 'https://www.pixiv.net/artworks/107201298',
  },
  {
    data: elysia2,
    title: '爱莉希雅',
    pixivUrl: 'https://www.pixiv.net/artworks/108127464',
  },
  {
    data: robin,
    title: 'robin',
  },
];

export default artworks;
