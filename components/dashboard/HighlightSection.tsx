
import React from 'react';
import { Sparkles, Edit3 } from 'lucide-react';

const HighlightSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Business Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-full -z-0 opacity-50 transition-all group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mb-4"><Sparkles size={20} /></div>
            <h3 className="font-bold mb-2">Same-day Delivery</h3>
            <p className="text-sm text-gray-500 mb-4">You currently offer same-day delivery for all mobile repairs within a 5-mile radius.</p>
            <button className="text-blue-600 text-xs font-black uppercase tracking-widest flex items-center gap-1"><Edit3 size={14} /> Edit Highlight</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightSection;
