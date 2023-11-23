import { cn } from '@/lib/utils';
import { Typography } from '.';
import {AlertCircle} from "lucide-react"

interface EmptyStateProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  desc?: string;
}

const EmptyState = ({ text, desc, className, ...rest }: EmptyStateProps) => {
  return (
    <div {...rest} className={cn('flex-col-center justify-center space-y-1', className)}>
      <AlertCircle className="w-16 h-16 text-muted-foreground" />
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
