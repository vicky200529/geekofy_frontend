
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

const Onboarding: React.FC<OnboardingProps> = ({ isOpen, onClose }) => {
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

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleCategory = (catId: string) => {
    const current = [...formData.categories];
    const index = current.indexOf(catId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(catId);
    }
    setFormData({ ...formData, categories: current });
  };

  const checkIdAvailability = async (id: string) => {
    if (!id) {
      setIdStatus('idle');
      return;
    }
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
    setTimeout(() => {
      setIsFinalizing(false);
      onClose();
      alert('Business registered successfully!');
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              <p className="text-gray-500 text-sm mt-1">Tell us a bit about your business</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Geek Fixers" 
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Establishment Year</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="2023"
                  value={formData.establishmentYear}
                  onChange={(e) => setFormData({ ...formData, establishmentYear: e.target.value })}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Service Categories</h2>
              <p className="text-gray-500 text-sm mt-1">Select the services you specialize in</p>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 ${
                    formData.categories.includes(cat.id) 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                  }`}
                >
                  <div className={formData.categories.includes(cat.id) ? 'text-blue-600' : 'text-gray-400'}>
                    {cat.icon}
                  </div>
                  <span className="text-xs font-semibold text-center leading-tight">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Profile Image</h2>
              <p className="text-gray-500 text-sm mt-1">Upload a logo or photo for your business</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-40 h-40 rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center relative cursor-pointer overflow-hidden group hover:border-blue-400 transition-all"
              >
                {formData.profileImage ? (
                  <img src={formData.profileImage} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <div className="text-center p-4">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <span className="text-xs text-gray-400 font-medium">Click to upload</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*" 
              />
              <p className="mt-4 text-xs text-gray-400 text-center max-w-[200px]">
                Recommended: Square image, minimum 400x400px
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Unique Business ID</h2>
              <p className="text-gray-500 text-sm mt-1">This will be your business profile link</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 outline-none pr-12 transition-all ${
                    idStatus === 'available' ? 'border-green-500 ring-green-50' : 
                    idStatus === 'taken' ? 'border-red-500 ring-red-50' : 'border-gray-200 focus:ring-blue-500'
                  }`} 
                  placeholder="your-business-id"
                  value={formData.businessId}
                  onChange={(e) => {
                    const val = e.target.value.toLowerCase().replace(/\s+/g, '-');
                    setFormData({ ...formData, businessId: val });
                    checkIdAvailability(val);
                  }}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {idStatus === 'checking' && <Loader2 size={18} className="text-blue-500 animate-spin" />}
                  {idStatus === 'available' && <CheckCircle2 size={18} className="text-green-500" />}
                  {idStatus === 'taken' && <AlertCircle size={18} className="text-red-500" />}
                </div>
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-xs text-gray-500 italic">geekofy.com/{formData.businessId || 'your-id'}</span>
                <button 
                  onClick={handleGenerateId}
                  className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline"
                >
                  <RefreshCw size={12} /> Auto-generate
                </button>
              </div>
              {idStatus === 'taken' && (
                <p className="text-xs text-red-500 font-medium">This ID is already taken. Try something else or generate one.</p>
              )}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 text-center py-4">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <Loader2 size={40} className="text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Preparing for Pages</h2>
              <p className="text-gray-500 max-w-xs mx-auto">
                Hang tight! We're setting up your professional business dashboard and profile...
              </p>
            </div>
            
            <div className="space-y-3 px-8">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 animate-[progress_3s_ease-in-out_infinite]" style={{width: '60%'}}></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <span>Connecting Servers</span>
                <span>80% Done</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-50">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.4)]"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-10"
        >
          <X size={24} />
        </button>

        <div className="p-10 pt-16 md:p-14 md:pt-20">
          <div className="min-h-[350px]">
            {renderStep()}
          </div>

          {/* Navigation Controls */}
          <div className="mt-12 flex items-center justify-between">
            {step < 5 ? (
              <>
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                    step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:bg-gray-100 active:scale-95'
                  }`}
                >
                  <ChevronLeft size={20} /> Back
                </button>
                <button
                  onClick={step === 4 ? handleSubmit : nextStep}
                  disabled={
                    (step === 1 && (!formData.businessName || !formData.establishmentYear)) ||
                    (step === 2 && formData.categories.length === 0) ||
                    (step === 4 && (idStatus !== 'available' || !formData.businessId))
                  }
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {step === 4 ? 'Complete Registration' : 'Continue'} <ChevronRight size={20} />
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-2 group"
              >
                Let's Get Started <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Onboarding;
