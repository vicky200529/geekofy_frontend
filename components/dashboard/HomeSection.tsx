
import React from 'react';
import { TrendingUp, Users, ShoppingBag, ArrowUpRight } from 'lucide-react';

const HomeSection: React.FC = () => {
  const stats = [
    { label: 'Total Visits', value: '12.5k', trend: '+12%', icon: <Users className="text-blue-600" /> },
    { label: 'Services Booked', value: '458', trend: '+5%', icon: <ShoppingBag className="text-indigo-600" /> },
    { label: 'Total Revenue', value: '$8,240', trend: '+18%', icon: <TrendingUp className="text-emerald-600" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                <ArrowUpRight size={14} /> {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 h-64 flex items-center justify-center text-gray-400 italic">
          Traffic Analytics Chart (Placeholder)
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 h-64 flex items-center justify-center text-gray-400 italic">
          Recent Activity Feed (Placeholder)
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
