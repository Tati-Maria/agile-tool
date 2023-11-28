import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    side?:  'left' | 'right' | 'bottom' | 'top';
    action: JSX.Element;
    description?: string;
    title?: string;
}

export const SideModal: React.FC<Props> = ({ children, className, side= "right", action, ...rest }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {action}
            </SheetTrigger>
            <SheetContent className={cn(className, "overflow-y-auto")} side={side}>
                <SheetHeader>
                    <SheetTitle>{rest.title}</SheetTitle>
                    <SheetDescription>{rest.description}</SheetDescription>
                </SheetHeader>
                {children}
            </SheetContent>
        </Sheet>
    )
}