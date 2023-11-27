import { Icons } from '@/components/ui/icons';
import { SideModal } from '@/components/modals/side-modal';
import { Button } from '@/components/ui/button';
import UserDropdownMenu from '@/components/shared/user-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/shared/mode-toggle';
import { Sidebar } from '.';

import { cn } from '@/lib/utils';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

interface ProjectHeaderProps {
  routes: {
    href: string;
    label: string;
    icon: string;
  }[];
  projectId: string | undefined;
}

const ProjectHeader = ({ routes }: ProjectHeaderProps) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="flex-between py-4  border-b mb-10 max-w-[1450px] mx-auto px-4">
      <div className="flex items-center space-x-5 lg:space-x-16">
        <div
        className='block lg:hidden'
        >
          <SideModal
          side='left'
            action={
              <Button variant={'ghost'} className="p-0 hover:bg-transparent">
                <RxHamburgerMenu className="w-6 h-6" />
              </Button>
            }
          >
            <Sidebar routes={routes} />
          </SideModal>
        </div>
        <NavLink className={'flex-center space-x-1'} to={`/projects`}>
          <img src="/icons/logo.svg" alt="logo" width={40} height={40} />
          <span className="font-bold text-lg uppercase">Worktec</span>
        </NavLink>
        <ul className="hidden lg:flex-items-center space-x-8 text-sm font-medium">
          {routes.map((route, i) => (
            <li
              className={cn(
                'cursor-pointer hover:text-teal-600',
                location.pathname === route.href && 'text-teal-600'
              )}
              key={i}
            >
              <NavLink to={route.href}>{route.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-x-2 flex-items-center">
        <div className="hidden md:flex-center w-8 h-8 bg-muted rounded-full cursor-pointer hover:bg-teal-600">
          <Icons.search className="w-4 h-4" />
        </div>
        <div className="hidden md:flex-center w-8 h-8 bg-muted rounded-full cursor-pointer hover:bg-teal-600">
          <Icons.plusCircle className="w-4 h-4" />
        </div>
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
      </div>
    </nav>
  );
};

export default ProjectHeader;
