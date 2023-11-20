import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link className="flex-items-center space-x-1" to="/">
      <img src="/icons/logo.svg" alt="logo" className="w-14 h-14" />
      <span className="font-semibold text-xl md:text-2xl">Worktec</span>
    </Link>
  );
}

export default Logo