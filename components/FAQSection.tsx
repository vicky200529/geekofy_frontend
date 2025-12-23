
import React, { useState, useEffect } from 'react';
import { HelpCircle, MessageSquare, Search, Send, Plus, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { backend, FAQ } from '../services/backend';

const FAQSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [search, setSearch] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    const data = await backend.getFaqs();
    setFaqs(data);
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setIsSubmitting(true);
    await backend.askQuestion(newQuestion, 'General');
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsAsking(false);
      setNewQuestion('');
      loadFaqs();
    }, 2000);
  };

  const filtered = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) || 
    (f.answer && f.answer.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section id="faq" className="py-24 bg-blue-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-blue-950 mb-4 tracking-tight">Community Help Desk</h2>
          <p className="text-blue-700/60 font-bold max-w-xl mx-auto">Get answers from experts or ask the community anything about your tech issues.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:scale-110 transition-transform" size={20} />
            <input 
              type="text" 
              placeholder="Search existing questions..." 
              className="w-full pl-14 pr-6 py-5 bg-white rounded-[2rem] border border-blue-100 shadow-xl shadow-blue-900/5 outline-none focus:border-blue-500 font-bold text-blue-900 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsAsking(true)}
            className="px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <Plus size={20} /> Ask a Question
          </button>
        </div>

        <div className="space-y-4">
          {filtered.map(faq => (
            <div key={faq.id} className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="flex items-start gap-5 relative z-10">
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <HelpCircle size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-blue-950 mb-3 group-hover:translate-x-1 transition-transform">{faq.question}</h3>
                  {faq.answer ? (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                      <p className="text-blue-900/70 font-medium leading-relaxed bg-blue-50/50 p-6 rounded-2xl border-l-4 border-blue-600">
                        {faq.answer}
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-black">OP</div>
                        <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Official Answer from Geekofy Team</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-amber-500">
                      <MessageSquare size={16} />
                      <span className="text-sm font-bold italic">Waiting for an expert response...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20 opacity-40">
              <Search size={64} className="mx-auto mb-4 text-blue-200" />
              <p className="text-xl font-black text-blue-900">No matching questions found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Asking Modal */}
      {isAsking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsAsking(false)} className="absolute top-8 right-8 p-3 text-blue-400 hover:bg-blue-50 rounded-full transition-all">
              <X size={24} />
            </button>
            <div className="p-10 pt-16 text-center">
              {submitted ? (
                <div className="py-10 animate-in zoom-in-50 duration-500">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} className="text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-black text-blue-950 mb-2">Question Posted!</h2>
                  <p className="text-blue-700/60 font-medium">Experts will review and answer your question soon.</p>
                </div>
              ) : (
                <form onSubmit={handleAsk} className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-black text-blue-950 tracking-tight mb-2">Ask the Pros</h2>
                    <p className="text-blue-700/60 font-medium">Describe your tech issue clearly.</p>
                  </div>
                  <textarea 
                    required
                    placeholder="e.g. How do I fix a water-damaged MacBook keyboard?"
                    className="w-full h-40 px-6 py-5 bg-blue-50/30 border-2 border-blue-50 rounded-3xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-blue-950"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                  <button 
                    disabled={isSubmitting || !newQuestion.trim()}
                    className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 transition-all"
                  >
                    {isSubmitting ? <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span> : <>Post Question <Send size={20} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FAQSection;
