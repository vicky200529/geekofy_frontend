
import React, { useState } from 'react';
import { 
  CreditCard, Landmark, Smartphone, Bitcoin, 
  CheckCircle2, Download, ExternalLink, ArrowRight,
  ShieldCheck
} from 'lucide-react';

const InvoicesSection: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showGateway, setShowGateway] = useState(false);

  const paymentMethods = [
    { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard />, desc: 'Visa, Mastercard, Amex' },
    { id: 'bank', name: 'Bank Transfer', icon: <Landmark />, desc: 'Direct wire or ACH' },
    { id: 'upi', name: 'UPI (GPay / Samsung Pay)', icon: <Smartphone />, desc: 'Instant mobile payment' },
    { id: 'crypto', name: 'Cryptocurrencies', icon: <Bitcoin />, desc: 'BTC, ETH, USDC' },
  ];

  const recentInvoices = [
    { id: 'INV-001', date: 'Oct 12, 2023', amount: '$450.00', status: 'Paid' },
    { id: 'INV-002', date: 'Oct 15, 2023', amount: '$1,200.00', status: 'Pending' },
    { id: 'INV-003', date: 'Oct 18, 2023', amount: '$85.00', status: 'Paid' },
  ];

  if (showGateway) {
    return (
      <div className="max-w-xl mx-auto space-y-8 animate-in zoom-in-95">
        <button onClick={() => setShowGateway(false)} className="text-blue-600 font-bold flex items-center gap-2">
          ← Back to List
        </button>
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-50">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Secure Checkout</h2>
            <ShieldCheck className="text-green-500" size={32} />
          </div>
          
          <div className="bg-gray-50 p-6 rounded-2xl mb-8 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Amount to Pay</p>
              <p className="text-3xl font-black text-gray-900">$1,200.00</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-bold">INV-002</p>
              <p className="text-sm font-medium">Business Pro Plan</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map(m => (
                <button 
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id)}
                  className={`p-4 rounded-2xl border-2 flex flex-col gap-2 transition-all ${selectedMethod === m.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-100'}`}
                >
                  <div className={selectedMethod === m.id ? 'text-blue-600' : 'text-gray-400'}>{m.icon}</div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{m.name}</p>
                    <p className="text-[10px] text-gray-400">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {selectedMethod === 'crypto' && (
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                <p className="text-xs font-medium text-orange-700">We accept BTC, ETH, and Stablecoins via Coinbase Commerce.</p>
              </div>
            )}

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-xl transition-all active:scale-95">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">Invoices & Payments</h2>
          <p className="text-gray-500">Manage your business billing and payment methods.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-all">
          New Payment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Invoice ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-700">{inv.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{inv.date}</td>
                  <td className="px-6 py-4 text-sm font-black">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {inv.status === 'Pending' ? (
                      <button onClick={() => setShowGateway(true)} className="text-blue-600 hover:underline text-sm font-bold flex items-center justify-end gap-1">
                        Pay <ArrowRight size={14} />
                      </button>
                    ) : (
                      <button className="text-gray-400 hover:text-blue-600 p-2"><Download size={18} /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold mb-4">Saved Methods</h3>
            <div className="space-y-3">
              <div className="p-4 border border-blue-100 bg-blue-50 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center"><CreditCard className="text-blue-600" size={20} /></div>
                <div>
                  <p className="text-sm font-bold">•••• 4242</p>
                  <p className="text-[10px] text-blue-400 uppercase font-black">Default Primary</p>
                </div>
              </div>
              <button className="w-full py-3 border border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-medium hover:bg-gray-50 transition-colors">+ Add Method</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesSection;
