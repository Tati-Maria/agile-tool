import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <section className="min-h-screen relative">
      <img
        src="/images/project-management.jpg"
        alt="background"
        className="absolute inset-0 h-full w-full object-cover"
      />{' '}
      {/* Background image */}
      <div className="absolute inset-0 bg-black opacity-20"></div>{' '}
      {/* Background overlay */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full"
        style={{ minHeight: '600px' }}
      >
        <div className="flex items-center justify-center space-y-2">
        <div className="rounded-md shadow-md p-8 mt-8 glass">
          <Outlet />
        </div>
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;