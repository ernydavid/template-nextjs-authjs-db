'use server'

import { Resend } from 'resend'
import TwoFactorConfirmEmail from './emails/two-factor-code-email'
import ResetPasswordEmail from './emails/reset-password-email'
import VerificationTokenEmail from './emails/verification-token-email'
import InvitationUserEmail from './emails/employee-invitation-email'
import NewTimeOffRequestEmail from './emails/new-timeoff-request-email'
import TimeOffEmailResponse from './emails/timeoff-response-email'

const resend = new Resend(process.env.RESEND_API_KEY as string)

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: 'EmployeePortal@ernysalcedo.dev',
    to: email,
    subject: 'Two Factor Authentication Code',
    react: TwoFactorConfirmEmail({ validationCode: token })
  })
}

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: 'EmployeePortal@ernysalcedo.dev',
    to: email,
    subject: 'Reset Your Password',
    // html: `<p style={color: #103a6a; font-weight: 700;}> Please, click <a href="${confirmLink}">here</a> to confirm email</p>`
    react: ResetPasswordEmail({ firstName: email, confirmLink })
  })
}

export const sendVerificationTokenEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: 'EmployeePortal@ernysalcedo.dev',
    to: email,
    subject: 'Employee Portal',
    react: VerificationTokenEmail({ email, confirmLink })
  })
}

export const sendInvitationEmail = async ({
  name,
  invitedByUsername,
  invitedByEmail,
  inviteLink,
  credentialEmail,
  credentialPassword
}: {
  name: string,
  invitedByUsername: string,
  invitedByEmail: string,
  inviteLink: string,
  credentialEmail: string,
  credentialPassword: string
}) => {
  await resend.emails.send({
    from: 'EmployeePortal@ernysalcedo.dev',
    to: [credentialEmail, 'employee5999cargo@gmail.com'],
    subject: 'Welcome to Employee Portal!',
    react: InvitationUserEmail({
      name,
      invitedByEmail,
      invitedByUsername,
      credentialEmail,
      credentialPassword,
      inviteLink
    })
  })
}

export const sendFeedbackEmail = async (
  email: string,
  feedback: string
) => {
  await resend.emails.send({
    from: 'EmployeePortal@ernysalcedo.dev',
    to: [email, 'employee5999cargo@gmail.com'],
    subject: 'Feedback Employee Portal',
    html: `I have a feedback:
    "${feedback}"`
  })
}

interface SendNewTimeOffRequestEmailProps {
  employeeName: string,
  employeeEmail: string,
  type: string,
  startDate: Date,
  endDate: Date,
  created: Date
}

export const sendNewTimeOffRequestEmail = async ({
  employeeName,
  employeeEmail,
  type,
  startDate,
  endDate,
  created
}: SendNewTimeOffRequestEmailProps) => {
  await resend.emails.send({
    from: 'EmployeePortal@ernysalcedo.dev',
    to: [employeeEmail, 'employee5999cargo@gmail.com'],
    subject: 'Time-off Request',
    react: NewTimeOffRequestEmail({
      employeeEmail,
      employeeName,
      type,
      created,
      endDate,
      startDate
    })
  })
}

interface SendTimeOffResponseEmailProps {
  employeeName: string,
  employeeEmail: string,
  startDate: Date,
  endDate: Date,
  status: string,
  userResponse: string,
  updatedAt: Date
}

export const sendTimeOffResponseEmail = async ({
  employeeName,
  employeeEmail,
  startDate,
  endDate,
  status,
  userResponse,
  updatedAt
}: SendTimeOffResponseEmailProps) => {
  await resend.emails.send({
    from: 'EmployeePortal@ernysalcedo.dev',
    to: [employeeEmail, 'employee5999cargo@gmail.com'],
    subject: 'Time-off Response',
    react: TimeOffEmailResponse({
      employeeEmail,
      employeeName,
      endDate,
      startDate,
      status,
      updatedAt,
      userResponse
    })
  })
}
