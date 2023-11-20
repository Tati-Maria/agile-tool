import { Heading, Typography } from '@/components/shared';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="max-w-7xl mx-auto px-4 grid grid-cols- h-screen md:grid-cols-2">
      <div className='flex-col-center relative w-full space-y-10 justify-center items-center text-left pl-6'>
        <Heading className='text-5xl leading-snug md:text-7xl font-semibold w-full' level={1}>Manage Your Big Project.</Heading>
        <Typography className='mr-auto text-base max-w-md'>
          Worktec is a project management tool that helps you organize projects
          and tasks in minutes.
        </Typography>
        <Link className='block w-full' to="/sign-up">
          <span>Get Started</span>
            <ArrowRightIcon className='inline-block bg-iconSecondary rounded-full ml-2 hover:animate-pulse' size={24} />
        </Link>
      </div>
      <div className='hidden md:flex-col-center justify-center h-full'>
        <img className="h-96" src="/images/hero.svg" alt="team" />
      </div>
    </header>
  );
};

export default Header;
