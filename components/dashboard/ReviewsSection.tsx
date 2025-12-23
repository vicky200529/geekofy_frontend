
import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

const ReviewsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-gray-900">John Doe</h4>
                <div className="flex text-yellow-400"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">Excellent service! They fixed my broken laptop screen in less than 24 hours. Highly recommended for any tech issues.</p>
              <button className="text-xs font-bold text-gray-400 hover:text-blue-600 flex items-center gap-1 transition-colors">
                <MessageSquare size={14} /> Reply to review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
