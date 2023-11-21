import LoginForm from "@/components/auth/login-form"
import { Heading, Typography } from "@/components/shared"
import { useSetDocumentTitle } from "@/hooks/user-document-title"


const Login = () => {
  useSetDocumentTitle("Login")

  return (
    <section>
      <div className="text-center space-y-1">
        <Heading className="text-xl md:text-2xl" level={2}>
          Welcome Back
        </Heading>
        <Typography className="text-slate-500">
          Glad to see you again 👋! Login to your account to continue.
        </Typography>
      </div>
      <LoginForm />
    </section>
  )
}

export default Login