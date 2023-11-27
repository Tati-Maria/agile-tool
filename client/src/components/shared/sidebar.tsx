import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  routes: {
    href: string;
    icon: string;
    label: string;
  }[];
}

const Sidebar = ({ routes, className, ...rest }: SidebarProps) => {
  const {pathname} = useLocation();

  return (
    <aside className={cn(className, "fixed top-0 py-16 px-8 left-0 h-screen")} {...rest}>
      <ul className="flex flex-col space-y-10">
        {routes.map((route, index) => (
          <li 
          className={cn(
            "text-sm font-medium cursor-pointer hover:text-blue-600",
            pathname === route.href && "text-blue-600"
          )}
          key={index}>
            <NavLink className="flex items-center space-x-4" to={route.href}>
              <img src={route.icon} alt={route.label} width={20} height={20} />
              <span className="text-sm sm:text-base">
                {route.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
