'use client';

import { usePaschal } from '@/providers/context-state-provider';
import Osu from './osu';

export enum Eggs {
  OSU = 'osu',
  Null = 'null',
}

export default function PaschalEggs() {
  const p = usePaschal();
  let page: React.ReactNode | null;
  switch (p) {
    case Eggs.OSU:
      page = <Osu />;
      break;
    default:
      page = null;
  }
  return page;
}
