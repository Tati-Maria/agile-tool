import { Logo } from "@/components/shared";
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <Logo />
      </div>
      <div className="grid grid-cols-1 pb-2 place-items-center h-full">
        <Outlet />
      </div>
    </section>
  );
}

export default AuthLayout;