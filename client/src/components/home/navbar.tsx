import { Logo } from '@/components/shared';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white py-2 px-4 md:px-6">
      <div className="flex-between max-w-7xl mx-auto text-sm">
        <div className="hidden md:flex-items-center space-x-4">
          <Link className='link-text' to="#features">Features</Link>
          <Link className='link-text' to="#pricing">Pricing & Plans</Link>
        </div>
        <Logo />
        <div>
          <Button
            className="border-muted hover:border-icon hover:text-icon"
            variant={'primary'}
            asChild
          >
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
