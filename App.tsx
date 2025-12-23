
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Categories />
        {/* Decorative background elements for a "tech" feel */}
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
