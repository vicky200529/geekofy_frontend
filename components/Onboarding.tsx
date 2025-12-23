
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, ChevronRight, ChevronLeft, Upload, Camera, 
  CheckCircle2, AlertCircle, RefreshCw, Loader2,
  Smartphone, Laptop, Printer, Wifi, Gamepad2, 
  Home, Tv, ShieldCheck, Plane
} from 'lucide-react';
import { backend, OnboardingData } from '../services/backend';

interface OnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CATEGORY_OPTIONS = [
  { id: 'mobile', name: 'Mobile & Tablet', icon: <Smartphone size={20} /> },
  { id: 'computer', name: 'Computer', icon: <Laptop size={20} /> },
  { id: 'printer', name: 'Printer', icon: <Printer size={20} /> },
  { id: 'wifi', name: 'Wifi & Networking', icon: <Wifi size={20} /> },
  { id: 'gaming', name: 'Gaming Console', icon: <Gamepad2 size={20} /> },
  { id: 'theatre', name: 'Home Theatre', icon: <Home size={20} /> },
  { id: 'smart', name: 'Smart Home', icon: <ShieldCheck size={20} /> },
  { id: 'tv', name: 'TV Mount', icon: <Tv size={20} /> },
  { id: 'cctv', name: 'CCTV', icon: <Camera size={20} /> },
  { id: 'drone', name: 'Drone', icon: <Plane size={20} /> },
];

const Onboarding: React.FC<OnboardingProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    businessName: '',
    establishmentYear: '',
    categories: [],
    profileImage: null,
    businessId: '',
  });

  const [idStatus, setIdStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [isFinalizing, setIsFinalizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 4 && formData.businessName && !formData.businessId) {
      handleGenerateId();
    }
  }, [step]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, profileImage: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const toggleCategory = (catId: string) => {
    const current = [...formData.categories];
    const index = current.indexOf(catId);
    if (index > -1) current.splice(index, 1); else current.push(catId);
    setFormData({ ...formData, categories: current });
  };

  const checkIdAvailability = async (id: string) => {
    if (!id) { setIdStatus('idle'); return; }
    setIdStatus('checking');
    const available = await backend.isBusinessIdAvailable(id);
    setIdStatus(available ? 'available' : 'taken');
  };

  const handleGenerateId = async () => {
    const newId = await backend.generateUniqueId(formData.businessName);
    setFormData({ ...formData, businessId: newId });
    setIdStatus('available');
  };

  const handleSubmit = async () => {
    setIsFinalizing(true);
    await backend.submitOnboarding(formData);
    setIsFinalizing(false);
    onSuccess?.();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">Basic Information</h2>
            <div className="space-y-4 text-left">
              <input type="text" className="w-full px-4 py-3 border rounded-xl" placeholder="Business Name" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} />
              <input type="number" className="w-full px-4 py-3 border rounded-xl" placeholder="Year" value={formData.establishmentYear} onChange={(e) => setFormData({ ...formData, establishmentYear: e.target.value })} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Service Categories</h2>
            <div className="grid grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
              {CATEGORY_OPTIONS.map((cat) => (
                <button key={cat.id} onClick={() => toggleCategory(cat.id)} className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${formData.categories.includes(cat.id) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 bg-gray-50'}`}>
                  {cat.icon} <span className="text-xs font-semibold mt-2">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">Profile Image</h2>
            <div onClick={() => fileInputRef.current?.click()} className="w-40 h-40 mx-auto rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center relative cursor-pointer group">
              {formData.profileImage ? <img src={formData.profileImage} className="w-full h-full object-cover" /> : <div className="text-gray-400"><Upload size={32} /></div>}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">Unique Business ID</h2>
            <div className="relative">
              <input type="text" className={`w-full px-4 py-3 border rounded-xl ${idStatus === 'available' ? 'border-green-500' : idStatus === 'taken' ? 'border-red-500' : 'border-gray-200'}`} placeholder="your-id" value={formData.businessId} onChange={(e) => { const v = e.target.value.toLowerCase().replace(/\s+/g, '-'); setFormData({ ...formData, businessId: v }); checkIdAvailability(v); }} />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">{idStatus === 'checking' && <Loader2 size={18} className="animate-spin" />}{idStatus === 'available' && <CheckCircle2 size={18} className="text-green-500" />}</div>
            </div>
            <button onClick={handleGenerateId} className="text-xs font-bold text-blue-600">Auto-generate</button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 text-center py-4">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 relative animate-pulse">
              <Loader2 size={40} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold">Preparing for Pages</h2>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 animate-[progress_3s_infinite]" style={{width: '80%'}}></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-50"><div className="h-full bg-blue-600 transition-all" style={{ width: `${(step / 5) * 100}%` }}></div></div>
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-gray-400 hover:bg-gray-100 rounded-full"><X size={24} /></button>
        <div className="p-10 pt-16 md:p-14 min-h-[450px] flex flex-col justify-between">
          {renderStep()}
          <div className="mt-12 flex items-center justify-between">
            {step < 5 ? (
              <>
                <button onClick={() => setStep(step - 1)} disabled={step === 1} className={`px-6 py-3 font-bold ${step === 1 ? 'opacity-0' : 'text-gray-500'}`}>Back</button>
                <button onClick={step === 4 ? handleSubmit : () => setStep(step + 1)} disabled={step === 1 && !formData.businessName} className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg">
                  {step === 4 ? 'Complete' : 'Continue'} <ChevronRight className="inline" size={20} />
                </button>
              </>
            ) : (
              <button onClick={onSuccess} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl">Let's Get Started</button>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }`}</style>
    </div>
  );
};

export default Onboarding;
