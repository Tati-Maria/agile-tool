import { Link } from "react-router-dom"
import { cn } from "@/lib/utils";

const Logo = ({className}: {className?: string}) => {
  return (
    <Link className="flex-items-center space-x-1" to="/">
      <img src="/icons/logo.svg" alt="logo" className="w-14 h-14" />
      <span className={cn('font-semibold text-xl md:text-2xl', className)}>Worktec</span>
    </Link>
  );
}

export default Logo