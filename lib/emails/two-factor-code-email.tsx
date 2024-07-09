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
  Text
} from '@react-email/components'

interface TwoFactorConfirmEmailProps {
  validationCode?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export default function TwoFactorConfirmEmail ({
  validationCode
}: TwoFactorConfirmEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your 2FA Code</Preview>
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
          <Heading style={h1}>Your 2FA Code is ready</Heading>
          <Text style={heroText}>
            Your two-factor authentication code is below - copy it in your open browser window and get signed in.
          </Text>

          <Section style={codeBox}>
            <Text style={confirmationCodeText}>{validationCode}</Text>
          </Section>

          <Text style={text}>
            If you didn't request this email, there's nothing to worry about, you
            can safely ignore it.
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

const codeBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '4px',
  marginBottom: '30px',
  padding: '40px 10px'
}

const confirmationCodeText = {
  fontSize: '30px',
  textAlign: 'center' as const,
  verticalAlign: 'middle'
}

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px'
}
