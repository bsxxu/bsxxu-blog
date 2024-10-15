'use client';

import useCanvas from '@/hooks/use-canvas';
import Konva from 'konva';
import { useTheme } from 'next-themes';
import { useCallback, useEffect } from 'react';

export default function BgHome() {
  const { resolvedTheme } = useTheme();
  const draw = useCallback((s?: Konva.Stage) => {
    const iw = window.innerWidth;
    const ih = window.innerHeight;
    const layer = new Konva.Layer();
    for (let i = 10; i < iw; i += 25) {
      layer.add(
        new Konva.Line({
          points: [i, 0, i, ih],
          stroke: '#ffffff35',
          strokeWidth: 0.4,
        }),
      );
    }
    for (let i = 10; i < ih; i += 25) {
      layer.add(
        new Konva.Line({
          points: [0, i, iw, i],
          stroke: '#ffffff35',
          strokeWidth: 0.4,
        }),
      );
    }
    // layer.add(
    //   new Konva.Ellipse({
    //     x: iw / 1.5,
    //     y: ih * 1.15,
    //     radiusX: iw < 650 ? 650 : iw,
    //     radiusY: ih,
    //     shadowBlur: 30,
    //     fill: resolvedTheme === 'dark' ? 'hsl(240 2% 9%)' : 'white',
    //   }),
    // );
    s?.destroyChildren();
    s?.setAttrs({
      width: iw,
      height: ih,
    });
    s?.add(layer);
  }, []);

  const { stage, container } = useCanvas({
    width: window.innerWidth,
    height: window.innerHeight,
    init: draw,
  });

  useEffect(() => {
    const update = () => draw(stage);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [draw, stage]);

  return <div ref={container} className="fixed left-0 top-0 -z-10" />;
}
