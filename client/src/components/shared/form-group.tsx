import { cn } from '@/lib/utils';

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FormGroup = ({ children, className }: FormGroupProps) => {
  return (
    <div
      className={cn(
        className,
        'grid grid-cols-1 sm:grid-cols-2 w-full gap-4'
      )}
    >
      {children}
    </div>
  );
};

export default FormGroup;
