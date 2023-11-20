import { cn } from "@/lib/utils"

interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
}

const Heading = ({level, children, className}: HeadingProps) => {
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  return <HeadingTag className={cn("font-semibold", className)}>{children}</HeadingTag>;
}

export default Heading