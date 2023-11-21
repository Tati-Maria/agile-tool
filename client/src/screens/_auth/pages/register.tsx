import RegisterForm from "@/components/auth/register-form"
import { Heading, Typography } from "@/components/shared"

const Register = () => {
  return (
    <section>
      <div className="flex-col-center space-y-1 text-center">
        <Heading className="text-xl md:text-2xl" level={2}>
          Create an account
        </Heading>
        <Typography className="text-slate-500">
          Enter your details to begin using our services.
        </Typography>
      </div>
      <RegisterForm
      onSubmit={() => {}}
       />
    </section>
  )
}

export default Register