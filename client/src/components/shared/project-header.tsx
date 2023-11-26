import { Icons } from '@/components/ui/icons';
import UserDropdownMenu from './user-dropdown-menu';
import { ModeToggle } from './mode-toggle';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

interface ProjectHeaderProps {
  routes: {
    href: string;
    label: string;
  }[];
  projectId: string | undefined;
}

const ProjectHeader = ({routes}: ProjectHeaderProps) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="lg:flex-between py-4  border-b mb-10 max-w-[1450px] mx-auto px-4">
      <div className='flex-center space-x-16'>
        <NavLink className={"flex-center space-x-1"} to={`/projects`}>
          <img src="/icons/logo.svg" alt="logo" width={40} height={40} />
          <span className='font-bold text-lg'>Worktec</span>
        </NavLink>
        <ul className='hidden lg:flex-center space-x-8 text-sm font-medium'>
          {routes.map((route, i) => (
            <li 
            className={cn("cursor-pointer hover:text-blue-600", location.pathname === route.href && "text-blue-600")}
            key={i}>
              <NavLink to={route.href}>
                {route.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-x-2 flex-items-center">
        <div className="hidden md:flex-center w-8 h-8 bg-muted rounded-full cursor-pointer hover:bg-blue-600">
          <Icons.search className="w-4 h-4" />
        </div>
        <div className="hidden md:flex-center w-8 h-8 bg-muted rounded-full cursor-pointer hover:bg-blue-600">
          <Icons.plusCircle className="w-4 h-4" />
        </div>
        <ModeToggle />
        {/* Avatar */}
        <UserDropdownMenu >
          <Avatar>
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>
              {user?.name?.split(' ').map(n => n[0])}
            </AvatarFallback>
          </Avatar>
        </UserDropdownMenu>
      </div>
    </nav>
  );
};

export default ProjectHeader;
