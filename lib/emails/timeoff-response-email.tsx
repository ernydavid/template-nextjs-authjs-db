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
import { cn } from '../utils'

interface TimeOffEmailResponseProps {
  employeeName?: string
  employeeEmail: string
  startDate?: Date
  endDate?: Date
  status?: string
  created?: Date
  userResponse?: string
  updatedAt?: Date
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export const TimeOffEmailResponse = ({
  employeeName,
  employeeEmail,
  startDate,
  endDate,
  status,
  userResponse,
  updatedAt
}: TimeOffEmailResponseProps) => {
  const previewText = 'Time-off Employee Response'

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans px-2 tracking-tight'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[600px]'>
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
              Your request has been response!
            </Text>
            <Text className='text-[#082c50] text-[18px] leading-[24px]'>
              {`Dear ${employeeName},`}
            </Text>
            <Text className='text-[#082c50] text-[14px] leading-[24px]'>
              We have checked your request to take time off work. We inform you that your request has been answered. The status of the request is shown below:
            </Text>
            <Section className='w-full rounded-lg bg-sky-100 mx-auto'>
              <Row className='px-3 align-top' align='left'>
                <Column align='left'>
                  <Text className='leading-tight text-sm'>
                    Request By: <br />
                    <strong>{employeeName}</strong> <br />
                    --
                  </Text>
                </Column>
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
                    Status: <br />
                    <strong className={cn(
                      'px-3 rounded-full',
                      status === 'Rejected' && 'bg-red-500 text-white',
                      status === 'Aproved' && 'bg-emerald-500 text-white'
                    )}
                    >{status}
                    </strong> <br />
                    --
                  </Text>
                </Column>
              </Row>
            </Section>
            {status === 'Rejected'
              ? (
                <Text>
                  If you have any questions about your response, you can contact your area manager or the company's human resources department.
                </Text>)
              : (
                <Text>
                  We hope that we have responded satisfactorily to your request. Thank you for your service, we hope to see you soon in our Company.
                </Text>
                )}

            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
            <Text className='text-[#666666] text-[12px] leading-[24px]'>
              This response was created by {userResponse}.
              Created at {updatedAt?.toDateString()}.
              This response was sent from Employee Portal of 5999 Cargo. Please, to see more details go to employee portal of 5999 Cargo on this link below:
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
            <Text className='text-[12px] text-[#666666]'>If you didn't expect this response, you can ignore this email.</Text>
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

export default TimeOffEmailResponse
