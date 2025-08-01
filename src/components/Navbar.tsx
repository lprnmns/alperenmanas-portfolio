import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Alperen Manas</div>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-blue-500 transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/projects" className="text-gray-300 hover:text-blue-500 transition-colors">
            Projeler
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-blue-500 transition-colors">
            Hakkımda
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;