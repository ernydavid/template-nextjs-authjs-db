import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Button
} from '@react-email/components'

interface ResetPasswordEmailProps {
  firstName: string
  confirmLink: string
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export default function ResetPasswordEmail ({
  firstName,
  confirmLink
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your reset link is ready!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`${baseUrl}/email/cargo-logo-dark.png`}
              width='150'
              height='auto'
              alt='5999Cargo Logo'
            />
          </Section>
          <Heading style={h1}>Reset your password</Heading>
          <Text style={heroText}>
            {`Hi ${firstName},`}
          </Text>
          <Text style={heroText}>
            Someone recently requested a password change for your 5999Cargo Employee Portal account. If this was you, you can set a new password here:
          </Text>

          <Button
            style={button}
            href={confirmLink}
          >
            Reset Password
          </Button>

          <Text style={text}>
            If you don't want to change your password or didn't request this, just ignore and delete this message.
            To keep your account secure, please don't forward this email to anyone.
          </Text>

          <Text style={text}>
            Dear Wishes!
          </Text>

          <Section>
            <Row style={footerLogos}>
              <Column style={{ width: '66%' }}>
                <Img
                  src={`${baseUrl}/email/cargo-logo-light.png`}
                  width='120'
                  height='auto'
                  alt='5999Cargo Logo'
                />
              </Column>
              <Column>
                <Section>
                  <Row>
                    <Column>
                      <Link href='#'>
                        <Img
                          src={`${baseUrl}/email/twitter-x-logo.png`}
                          width='24'
                          height='24'
                          alt='Twitter Logo'
                          style={socialMediaIcon}
                        />
                      </Link>
                    </Column>
                    <Column>
                      <Link href='#'>
                        <Img
                          src={`${baseUrl}/email/facebook-logo.png`}
                          width='24'
                          height='24'
                          alt='Facebook Logo'
                          style={socialMediaIcon}
                        />
                      </Link>
                    </Column>
                    <Column>
                      <Link href='#'>
                        <Img
                          src={`${baseUrl}/email/instagram-logo.png`}
                          width='24'
                          height='24'
                          alt='Instagram Logo'
                          style={socialMediaIcon}
                        />
                      </Link>
                    </Column>
                  </Row>
                </Section>
              </Column>
            </Row>
          </Section>

          <Section>
            <Link
              style={footerLink}
              href={`${baseUrl}/policy`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Policies
            </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href={`${baseUrl}/privacy`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Privacy
            </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href={`${baseUrl}/faq`}
              target='_blank'
              rel='noopener noreferrer'
              data-auth='NotApplicable'
              data-linkindex='6'
            >
              FAQ
            </Link>
            <Text style={footerText}>
              ©2024 5999 Cargo Group, a Cargo Company. <br />
              Rooseveltweg 21 D Street, Willemstad, Curacao, CUR <br />
              <br />
              All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const footerText = {
  fontSize: '12px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'left' as const,
  marginBottom: '50px'
}

const footerLink = {
  color: '#b7b7b7',
  textDecoration: 'underline'
}

const footerLogos = {
  marginBottom: '32px',
  paddingLeft: '8px',
  paddingRight: '8px',
  width: '100%'
}

const socialMediaIcon = {
  display: 'inline',
  marginLeft: '32px'
}

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
}

const container = {
  margin: '0 auto',
  padding: '0px 20px'
}

const logoContainer = {
  marginTop: '32px',
  background: 'rgb(0, 51, 102)',
  padding: '10px'
}

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px'
}

const heroText = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px'
}

const button = {
  backgroundColor: '#103a6a',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  width: '210px',
  fontSize: '15px',
  fontWeight: '700',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 7px'
}

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px'
}
