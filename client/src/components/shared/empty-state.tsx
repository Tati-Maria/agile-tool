import { cn } from '@/lib/utils';
import { Typography } from '.';

interface EmptyStateProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  desc?: string;
}

const EmptyState = ({ text, desc, className, ...rest }: EmptyStateProps) => {
  return (
    <div {...rest} className={cn('flex-col-center', className)}>
      <Typography className="mb-2 text-base font-light text-center text-muted-foreground">
        {text}
      </Typography>
      {desc && (
        <Typography className="text-sm font-light text-center text-muted-foreground">
          {desc}
        </Typography>
      )}
    </div>
  );
};

export default EmptyState;
