import { Navbar, Footer } from "@/components/home";
import { useSetDocumentTitle } from "@/hooks/user-document-title";
import { Outlet } from "react-router-dom";


const HomeLayout = () => {
  useSetDocumentTitle('Home');
  
  return (
    <div className="h-full">
      <Navbar />
      <main className="max-w-[1450px] mx-auto px-4 h-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default HomeLayout