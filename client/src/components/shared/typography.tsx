import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

const Typography = ({children, className}: TypographyProps) => {
  return (
    <p className={cn("text-sm", className)}>{children}</p>
  )
}

export default Typography