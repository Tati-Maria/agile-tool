import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import UserDropdownMenu from "./user-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/hooks/use-auth";

interface BottonNavProps {
    routes: {
        href: string;
        label: string;
    }[];
    projectId: string | undefined;
    
}


const BottonNav = ({routes}: BottonNavProps) => {
    const { user } = useAuth();

  return (
    <nav className="lg:hidden fixed bottom-0 z-20 left-0 w-full flex justify-between items-center bg-white dark:bg-gray-900 border-t dark:border-gray-700 px-4 py-2">
      <Menubar className="bg-transparent justify-between border-none flex w-full">
        <MenubarMenu>
          <MenubarTrigger>Project</MenubarTrigger>
          <MenubarContent>
            {routes.map((route, i) => (
              <MenubarItem key={i}>
                <Link to={route.href}>{route.label}</Link>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
        <ModeToggle />
        {/* Avatar */}
        <UserDropdownMenu>
          <Avatar>
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>
              {user?.name?.split(' ').map(n => n[0])}
            </AvatarFallback>
          </Avatar>
        </UserDropdownMenu>
      </Menubar>
    </nav>
  );
}

export default BottonNav