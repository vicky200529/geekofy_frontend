
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FAQSection from './components/FAQSection';
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
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header onAuthSuccess={handleAuthSuccess} />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FAQSection />
        
        {/* Decorative background elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-200 rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute top-[50%] -right-[10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[100px] opacity-30"></div>
          <div className="absolute top-[20%] left-[60%] w-[20%] h-[20%] bg-blue-300 rounded-full blur-[80px] opacity-20"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
