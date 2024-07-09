'use client'

import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/new-verification'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { CredentialsCard } from './credentials-card-wrapper'

function NewVerificationForm () {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) {
      return
    }

    if (!token) {
      setError('Missing Token!')
      return
    }

    newVerification(token).then((data) => {
      setSuccess(data.success)
      setError(data.error)
    }).catch(() => {
      setError('Something went wrong!')
    })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CredentialsCard
      title='Confirm your Email'
      subtitle='Just wait a moment while verify your account'
      showIcon
      imagefirst
      backButtonLabel='Back to Login'
      backButtonHref='/auth/login'
    >
      <div className='flex items-center justify-center'>
        {(!error && !success) &&
          <BeatLoader color='gray' />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CredentialsCard>
  )
}

export default NewVerificationForm
