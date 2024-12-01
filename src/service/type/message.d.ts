import type { getMessagesByPage } from '../common/message';

export type MessageType = Awaited<
  ReturnType<typeof getMessagesByPage>
>['data'][0];
