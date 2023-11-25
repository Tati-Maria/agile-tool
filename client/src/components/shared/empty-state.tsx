import { cn } from '@/lib/utils';
import { Typography } from '.';

interface EmptyStateProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  desc?: string;
  actionButton?: React.ReactNode;
}

const EmptyState = ({ text, desc, className, actionButton, ...rest }: EmptyStateProps) => {
  return (
    <div {...rest} className={cn('flex-col-center items-center justify-center space-y-1 h-full', className)}>
      <Typography className="mb-2 text-base font-light text-center text-muted-foreground">
        {text}
      </Typography>
      {desc && (
        <Typography className="text-sm font-light text-center text-muted-foreground">
          {desc}
        </Typography>
      )}
      {actionButton && (
        <div className="mt-4">
          {actionButton}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
