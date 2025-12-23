
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const LocationSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Business Location</h2>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-50 opacity-50 flex items-center justify-center">
             <MapPin className="text-blue-600 animate-bounce" size={48} />
          </div>
          <p className="text-gray-500 font-medium relative">Interactive Map Preview</p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-gray-800">Silicon Valley Main Office</p>
            <p className="text-sm text-gray-500">123 Tech Lane, San Francisco, CA 94107</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            <Navigation size={18} /> Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
