import { CredentialsCard } from '@/components/auth/credentials-card-wrapper'
import { LoginForm } from '@/components/auth/login-form'
// import { LoginForm } from '@/components/auth/login-form'

async function LoginPage () {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <CredentialsCard
        title='Welcome Back!'
        subtitle='Please Login with your credentials'
        image='/assets/employee-login.png'
        imageAlt='Employee woman of 5999 Cargo'
        showIcon
      >
        <LoginForm />
      </CredentialsCard>
    </div>
  )
}

export default LoginPage
