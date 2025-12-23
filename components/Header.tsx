
import React, { useState } from 'react';
import { Menu, X, PlusCircle, HelpCircle } from 'lucide-react';
import Auth from './Auth';
import Onboarding from './Onboarding';

interface HeaderProps {
  onAuthSuccess?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthSuccess }) => {
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

  const handleSuccess = () => {
    setIsAuthOpen(false);
    setIsOnboardingOpen(false);
    onAuthSuccess?.();
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-blue-50/80 backdrop-blur-md border-b border-blue-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center cursor-pointer hover:scale-105 transition-transform" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 tracking-tight">
                Geekofy
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <button onClick={() => scrollToSection('faq')} className="flex items-center text-blue-700 hover:text-blue-900 transition-all hover:scale-105 gap-2">
                <HelpCircle size={18} className="text-blue-500" /> FAQ
              </button>
              <button onClick={openOnboarding} className="flex items-center text-blue-700 hover:text-blue-900 transition-all hover:scale-105 gap-2">
                <PlusCircle size={18} className="text-blue-500" /> List Your Business
              </button>
              <button onClick={() => openAuth('login')} className="text-blue-700 hover:text-blue-900 transition-all hover:scale-105">
                Login
              </button>
              <button onClick={() => openAuth('signup')} className="px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
                Sign Up
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-700 hover:text-blue-900 focus:outline-none transition-transform hover:scale-110">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden bg-blue-50 border-b border-blue-100 py-4 px-4 space-y-4 shadow-xl animate-in slide-in-from-top-4">
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-blue-700 text-lg font-medium hover:pl-2 transition-all">FAQ</button>
            <button onClick={openOnboarding} className="block w-full text-left text-blue-700 text-lg font-medium hover:pl-2 transition-all">List Your Business</button>
            <button onClick={() => openAuth('login')} className="block w-full text-left text-blue-700 text-lg font-medium hover:pl-2 transition-all">Login</button>
            <button onClick={() => openAuth('signup')} className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg active:scale-95">Sign Up</button>
          </div>
        )}
      </header>

      <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialView={authInitialView} onSuccess={handleSuccess} />
      <Onboarding isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} onSuccess={handleSuccess} />
    </>
  );
};

export default Header;
