import 'server-only';

import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { render } from '@react-email/components';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { db } from './db';
import { sesClient } from './email';
import VerificationEmail from './email/verification-email';

const sendVerificationRequest = async ({
  identifier: email,
  url,
}: { identifier: string; url: string }) => {
  const command = new SendEmailCommand({
    Source: 'Bsx<noreply@bsxxu.me>',
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: await render(<VerificationEmail magicLink={url} />),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Log in to bsxxu.me using your email.',
      },
    },
  });
  await sesClient.send(command);
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub,
    {
      id: 'http-email',
      name: 'Email',
      type: 'email',
      maxAge: 60 * 60,
      sendVerificationRequest,
    },
  ],
});

export const isAdmin = async () => {
  const session = await auth();
  return session?.user?.email?.toLowerCase() === 'bsxhomu@outlook.com';
};
