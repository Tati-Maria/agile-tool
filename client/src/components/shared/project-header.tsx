import { Icons } from '@/components/ui/icons';
// import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const ProjectHeader = () => {
  const { user } = useAuth();

  return (
    <nav className="flex-between">
      <div>
        <NavLink to="/">
          <img src="/icons/logo.svg" alt="logo" width={40} height={40} />
          <span>Worktec</span>
        </NavLink>
        <ul></ul>
      </div>
      <div className="flex-items-center">
        <div className="flex-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
          <Icons.search className="w-6 h-6" />
        </div>
        <div className="flex-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
          <Icons.plusCircle className="w-6 h-6" />
        </div>
        <div className="flex-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
          <Icons.gear className="w-6 h-6" />
        </div>
        <div className="flex-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
          <Icons.bell className="w-6 h-6" />
        </div>
        {/* Avatar */}
        <div className="flex-items-center">
          <span className="font-semibold">{user?.name}</span>
          <Avatar>
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>
              {user?.name?.split(' ').map(n => n[0])}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default ProjectHeader;
