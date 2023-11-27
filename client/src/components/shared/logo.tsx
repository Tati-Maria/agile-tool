import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link className="flex-items-center space-x-1" to="/">
      <img src="/icons/logo.svg" alt="logo" className="w-10 h-10" />
      <span
        className={cn(
          'font-bold text-xl md:text-2xl uppercase',
          className
        )}
      >
        WorkTec
      </span>
    </Link>
  );
};

export default Logo;
