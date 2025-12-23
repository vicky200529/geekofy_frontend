
import React, { useState } from 'react';
import { 
  Home, MapPin, Image as ImageIcon, Sparkles, 
  Star, CreditCard, MessageSquare, LogOut,
  Bell, Search, User, Menu, X, HeartHandshake, HelpCircle
} from 'lucide-react';
import HomeSection from './dashboard/HomeSection';
import LocationSection from './dashboard/LocationSection';
import GallerySection from './dashboard/GallerySection';
import HighlightSection from './dashboard/HighlightSection';
import ReviewsSection from './dashboard/ReviewsSection';
import InvoicesSection from './dashboard/InvoicesSection';
import ChatSection from './dashboard/ChatSection';
import FeedbackSection from './dashboard/FeedbackSection';
import FAQManager from './dashboard/FAQManager';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} />, color: 'text-blue-500' },
    { id: 'location', label: 'Location', icon: <MapPin size={20} />, color: 'text-rose-500' },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={20} />, color: 'text-emerald-500' },
    { id: 'highlight', label: 'Highlight', icon: <Sparkles size={20} />, color: 'text-amber-500' },
    { id: 'reviews', label: 'Reviews', icon: <Star size={20} />, color: 'text-yellow-500' },
    { id: 'feedback', label: 'Feedback', icon: <HeartHandshake size={20} />, color: 'text-pink-500' },
    { id: 'faq', label: 'FAQ Manager', icon: <HelpCircle size={20} />, color: 'text-indigo-500' },
    { id: 'invoices', label: 'Invoices', icon: <CreditCard size={20} />, color: 'text-blue-600' },
    { id: 'chat', label: 'Chat', icon: <MessageSquare size={20} />, color: 'text-sky-500' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeSection />;
      case 'location': return <LocationSection />;
      case 'gallery': return <GallerySection />;
      case 'highlight': return <HighlightSection />;
      case 'reviews': return <ReviewsSection />;
      case 'feedback': return <FeedbackSection />;
      case 'faq': return <FAQManager />;
      case 'invoices': return <InvoicesSection />;
      case 'chat': return <ChatSection />;
      default: return <HomeSection />;
    }
  };

  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-blue-100 flex flex-col transition-all duration-500 ${isSidebarOpen ? 'w-64' : 'w-20'} z-50 shadow-2xl shadow-blue-900/5`}>
        <div className="p-6 flex items-center justify-between">
          <span className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 ${!isSidebarOpen && 'hidden'}`}>
            Geekofy
          </span>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg transition-transform hover:scale-110">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' 
                : 'text-blue-900/40 hover:bg-blue-50 hover:text-blue-900'
              }`}
            >
              <span className={`flex-shrink-0 ${activeTab === item.id ? 'text-white' : item.color} transition-colors`}>{item.icon}</span>
              {isSidebarOpen && <span className="ml-3 font-bold text-sm">{item.label}</span>}
              {activeTab === item.id && isSidebarOpen && <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-blue-50">
          <button 
            onClick={onLogout}
            className={`w-full flex items-center p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all hover:scale-105 active:scale-95`}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-3 font-bold text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-blue-100 flex items-center justify-between px-10 z-10">
          <div className="flex items-center flex-1 max-w-xl group">
            <div className="relative w-full transition-all group-focus-within:scale-[1.02]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 transition-transform group-focus-within:scale-110" size={18} />
              <input type="text" placeholder="Search insights..." className="w-full pl-12 pr-6 py-3 bg-blue-50/50 rounded-xl text-sm border border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-blue-900 font-bold" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="p-3 text-blue-400 hover:bg-blue-50 rounded-full relative transition-all hover:scale-110 active:scale-90">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-10 w-px bg-blue-100 mx-2"></div>
            <div className="flex items-center gap-4 group cursor-pointer hover:scale-105 transition-transform">
              <div className="text-right">
                <p className="text-sm font-black text-blue-900">Geek Pro</p>
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-wider">Business Account</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-800 rounded-2xl flex items-center justify-center border-2 border-white shadow-xl rotate-3 group-hover:rotate-0 transition-all overflow-hidden">
                <User size={24} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Section Content */}
        <div className="flex-1 overflow-y-auto p-10 relative bg-blue-50/30">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
