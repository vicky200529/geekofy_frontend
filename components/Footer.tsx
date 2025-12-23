
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
          
          {/* Brand & Nav */}
          <div className="flex flex-col md:flex-row items-center md:space-x-12 space-y-6 md:space-y-0">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 tracking-tight">
              Geekofy
            </span>
            
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">Join Us</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">About</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">Contact Us</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">Terms</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">Privacy</a>
            </nav>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            © {currentYear} Geekofy. All rights reserved.
          </div>
        </div>
        
        {/* Secondary Disclaimer */}
        <div className="mt-8 pt-8 border-t border-gray-50 text-center text-xs text-gray-400 max-w-2xl mx-auto">
          Geekofy connects users with local tech repair professionals. We verify all business accounts to ensure the highest quality of service discovery.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
