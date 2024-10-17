'use client';

import useCanvas from '@/hooks/use-canvas';
import Konva from 'konva';
import { useTheme } from 'next-themes';
import { useCallback, useEffect } from 'react';

export default function BgDot() {
  const { resolvedTheme } = useTheme();
  const draw = useCallback(
    (s?: Konva.Stage) => {
      if (!s) return;
      const iw = window ? window.innerWidth : 3000;
      const ih = window ? window.innerHeight : 2000;
      const layer = new Konva.Layer();
      for (let j = -20; j < 200; j += 16) {
        for (let i = (j / 20) & 1 ? 0 : 8; i < iw; i += 16) {
          const theme = resolvedTheme === 'dark' ? '#ffffff' : '#000000';
          const fill = `${theme}${Math.round((1 - j / 200) * 0x44).toString(16)}`;
          layer.add(
            new Konva.Circle({
              x: i,
              y: j,
              radius: 1,
              fill:
                fill.length < 9 ? `${fill.slice(0, 7)}0${fill.at(-1)}` : fill,
            }),
          );
        }
      }
      s.destroyChildren();
      s.setAttrs({
        width: iw,
        height: ih,
      });
      s.add(layer);
    },
    [resolvedTheme],
  );

  const { stage, container } = useCanvas({
    height: 3000,
    width: 2000,
    init: draw,
  });

  useEffect(() => {
    const update = () => draw(stage);
    window?.addEventListener('resize', update);
    return () => window?.removeEventListener('resize', update);
  }, [draw, stage]);

  return <div ref={container} className="fixed left-0 top-0 -z-10" />;
}
