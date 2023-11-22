import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  routes: {
    href: string;
    icon: React.ReactNode;
    label: string;
  }[];
}

const Sidebar = ({ routes, className, ...rest }: SidebarProps) => {
  return (
    <aside className={cn(className, "fixed top-0 left-0 h-screen")} {...rest}>
      <ul className="flex flex-col space-y-5">
        {routes.map((route, index) => (
          <li key={index}>
            <NavLink className="flex items-center space-x-4" to={route.href}>
              {route.icon}
              <span className="text-sm font-medium">
                {route.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div>
        <Button>
            Create Project
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
