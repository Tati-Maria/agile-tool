import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { Logo, UserDropDownMenu } from '@/components/shared';
import { Link } from 'react-router-dom';

const ProjectNav = () => {
  const { user } = useAuth();

  return (
    <div className="flex-between py-4 mb-10">
      <nav className="flex-center space-x-16">
        <Logo className="md:text-xl" />
        <ul className="flex-center space-x-8 text-sm">
          <li className="link-text dark:hover:text-blue-500">
            <Link to="#">Features</Link>
          </li>
          <li className="link-text dark:hover:text-blue-500">
            <Link to="#">Pricing</Link>
          </li>
          <li className="link-text dark:hover:text-blue-500">
            <Link to="#">Resources</Link>
          </li>
        </ul>
      </nav>
      <UserDropDownMenu>
        <Avatar>
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>
            {user?.name?.split(' ').map(n => n[0])}
          </AvatarFallback>
        </Avatar>
      </UserDropDownMenu>
    </div>
  );
};

export default ProjectNav;
