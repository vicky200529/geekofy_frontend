
import React, { useState } from 'react';
import { Menu, X, PlusCircle } from 'lucide-react';
import Auth from './Auth';
import Onboarding from './Onboarding';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState<'login' | 'signup'>('login');

  const openAuth = (view: 'login' | 'signup') => {
    setAuthInitialView(view);
    setIsAuthOpen(true);
    setIsMenuOpen(false);
  };

  const openOnboarding = () => {
    setIsOnboardingOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 tracking-tight">
                Geekofy
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <button 
                onClick={openOnboarding}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors gap-2"
              >
                <PlusCircle size={18} />
                List Your Business
              </button>
              <button 
                onClick={() => openAuth('login')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => openAuth('signup')}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4 space-y-4 shadow-xl">
            <button 
              onClick={openOnboarding}
              className="block w-full text-left text-gray-600 text-lg font-medium"
            >
              List Your Business
            </button>
            <button 
              onClick={() => openAuth('login')}
              className="block w-full text-left text-gray-600 text-lg font-medium"
            >
              Login
            </button>
            <button 
              onClick={() => openAuth('signup')}
              className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg active:scale-[0.98]"
            >
              Sign Up
            </button>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <Auth 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialView={authInitialView} 
      />

      <Onboarding 
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </>
  );
};

export default Header;
