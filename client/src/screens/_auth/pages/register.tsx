import RegisterForm from "@/components/auth/register-form"
import { Heading, Typography } from "@/components/shared";
import { useSetDocumentTitle } from "@/hooks/user-document-title";

const Register = () => {
  useSetDocumentTitle("Register");

  return (
    <section>
      <div className="flex-col-center text-muted space-y-1 text-center">
        <Heading className="text-xl md:text-2xl" level={2}>
          Create an account
        </Heading>
        <Typography>
          Enter your details to begin using our services.
        </Typography>
      </div>
      <RegisterForm
       />
    </section>
  )
}

export default Register