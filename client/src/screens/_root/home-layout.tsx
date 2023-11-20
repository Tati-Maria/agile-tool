import { Navbar, Footer } from "@/components/home"
import { Outlet } from "react-router-dom";


const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 text-white">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default HomeLayout