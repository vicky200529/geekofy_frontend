
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
          // Mocking reverse geocoding for UI display
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
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Geekofy
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate marketplace to discover trusted repair services and tech businesses in your neighborhood.
        </p>

        {/* Unified Search Interface */}
        <div className="w-full max-w-3xl bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-stretch gap-2 transition-all hover:shadow-2xl">
          
          {/* Location Input Group */}
          <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-100 min-h-[56px]">
            <MapPin className="text-gray-400 mr-2 flex-shrink-0" size={20} />
            <input
              type="text"
              placeholder="Your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full outline-none text-gray-800 placeholder-gray-400 font-medium"
            />
            <button 
              onClick={handleFindLocation}
              disabled={isLocating}
              className={`p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors ${isLocating ? 'animate-pulse' : ''}`}
              title="Find my location"
            >
              <Navigation size={18} />
            </button>
          </div>

          {/* Business Search Input Group */}
          <div className="flex-[1.5] flex items-center px-4 min-h-[56px]">
            <Search className="text-gray-400 mr-2 flex-shrink-0" size={20} />
            <input
              type="text"
              placeholder="Search for service or business"
              className="w-full outline-none text-gray-800 placeholder-gray-400 font-medium"
            />
          </div>

          {/* CTA Button */}
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md md:w-auto w-full active:scale-95">
            Search
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Trusted by 5,000+ local shops</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
