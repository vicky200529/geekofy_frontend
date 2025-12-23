
import React, { useState } from 'react';
import { Star, MessageSquare, Smartphone, Laptop, Printer, Wifi, Gamepad2, Home, Tv, ShieldCheck, Plane, CheckCircle2, ChevronDown, Plus, X } from 'lucide-react';

const SERVICES = [
  { id: 'mobile', name: 'Mobile & Tablet', icon: <Smartphone size={18} />, color: 'bg-rose-100 text-rose-600' },
  { id: 'computer', name: 'Computer', icon: <Laptop size={18} />, color: 'bg-cyan-100 text-cyan-600' },
  { id: 'printer', name: 'Printer', icon: <Printer size={18} />, color: 'bg-amber-100 text-amber-600' },
  { id: 'wifi', name: 'Wifi & Networking', icon: <Wifi size={18} />, color: 'bg-blue-100 text-blue-600' },
  { id: 'gaming', name: 'Gaming Console', icon: <Gamepad2 size={18} />, color: 'bg-indigo-100 text-indigo-600' },
  { id: 'smart', name: 'Smart Home', icon: <ShieldCheck size={18} />, color: 'bg-emerald-100 text-emerald-600' },
];

const INITIAL_FEEDBACK = [
  { id: 1, serviceId: 'mobile', user: 'Alice Cooper', rating: 5, text: 'Fantastic repair on my iPad screen. Like new!', date: '2 days ago' },
  { id: 2, serviceId: 'computer', user: 'Bob Smith', rating: 4, text: 'Cleaned my laptop fans, runs much cooler now.', date: '1 week ago' },
  { id: 3, serviceId: 'mobile', user: 'Charlie Brown', rating: 5, text: 'Very quick battery replacement.', date: '3 days ago' },
];

const FeedbackSection: React.FC = () => {
  const [activeService, setActiveService] = useState('mobile');
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filteredFeedback = INITIAL_FEEDBACK.filter(f => f.serviceId === activeService);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || !newComment.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
        setNewRating(0);
        setNewComment('');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-blue-950 tracking-tight">Service Feedback</h1>
          <p className="text-blue-700/60 font-medium">Customer insights categorized by your core services.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Plus size={20} /> Add Feedback
        </button>
      </div>

      {/* Service Selector Chips */}
      <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide">
        {SERVICES.map(service => (
          <button
            key={service.id}
            onClick={() => setActiveService(service.id)}
            className={`flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-2xl font-bold transition-all border-2 ${
              activeService === service.id 
              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100 scale-105' 
              : 'bg-white border-blue-50 text-blue-900/60 hover:border-blue-200'
            }`}
          >
            <div className={activeService === service.id ? 'text-white' : 'text-blue-500'}>
              {service.icon}
            </div>
            {service.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Feedback List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-blue-50 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center font-black text-blue-600">
                      {item.user[0]}
                    </div>
                    <div>
                      <h4 className="font-black text-blue-950">{item.user}</h4>
                      <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        size={16} 
                        className={star <= item.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-blue-900/80 leading-relaxed font-medium">"{item.text}"</p>
                <div className="mt-4 pt-4 border-t border-blue-50 flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${SERVICES.find(s => s.id === item.serviceId)?.color}`}>
                    {SERVICES.find(s => s.id === item.serviceId)?.name}
                  </span>
                  <button className="text-xs font-bold text-blue-500 hover:underline">Reply to Feedback</button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/50 border-2 border-dashed border-blue-100 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center opacity-60">
              <div className="p-5 bg-blue-100 rounded-full text-blue-500 mb-4">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-xl font-black text-blue-900 mb-2">No Feedback Yet</h3>
              <p className="text-blue-700/60 max-w-xs font-medium">Be the first to provide feedback for the {SERVICES.find(s => s.id === activeService)?.name} service!</p>
            </div>
          )}
        </div>

        {/* Right Column: Summary Card */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-xl shadow-blue-900/5 sticky top-8">
            <h3 className="text-xl font-black text-blue-950 mb-6 flex items-center gap-2">
              <Star className="text-yellow-400 fill-current" /> 
              Service Rating
            </h3>
            
            <div className="flex items-end gap-2 mb-8">
              <span className="text-6xl font-black text-blue-950 tracking-tighter">4.8</span>
              <div className="pb-2">
                <p className="text-xs font-black text-blue-400 uppercase tracking-widest">Out of 5</p>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="text-yellow-400 fill-current" />)}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map(r => (
                <div key={r} className="flex items-center gap-3">
                  <span className="text-xs font-black text-blue-900 w-3">{r}</span>
                  <div className="flex-1 h-2 bg-blue-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: r === 5 ? '85%' : r === 4 ? '12%' : '1%' }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-black text-blue-400 w-8">{r === 5 ? '85%' : r === 4 ? '12%' : '1%'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-8 right-8 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-all"
            >
              {/* Fix: Added missing 'X' icon from lucide-react */}
              <X size={24} />
            </button>

            <div className="p-10 pt-16">
              {submitted ? (
                <div className="text-center py-10 animate-in zoom-in-50 duration-500">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-black text-blue-950 mb-2">Feedback Shared!</h2>
                  <p className="text-blue-700/60 font-medium">Thank you for helping us improve our services.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-black text-blue-950 tracking-tight">Give Feedback</h2>
                    <p className="text-blue-700/60 font-medium mt-1">Share your experience with our services</p>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-black text-blue-400 uppercase tracking-widest">Select Service</label>
                    <div className="grid grid-cols-2 gap-2">
                      {SERVICES.map(s => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setActiveService(s.id)}
                          className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all font-bold text-sm ${
                            activeService === s.id 
                            ? 'border-blue-600 bg-blue-50 text-blue-700' 
                            : 'border-blue-50 text-blue-900/50 hover:border-blue-100'
                          }`}
                        >
                          {s.icon} {s.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 text-center">
                    <label className="block text-xs font-black text-blue-400 uppercase tracking-widest">Rate your experience</label>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setNewRating(star)}
                          className="transition-all hover:scale-125 transform active:scale-90"
                        >
                          <Star 
                            size={40} 
                            className={`transition-all ${
                              star <= (hoverRating || newRating) 
                              ? 'text-yellow-400 fill-current drop-shadow-lg' 
                              : 'text-gray-100'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black text-blue-400 uppercase tracking-widest">Your Comments</label>
                    <textarea 
                      required
                      placeholder="What did you think of the service?"
                      className="w-full h-32 px-5 py-4 border-2 border-blue-50 bg-blue-50/20 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-blue-950"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                  </div>

                  <button 
                    disabled={isSubmitting || newRating === 0}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : 'Submit Feedback'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackSection;
