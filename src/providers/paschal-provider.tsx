'use client';

import { createContextState } from 'foxact/context-state';

//TODO 使用枚举
export const [PaschalProvider, usePaschalValue, useSetPaschal] =
  createContextState('null');
