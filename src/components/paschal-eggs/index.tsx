'use client';

import { usePaschalValue } from '@/providers/paschal-provider';
import Osu from './osu';

export enum Eggs {
  OSU = 'osu',
  Null = 'null',
}

export default function PaschalEggs() {
  const p = usePaschalValue();
  let page;
  switch (p) {
    case Eggs.OSU:
      page = <Osu />;
      break;
    default:
      page = null;
  }
  return page;
}
