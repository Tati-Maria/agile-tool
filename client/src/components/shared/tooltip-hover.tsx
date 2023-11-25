import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {Button} from '@/components/ui/button';


interface TooltipHoverProps {
  text: string;
  children: React.ReactNode;
  asChild?: boolean;
variant?: "primary" | "secondary" | "destructive" | "link" | "brand" | "primary" | "outline";
}

const TooltipHover = ({ text, children, asChild, variant }: TooltipHoverProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={variant} size={"icon"} asChild={asChild}>
                        {children}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{text}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
};

export default TooltipHover;