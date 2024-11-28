import type { getMessagesByPage } from '../server/message';

export type MessageType = Awaited<
  ReturnType<typeof getMessagesByPage>
>['data'][0];
