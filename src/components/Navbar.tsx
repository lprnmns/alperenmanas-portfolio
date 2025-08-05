'use client';
import Link from 'next/link';
import { GithubIcon } from 'lucide-react'; //lucide-react kullandığımızı varsayıyorum

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between p-4 border-b border-gray-700">
        <div className="w-1/3">
          <Link href="/" className="text-xl font-bold text-white">
            Alperen Manas
          </Link>
        </div>
        <div className="w-2/3 flex justify-start">
          <Link
            href="https://github.com/lprnmns"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 border border-gray-600 px-4 py-2 rounded-md hover:text-white hover:border-blue-500 transition-colors"
          >
            <GithubIcon size={20} />
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;