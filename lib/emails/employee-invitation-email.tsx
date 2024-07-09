import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface InvitationUserEmailProps {
  name?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  credentialEmail: string;
  credentialPassword: string;
  inviteLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export const InvitationUserEmail = ({
  name,
  invitedByUsername,
  invitedByEmail,
  inviteLink,
  credentialEmail,
  credentialPassword
}: InvitationUserEmailProps) => {
  const previewText = 'Join 5999 Cargo on Employee Portal'

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans px-2'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]'>
            <Section className='mt-[32px]'>
              <Img
                src={`${baseUrl}/email/cargo-logo-light.png`}
                width='150'
                height='auto'
                alt='5999 Cargo'
                className='my-0 mx-auto'
              />
            </Section>
            <Heading className='text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0'>
              Join 5999 Cargo on <strong>Employee Portal</strong>
            </Heading>
            <Text className='text-black text-[18px] leading-[24px]'>
              {`Hello ${name},`}
            </Text>
            <Text className='text-black text-[14px] leading-[24px]'>
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className='text-blue-600 no-underline'
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong> Employee Portal</strong> of
              <strong>&nbsp;5999 Cargo</strong>.
            </Text>
            <Text>Your login credentials are ready.  For added security, we suggest changing your password once you've logged in.</Text>
            <Section
              className='p-4 w-full rounded-lg bg-gray-100 mb-5'
            >
              <Row>
                <Column align='right'>
                  <Img
                    className='rounded-full flex-0'
                    src={`${baseUrl}/email/lock.png`}
                    width='32'
                    height='32'
                  />
                </Column>
                <Column align='left'>
                  <Text className='ml-5 text-black text-[14px] flex-1'>
                    <strong>Email:</strong>&nbsp;
                    {credentialEmail} <br />
                    <strong>Password:</strong>&nbsp;
                    {credentialPassword}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section>
              <Row>
                <Column align='right'>
                  <Img
                    className='rounded-full'
                    src={`${baseUrl}/email/user-pic.png`}
                    width='64'
                    height='64'
                  />
                </Column>
                <Column align='center'>
                  <Img
                    src={`${baseUrl}/email/arrow-right.png`}
                    width='16'
                    height='16'
                    alt='invited you to'
                  />
                </Column>
                <Column align='left'>
                  <Img
                    className='rounded-full'
                    src={`${baseUrl}/email/icon-logo-dark.png`}
                    width='64'
                    height='64'
                  />
                </Column>
              </Row>
            </Section>
            <Section className='text-center mt-[32px] mb-[32px]'>
              <Button
                className='bg-[#103a6a] rounded-lg text-white text-[12px] font-semibold no-underline text-center px-5 py-3'
                href={inviteLink}
              >
                Join to the Employee Portal
              </Button>
            </Section>
            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
            <Text className='text-[#666666] text-[12px] leading-[24px]'>
              This invitation was intended for{' '}
              <span className='text-black'>{invitedByUsername}</span>. This invite was
              sent from Employee Portal of 5999 Cargo. If you
              were not expecting this invitation, you can ignore this email. If
              you are concerned about your account's safety, please reply to
              this email to get in touch with us.
            </Text>
            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
            <Text className='text-[#666666] text-[12px]'>
              ©2024 5999 Cargo Group, a Cargo Company. <br />
              Rooseveltweg 21 D Street, Willemstad, Curacao, CUR <br />
              <br />
              All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default InvitationUserEmail
