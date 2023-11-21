import {FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon} from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full bg-slate-100 py-4">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-4">
        <div className="flex space-x-6">
          <a
            aria-label="Facebook"
            className="text-gray-300 hover:text-white"
            href="#"
          >
            <FacebookIcon className="h-6 w-6" />
          </a>
          <a
            aria-label="Twitter"
            className="text-gray-300 hover:text-white"
            href="#"
          >
            <TwitterIcon className="h-6 w-6" />
          </a>
          <a
            aria-label="Instagram"
            className="text-gray-300 hover:text-white"
            href="#"
          >
            <InstagramIcon className="h-6 w-6" />
          </a>
          <a
            aria-label="LinkedIn"
            className="text-gray-300 hover:text-white"
            href="#"
          >
            <LinkedinIcon className="h-6 w-6" />
          </a>
        </div>
        <div className="text-sm text-gray-300">© All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer