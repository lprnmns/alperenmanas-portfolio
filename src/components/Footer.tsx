import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 p-4 mt-8">
      <div className="container mx-auto text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Alperen Manas. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://github.com/lprnmns" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/alperen-manas-a92aa2378" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;