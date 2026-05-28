import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { onboardSeller, getUserData } from '../../api/authApi'; // Import the correct API functions
import toast from 'react-hot-toast';
import { ArrowRight, ArrowLeft, Store, Landmark, Loader2 } from 'lucide-react';

const SellerOnboarding = () => {
  const { user, setUser, loading: authLoading } = useAuth(); 
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    store_name: '',
    store_description: '',
    business_address: '',
    business_phone: '',
    support_logistics: true,
    bank_name: '',
    account_number: '',
    account_name: '',
  });

  // 1. GATEKEEPER: If user is not logged in, show the Login Prompt
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-[32px] shadow-2xl text-center border border-gray-100">
           <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              👋
           </div>
           <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase  tracking-tighter">Login Required</h2>
           <p className="text-gray-500 mb-8 font-medium">You need to be logged in to your SuK account to set up a professional store.</p>
           <div className="space-y-3">
              <Link to="/login" className="block w-full bg-black text-white font-black py-4 rounded-2xl hover:bg-zinc-800 transition-all uppercase tracking-widest text-[10px]">
                LOG IN TO CONTINUE
              </Link>
              <Link to="/register" className="block w-full text-[10px] font-black text-gray-400 hover:text-black transition-all uppercase tracking-widest">
                Don't have an account? Sign Up
              </Link>
           </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleOnboarding = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Create Seller Profile (Defaults to FREE plan in backend)
      await onboardSeller(formData);
      
      // 2. IMPORTANT: Fetch updated user data 
      // This refreshes the user.role from 'BUYER' to 'SELLER' in AuthContext
      const updatedUserRes = await getUserData();
      setUser(updatedUserRes.data);

      toast.success("Congratulations! Your store is live.");
      navigate('/seller/dashboard');
    } catch (error) {
        console.error(error);
        const errorMsg = error.response?.data ? Object.values(error.response.data)[0] : "Setup failed.";
        toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-20 pb-20 font-sans">
      
      {/* 2. DYNAMIC WELCOME BANNER */}
      <div className="relative w-full h-72 bg-zinc-950 overflow-hidden flex items-center z-10">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fbb03b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#fbb03b] flex items-center justify-center text-black font-black text-lg">
                    {user?.full_name?.charAt(0)}
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fbb03b]">Merchant Onboarding</p>
                    <p className="font-bold text-white text-sm">Auth ID: {user?.email}</p>
                </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-[900] uppercase  leading-none tracking-tighter">
              Setup Your <span className="text-[#fbb03b]">Store.</span>
            </h1>
        </div>
      </div>

      {/* 3. MULTI-STEP FORM */}
      <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-30">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden p-8 md:p-16 border border-gray-100">
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-4 mb-12">
            <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-[#fbb03b]' : 'bg-gray-100'}`}></div>
            <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#fbb03b]' : 'bg-gray-100'}`}></div>
          </div>

          <form onSubmit={handleOnboarding} className="space-y-10">
            
            {/* Step 1: Business Identity */}
            {step === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <Store className="text-[#fbb03b]" size={20}/>
                    <h3 className="font-black uppercase  text-sm tracking-widest">Business Identity</h3>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Official Store Name</label>
                      <input type="text" name="store_name" value={formData.store_name} required className="setup-input text-2xl" placeholder="e.g. SuK Global" onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Business Hotline</label>
                      <input type="text" name="business_phone" value={formData.business_phone} required className="setup-input" placeholder="+234..." onChange={handleChange} />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Store Description</label>
                    <textarea name="store_description" value={formData.store_description} placeholder="Describe your niche..." className="setup-input h-24 resize-none" onChange={handleChange}></textarea>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Business Physical Address</label>
                    <input type="text" name="business_address" value={formData.business_address} required className="setup-input" placeholder="Office or Warehouse location" onChange={handleChange} />
                </div>

                 <button type="button" onClick={() => setStep(2)} className="w-full bg-black text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#fbb03b] hover:text-black transition-all shadow-xl uppercase tracking-widest text-[10px]">
                    Proceed to Financials <ArrowRight size={18} />
                 </button>
              </div>
            )}

            {/* Step 2: Settlements & Bank Info */}
            {step === 2 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <Landmark className="text-[#fbb03b]" size={20}/>
                    <h3 className="font-black uppercase  text-sm tracking-widest">Payout Details</h3>
                 </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Select Bank</label>
                    <input type="text" name="bank_name" value={formData.bank_name} required className="setup-input" placeholder="GTBank / Access" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Account Number</label>
                    <input type="text" name="account_number" value={formData.account_number} required className="setup-input" placeholder="10 Digits" onChange={handleChange} />
                  </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Account Name</label>
                    <input type="text" name="account_name" value={formData.account_name} required className="setup-input" placeholder="Must match Business Name" onChange={handleChange} />
                </div>

                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                    <p className="text-[10px] font-bold text-orange-800 leading-relaxed uppercase">
                        Note: You will be onboarded to the <span className="font-black">FREE TIER</span> by default. 
                        You can upload up to 10 products. Upgrade any time for unlimited access.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 border-2 border-gray-100 text-gray-400 font-black py-5 rounded-2xl uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                    <ArrowLeft size={16} /> Edit Info
                  </button>
                  <button disabled={loading} type="submit" className="flex-[2] bg-[#fbb03b] text-black font-black py-5 rounded-2xl shadow-xl shadow-orange-100 uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                    {loading ? <Loader2 className="animate-spin" /> : "ACTIVATE MERCHANT ACCOUNT"}
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .setup-input {
          width: 100%;
          border-bottom: 2px solid #f3f4f6;
          padding: 0.8rem 0.2rem;
          background: transparent;
          font-weight: 800;
          outline: none;
          transition: all 0.3s ease;
        }
        .setup-input:focus {
          border-color: #fbb03b;
          padding-left: 0.5rem;
        }
      `}} />
    </div>
  );
};

export default SellerOnboarding;