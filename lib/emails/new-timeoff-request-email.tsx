import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface NewTimeOffRequestEmailProps {
  employeeName?: string
  employeeEmail: string
  type?: string
  startDate?: Date
  endDate?: Date
  created?: Date
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export const NewTimeOffRequestEmail = ({
  employeeName,
  employeeEmail,
  type,
  startDate,
  endDate,
  created
}: NewTimeOffRequestEmailProps) => {
  const previewText = `${employeeName}'s Time-off Request`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans px-2 tracking-tight'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[450px]'>
            <Section className='mt-[32px]'>
              <Img
                src={`${baseUrl}/email/cargo-logo-light.png`}
                width='150'
                height='auto'
                alt='5999 Cargo'
                className='my-0 mx-auto'
              />
            </Section>
            <Text className='text-[#082c50] text-[24px] font-bold text-center p-0 my-[30px] mx-0'>
              {`${employeeName} has requested a Time-off`}
            </Text>
            <Text className='text-[#082c50] text-[18px] leading-[24px]'>
              Dear Managers of 5999 Cargo,
            </Text>
            <Text className='text-[#082c50] text-[14px] leading-[24px]'>
              I open a request to take time off work, for the following period that I specify below:
            </Text>
            <Section className='w-full rounded-lg bg-sky-100 mx-auto'>
              <Row className='px-3 py-2'>
                <Column align='right'>
                  <Container className='w-[80px] h-[80px] rounded-full bg-sky-600 flex items-center justify-center overflow-hidden'>
                    <Img
                      src={`${baseUrl}/email/icon-logo-dark.png`}
                      width='80'
                      height='80'
                      alt='5999 Cargo user logo'
                      className='my-0 mx-auto'
                    />
                  </Container>
                </Column>
                <Column align='left'>
                  <Text className='leading-tight text-sm'>
                    Request By: <br />
                    <strong>{employeeName}</strong> <br />
                    --
                  </Text>
                </Column>
              </Row>
              <Row className='px-3 align-top' align='left'>
                <Column align='left'>
                  <Text className='leading-tight text-sm'>
                    Time-off period: <br />
                    <strong className='py-px px-3 rounded-full bg-sky-200'>
                      {`${startDate?.toDateString()}-`}
                    </strong> <br />
                    <strong className='py-px px-3 rounded-full bg-sky-200'>
                      {endDate?.toDateString()}
                    </strong>
                  </Text>
                </Column>
                <Column align='left'>
                  <Text className='leading-tight text-sm'>
                    Type: <br />
                    <strong>{type}</strong> <br />
                    --
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
            <Text className='text-[#666666] text-[12px] leading-[24px]'>
              This request was created by {employeeName} and sent from: {employeeEmail}. <br />
              Created at {created?.toDateString()}.
              Request was sent from Employee Portal of 5999 Cargo. If you want to manage response of this request, please go to employee portal of 5999 Cargo on this link below
            </Text>
            <Section
              className='w-full p-3 mx-auto text-center'
            >
              <Button
                className='px-5 py-2 rounded-full bg-[#082c50] text-white text-sm font-semibold hover:bg-[#082c50b1]'
                href={`${baseUrl}/dashboard/time-off`}
              >
                Enter to Employee Portal
              </Button>
            </Section>
            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
            <Text className='text-[#666666] text-[12px]'>
              ©2024 5999 Cargo Group, a Cargo Company. <br />
              Rooseveltweg 21 D Street, Willemstad, Curacao, CUR <br />
              <br />
              All rights reserved.®
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default NewTimeOffRequestEmail
