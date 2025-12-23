
import React from 'react';
import { Upload, Plus } from 'lucide-react';

const GallerySection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Photo Gallery</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-all">
          <Plus size={18} /> Upload New
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className="aspect-square bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
            <Upload size={24} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
