import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useUserLogout } from '@/hooks/user-logout';
import { Icons } from '@/components/ui/icons';

const Navbar = () => {
  const {user} = useAuth();
  const {logout, isLoading} = useUserLogout();

  return (
    <nav className="py-4 px-4 md:px-8">
      <div className="flex-between max-w-7xl mx-auto text-sm">
        <div className="font-medium flex-items-center space-x-4">
          <Link className="link-text" to="#features">
            Features
          </Link>
          <Link className="link-text" to="#pricing">
            Pricing & Plans
          </Link>
        </div>
        <div>
          {user ? (
            <Button 
            disabled={isLoading}
            onClick={logout}
            size={"sm"} variant={'destructive'}>
              Logout
              {isLoading && <Icons.spinner className="animate-spin ml-2" />}
            </Button>
          ) : (
            <Button
              className="border-muted hover:border-icon hover:text-icon"
              variant={'brand'}
              asChild
            >
              <Link to="/register">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
