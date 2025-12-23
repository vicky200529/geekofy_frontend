
import React, { useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Gamepad2, 
  Watch, 
  Laptop, 
  Smartphone, 
  Printer,
  Headphones,
  Camera,
  Tv
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const CATEGORIES: Category[] = [
  { id: '1', name: 'Gaming Consoles', icon: <Gamepad2 size={32} />, bgColor: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  { id: '2', name: 'Smartwatch', icon: <Watch size={32} />, bgColor: 'bg-blue-100', iconColor: 'text-blue-500' },
  { id: '3', name: 'Computers', icon: <Laptop size={32} />, bgColor: 'bg-cyan-100', iconColor: 'text-cyan-600' },
  { id: '4', name: 'Mobile & Tablet', icon: <Smartphone size={32} />, bgColor: 'bg-rose-100', iconColor: 'text-rose-500' },
  { id: '5', name: 'Printers', icon: <Printer size={32} />, bgColor: 'bg-amber-100', iconColor: 'text-amber-600' },
  { id: '6', name: 'Audio Gear', icon: <Headphones size={32} />, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
  { id: '7', name: 'Photography', icon: <Camera size={32} />, bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  { id: '8', name: 'Home Theatre', icon: <Tv size={32} />, bgColor: 'bg-sky-100', iconColor: 'text-sky-600' },
];

const Categories: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 bg-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-blue-950 tracking-tight">Popular Categories</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-blue-200 bg-white hover:bg-blue-50 text-blue-600 transition-all shadow-md hover:scale-110 active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-blue-200 bg-white hover:bg-blue-50 text-blue-600 transition-all shadow-md hover:scale-110 active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrolling Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-8 pb-8 scrollbar-hide scroll-smooth snap-x"
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="flex-shrink-0 w-48 md:w-56 group cursor-pointer snap-start py-4"
            >
              <div className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-200/50 border border-blue-50 group-hover:border-blue-200">
                <div className={`p-5 rounded-[1.5rem] mb-6 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 ${cat.bgColor} ${cat.iconColor}`}>
                  {cat.icon}
                </div>
                <h3 className="text-center font-bold text-blue-900 text-sm whitespace-nowrap">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
