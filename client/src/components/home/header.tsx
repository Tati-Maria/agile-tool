import { Heading, Typography } from '@/components/shared';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <section className="w-full flex-center flex-col space-y-10 py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-4">
            <Heading level={1} className="text-3xl max-w-sm md:max-w-3xl mx-auto font-semibold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl">
              Manage Your Projects Efficiently
            </Heading>
            <Typography className="mx-auto font-light text-base md:text-xl max-w-[700px]">
              Streamline your workflow and boost productivity with our intuitive
              project management tool.
            </Typography>
          </div>
          <div className="space-x-4">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              to="/sign-up"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>
      <figure className='flex-col-center md:hidden items-center justify-center w-full'>
        <img 
        className='w-[80%] sm:w-[80%] lg:w-[40%]'
         src="/images/hero.svg" alt="hero" />
      </figure>
    </section>
  );
};

export default Header;
