import { Navbar } from "@/components/home";
import { Logo, Typography } from "@/components/shared";
import { useSetDocumentTitle } from "@/hooks/user-document-title";
import { Outlet } from "react-router-dom";


const HomeLayout = () => {
  useSetDocumentTitle('Home');
  
  return (
    <div
    className="relative grid grid-cols-1 md:grid-cols-2 min-h-screen overflow-hidden"
    >
      <div
        style={{ backgroundImage: 'url(/images/business.jpg' }}
        className="hidden relative md:block bg-cover bg-no-repeat bg-left-top"
      >
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="flex-col-center h-full p-6 relative z-20">
          <Logo className="text-white" />
          <Typography className="text-white h-full flex items-end italic">
            "The secret of getting ahead is getting started." - Mark Twain
          </Typography>
        </div>
      </div>
      <div className="min-h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default HomeLayout