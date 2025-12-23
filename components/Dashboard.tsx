
import React, { useState } from 'react';
import { 
  Home, MapPin, Image as ImageIcon, Sparkles, 
  Star, CreditCard, MessageSquare, LogOut,
  Bell, Settings, Search, User, Menu, X
} from 'lucide-react';
import HomeSection from './dashboard/HomeSection';
import LocationSection from './dashboard/LocationSection';
import GallerySection from './dashboard/GallerySection';
import HighlightSection from './dashboard/HighlightSection';
import ReviewsSection from './dashboard/ReviewsSection';
import InvoicesSection from './dashboard/InvoicesSection';
import ChatSection from './dashboard/ChatSection';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'location', label: 'Location', icon: <MapPin size={20} /> },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={20} /> },
    { id: 'highlight', label: 'Highlight', icon: <Sparkles size={20} /> },
    { id: 'reviews', label: 'Reviews', icon: <Star size={20} /> },
    { id: 'invoices', label: 'Invoices', icon: <CreditCard size={20} /> },
    { id: 'chat', label: 'Chat', icon: <MessageSquare size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeSection />;
      case 'location': return <LocationSection />;
      case 'gallery': return <GallerySection />;
      case 'highlight': return <HighlightSection />;
      case 'reviews': return <ReviewsSection />;
      case 'invoices': return <InvoicesSection />;
      case 'chat': return <ChatSection />;
      default: return <HomeSection />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} z-50`}>
        <div className="p-6 flex items-center justify-between">
          <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 ${!isSidebarOpen && 'hidden'}`}>
            Geekofy
          </span>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isSidebarOpen && <span className="ml-3 font-semibold text-sm">{item.label}</span>}
              {activeTab === item.id && isSidebarOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-50">
          <button 
            onClick={onLogout}
            className={`w-full flex items-center p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors`}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-3 font-semibold text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search insights..." className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm border-transparent focus:bg-white focus:border-blue-100 outline-none transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-gray-100 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">Geek Pro</p>
                <p className="text-xs text-green-500 font-medium">Business Account</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                <User size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Section Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
