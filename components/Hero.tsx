
import React, { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';

const Hero: React.FC = () => {
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleFindLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation('San Francisco, CA');
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location", error);
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLocating(false);
    }
  };

  return (
    <section className="py-20 px-4 md:py-32 flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900 mb-6 tracking-tighter animate-in fade-in slide-in-from-top-4 duration-1000">
          Geekofy
        </h1>
        <p className="text-lg md:text-xl text-blue-800/80 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
         Trusted Tech repairs, Made Simple
        </p>

        {/* Unified Search Interface */}
        <div className="w-full max-w-3xl bg-white p-2 rounded-[2rem] shadow-2xl shadow-blue-200/50 border border-blue-100 flex flex-col md:flex-row items-stretch gap-2 transition-all hover:scale-[1.02] duration-300">
          
          {/* Location Input Group */}
          <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-blue-50 min-h-[56px] group">
            <MapPin className="text-blue-400 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
            <input
              type="text"
              placeholder="Your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full outline-none text-blue-900 placeholder-blue-300 font-bold"
            />
            <button 
              onClick={handleFindLocation}
              disabled={isLocating}
              className={`p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-all hover:scale-110 active:scale-90 ${isLocating ? 'animate-pulse' : ''}`}
              title="Find my location"
            >
              <Navigation size={18} />
            </button>
          </div>

          {/* Business Search Input Group */}
          <div className="flex-[1.5] flex items-center px-4 min-h-[56px] group">
            <Search className="text-blue-400 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
            <input
              type="text"
              placeholder="Search for service or business"
              className="w-full outline-none text-blue-900 placeholder-blue-300 font-bold"
            />
          </div>

          {/* CTA Button */}
          <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl hover:scale-105 active:scale-95">
            Search
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 opacity-70 transition-all">
          {['computer repair', 'outlook help', 'printer support', 'mobile repair', 'tv mount', 'cctv setup'].map((tag) => (
            <span key={tag} className="text-[10px] font-black text-blue-600/60 uppercase tracking-widest px-3 py-1 bg-blue-100/50 rounded-full hover:bg-blue-200/50 transition-colors cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
