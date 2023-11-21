import ForgotPasswordForm from "@/components/auth/forgot-password-form"
import { Heading, Typography } from "@/components/shared"


const ForgotPassword = () => {
  return (
    <section>
      <div className="text-center space-y-1">
        <Heading className="text-xl md:text-2xl" level={2}>
          Reset Password
        </Heading>
        <Typography className="text-slate-500">
          Enter your email and a new password to reset your password.
        </Typography>
      </div>
      <ForgotPasswordForm />
    </section>
  )
}

export default ForgotPassword