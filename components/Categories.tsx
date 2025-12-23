
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
  color: string;
}

const CATEGORIES: Category[] = [
  { id: '1', name: 'Gaming Consoles', icon: <Gamepad2 size={32} />, color: 'bg-indigo-100 text-indigo-600' },
  { id: '2', name: 'Smartwatch', icon: <Watch size={32} />, color: 'bg-pink-100 text-pink-600' },
  { id: '3', name: 'Computers', icon: <Laptop size={32} />, color: 'bg-blue-100 text-blue-600' },
  { id: '4', name: 'Mobile & Tablet', icon: <Smartphone size={32} />, color: 'bg-emerald-100 text-emerald-600' },
  { id: '5', name: 'Printers', icon: <Printer size={32} />, color: 'bg-orange-100 text-orange-600' },
  { id: '6', name: 'Audio Gear', icon: <Headphones size={32} />, color: 'bg-purple-100 text-purple-600' },
  { id: '7', name: 'Photography', icon: <Camera size={32} />, color: 'bg-cyan-100 text-cyan-600' },
  { id: '8', name: 'Home Theatre', icon: <Tv size={32} />, color: 'bg-rose-100 text-rose-600' },
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
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrolling Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth snap-x"
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="flex-shrink-0 w-44 md:w-52 group cursor-pointer snap-start"
            >
              <div className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center justify-center transition-all group-hover:bg-white group-hover:shadow-xl border border-transparent group-hover:border-gray-100">
                <div className={`p-4 rounded-2xl mb-4 transition-transform group-hover:scale-110 ${cat.color}`}>
                  {cat.icon}
                </div>
                <h3 className="text-center font-semibold text-gray-800 text-sm whitespace-nowrap">
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
