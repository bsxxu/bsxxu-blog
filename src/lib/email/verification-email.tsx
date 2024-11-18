import {
  Body,
  Button,
  Container,
  Heading,
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
      <Preview>σ`∀´)σ Log in to bsx's blog.</Preview>
      <Tailwind>
        <Body>
          <Container className="mx-auto">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              👋, Welcome to bsxxu.me!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Click the button below to log in:
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={magicLink}
              >
                Login
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
