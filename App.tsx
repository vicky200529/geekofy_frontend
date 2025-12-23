
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  // Simple handler to switch to dashboard after "login" or "onboarding"
  const handleAuthSuccess = () => setView('dashboard');

  if (view === 'dashboard') {
    return <Dashboard onLogout={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAuthSuccess={handleAuthSuccess} />
      <main className="flex-grow">
        <Hero />
        <Categories />
        {/* Decorative background elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-[60%] -right-[10%] w-[35%] h-[35%] bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
