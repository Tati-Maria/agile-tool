import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <section className="h-screen bg-[#f6f5fd] grid grid-cols-1 place-items-center">
        <div className="">
          <Outlet />
        </div>
    </section>
  )
}

export default AuthLayout;