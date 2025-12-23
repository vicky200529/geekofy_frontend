
import React, { useState, useEffect } from 'react';
// Fix: Added User to the imported icons from lucide-react
import { HelpCircle, CheckCircle2, MessageSquare, Send, Clock, Trash2, Search, Filter, User } from 'lucide-react';
import { backend, FAQ } from '../../services/backend';

const FAQManager: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filter, setFilter] = useState<'all' | 'unanswered'>('unanswered');
  const [replyId, setReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    const data = await backend.getFaqs();
    setFaqs(data);
  };

  const handleReply = async (id: string) => {
    if (!replyText.trim()) return;
    setIsSubmitting(true);
    await backend.answerQuestion(id, replyText);
    setIsSubmitting(false);
    setReplyId(null);
    setReplyText('');
    loadFaqs();
  };

  const filtered = faqs.filter(f => filter === 'all' ? true : !f.answer);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-blue-950 tracking-tight">FAQ Manager</h1>
          <p className="text-blue-700/60 font-medium">Respond to customer questions and build trust.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-blue-100 shadow-sm">
          <button 
            onClick={() => setFilter('unanswered')}
            className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${filter === 'unanswered' ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-400'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${filter === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'text-blue-400'}`}
          >
            All Questions
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filtered.map(faq => (
          <div key={faq.id} className="bg-white p-8 rounded-[2.5rem] border border-blue-50 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${faq.answer ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  {faq.answer ? <CheckCircle2 size={24} /> : <HelpCircle size={24} />}
                </div>
                <div>
                  <h3 className="text-lg font-black text-blue-950 leading-tight">{faq.question}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-xs font-black text-blue-400 uppercase tracking-widest"><User size={12} /> {faq.author}</span>
                    <span className="flex items-center gap-1.5 text-xs font-black text-blue-400 uppercase tracking-widest"><Clock size={12} /> {faq.date}</span>
                  </div>
                </div>
              </div>
              <button className="p-3 text-red-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                <Trash2 size={20} />
              </button>
            </div>

            {faq.answer ? (
              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 relative group/ans">
                <p className="text-blue-900/70 font-bold italic leading-relaxed">"{faq.answer}"</p>
                <button 
                  onClick={() => { setReplyId(faq.id); setReplyText(faq.answer || ''); }}
                  className="absolute bottom-4 right-4 text-xs font-black text-blue-600 hover:underline opacity-0 group-hover/ans:opacity-100 transition-opacity"
                >
                  Edit Answer
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {replyId === faq.id ? (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <textarea 
                      className="w-full h-32 px-5 py-4 bg-blue-50/50 border-2 border-blue-100 rounded-2xl outline-none focus:border-blue-600 transition-all font-bold text-blue-950"
                      placeholder="Type your expert answer here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="flex justify-end gap-3 mt-4">
                      <button onClick={() => setReplyId(null)} className="px-6 py-2 text-blue-400 font-bold hover:bg-blue-50 rounded-xl transition-all">Cancel</button>
                      <button 
                        disabled={isSubmitting || !replyText.trim()}
                        onClick={() => handleReply(faq.id)}
                        className="px-8 py-2 bg-blue-600 text-white rounded-xl font-black shadow-lg shadow-blue-200 hover:scale-105 active:scale-95 flex items-center gap-2 transition-all"
                      >
                        {isSubmitting ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <><Send size={16} /> Submit Answer</>}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setReplyId(faq.id)}
                    className="w-full py-4 bg-white border-2 border-dashed border-blue-100 rounded-2xl text-blue-500 font-black flex items-center justify-center gap-3 hover:bg-blue-50 transition-all"
                  >
                    <MessageSquare size={20} /> Write an Answer
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white/50 border-4 border-dashed border-blue-100 rounded-[3rem] p-24 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-2xl font-black text-blue-950 mb-2">Inbox is Empty</h3>
            <p className="text-blue-700/60 font-medium">All customer questions have been answered. Good job!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQManager;
