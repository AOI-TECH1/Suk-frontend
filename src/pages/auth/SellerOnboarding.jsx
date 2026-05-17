import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const SellerOnboarding = () => {
  const { user, loading: authLoading } = useAuth(); // Get logged-in user from context
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Initial state for the Store details only (since User account already exists)
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
           <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">👋</span>
           </div>
           <h2 className="text-2xl font-black text-gray-900 mb-2">Login Required</h2>
           <p className="text-gray-500 mb-8 font-medium">You need to be logged in to your SuK account to set up a professional store.</p>
           <div className="space-y-3">
              <Link to="/login" className="block w-full bg-black text-white font-black py-4 rounded-2xl hover:bg-zinc-800 transition-all">
                LOG IN TO CONTINUE
              </Link>
              <Link to="/register" className="block w-full text-sm font-bold text-gray-400 hover:text-black transition-all">
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
      // API call to create the SellerProfile for the CURRENT user
      await api.post('/accounts/seller-setup/', formData);
      toast.success("Congratulations! Your store is live.");
      navigate('/seller/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || "Setup failed. Check your bank or store details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20">
      
      {/* 2. USER WELCOME BANNER (Shows name if logged in) */}
      <div className="relative w-full h-64 bg-zinc-900 overflow-hidden flex items-center z-10">
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#fbb03b] flex items-center justify-center text-black font-black">
                    {user?.full_name?.charAt(0)}
                </div>
                <p className="font-bold text-[#fbb03b]">Welcome back, {user?.full_name}</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic leading-none">
              Setup Your <span className="text-[#fbb03b]">Store.</span>
            </h1>
            <p className="text-gray-400 mt-4 max-w-md font-medium">You are one step away from becoming a verified SuK Merchant.</p>
        </div>
      </div>

      {/* 3. STORE SETUP FORM */}
      <div className="flex items-center justify-center px-4 -mt-16 relative z-30">
        <div className="max-w-4xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden p-8 md:p-12 border border-gray-100">
          
          <form onSubmit={handleOnboarding} className="space-y-10">
            
            {/* Step 1: Store Branding */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Business Name</label>
                      <input type="text" name="store_name" placeholder="e.g. SuK Electronics Hub" required className="setup-input text-xl text-orange-600" onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Store Phone</label>
                      <input type="text" name="business_phone" placeholder="+234..." required className="setup-input" onChange={handleChange} />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">About the Store</label>
                    <textarea name="store_description" placeholder="Briefly describe what you sell..." className="setup-input h-20 resize-none" onChange={handleChange}></textarea>
                 </div>
                 <button type="button" onClick={() => setStep(2)} className="w-full bg-black text-[#fbb03b] font-black py-4 rounded-2xl shadow-xl">CONTINUE TO FINANCIALS →</button>
              </div>
            )}

            {/* Step 2: Payment & Finalize */}
            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Bank Name</label>
                    <input type="text" name="bank_name" placeholder="Access Bank" required className="setup-input" onChange={handleChange} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Account Number</label>
                    <input type="text" name="account_number" placeholder="001234..." required className="setup-input" onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Account Holder Name</label>
                    <input type="text" name="account_name" placeholder="Business Name" required className="setup-input" onChange={handleChange} />
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-400 font-bold py-4 rounded-2xl">GO BACK</button>
                  <button disabled={loading} type="submit" className="flex-[2] bg-[#fbb03b] text-black font-black py-4 rounded-2xl shadow-xl shadow-orange-100">
                    {loading ? "PROCESSING..." : "ACTIVATE MY STORE"}
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
          font-weight: 600;
          outline: none;
        }
        .setup-input:focus {
          border-color: #fbb03b;
        }
      `}} />
    </div>
  );
};

export default SellerOnboarding;