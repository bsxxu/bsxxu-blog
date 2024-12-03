import {
  Body,
  Button,
  Container,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export default function VerificationEmail({
  magicLink,
}: { magicLink: string }) {
  return (
    <Html lang="en">
      <Preview>Aiduorin: Hi👋, friend.</Preview>
      <Tailwind>
        <Body>
          <Container className="bg-[#111112] mx-auto border border-solid border-[#ababab] rounded p-4">
            <Heading className="text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              👋, Welcome to aiduorin.me!
            </Heading>
            <Text className="text-center">
              Click the button below to log in
            </Text>
            <Section className="text-center mt-[25px] mb-[32px]">
              <Button
                className="bg-white rounded text-black text-[12px] font-semibold no-underline text-center px-8 py-3"
                href={magicLink}
              >
                Login
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Section className="">
              <Text className="text-[#ababab] text-xs">
                This email will expire in 1 hours, please log in as soon as
                possible
              </Text>
              <Text className="text-[#ababab] text-xs">
                Copyright © {new Date().getFullYear()} Aiduorin
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
