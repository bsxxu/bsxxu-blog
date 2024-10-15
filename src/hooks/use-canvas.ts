import Konva from 'konva';
import { useCallback, useState } from 'react';

export default function useCanvas({
  width,
  height,
  init,
}: { width: number; height: number; init?: (s?: Konva.Stage) => void }) {
  const [stage, setStage] = useState<Konva.Stage>();
  return {
    stage,
    container: useCallback(
      (n: HTMLDivElement | null) => {
        if (!n) stage?.destroyChildren();
        else if (stage) init?.(stage);
        else if (!stage) {
          setStage(
            new Konva.Stage({
              container: n,
              width,
              height,
            }),
          );
        }
      },
      [width, height, init, stage],
    ),
  };
}
