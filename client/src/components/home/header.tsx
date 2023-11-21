import { Heading, Typography } from '@/components/shared';

const Header = () => {
  return (
    <div className="h-full px-8">
      <div className="flex-col-center space-y-6 h-full justify-center items-center text-center md:items-end md:text-right">
        <Heading
          level={1}
          className="text-3xl mx-auto font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl"
        >
          Manage Your{' '}
          <span className="bg-gradient-to-r from-primary to-icon bg-clip-text text-transparent">
            Projects Efficiently
          </span>
        </Heading>
        <Typography className="mx-auto font-light text-base md:text-xl max-w-[700px]">
          Streamline your workflow and boost productivity with our intuitive
          project management tool.
        </Typography>
      </div>
    </div>
  );
};

export default Header;

