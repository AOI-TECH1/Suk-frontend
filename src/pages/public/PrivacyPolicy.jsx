import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, Database, ChevronRight, Fingerprint } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 font-sans">
      
      {/* --- 1. HERO IMAGE BANNER --- */}
      <div className="relative w-full h-48 md:h-64 bg-zinc-900 overflow-hidden flex items-center z-10">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
          alt="Privacy Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white font-sans">
            <nav className="flex items-center text-[10px] text-gray-300 font-black mb-3 uppercase tracking-[0.2em]">
                <Link to="/" className="hover:text-[#fbb03b] transition-colors">Home</Link>
                <ChevronRight size={10} className="mx-2 text-gray-500" />
                <span className="text-[#fbb03b]">Legal</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter  leading-none">
                Privacy <span className="text-[#fbb03b]">Policy</span>
            </h1>
        </div>
      </div>

      {/* --- 2. MAIN CONTENT CARD --- */}
      <div className="flex items-center justify-center px-4 -mt-16 relative z-30">
        <div className="max-w-5xl w-full bg-white p-8 md:p-16 rounded-[40px] shadow-2xl border border-gray-100">
          
          {/* Header Intro */}
          <div className="mb-16 text-center md:text-left">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#fbb03b]">
                    <ShieldCheck size={28} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Security Standard 2026</p>
            </div>
            <h2 className="text-3xl font-black uppercase  tracking-tight text-zinc-900 mb-6">Your Data is Yours.</h2>
            <p className="text-gray-500 font-medium leading-relaxed max-w-3xl text-sm md:text-base">
                At SuK Marketplace, we treat your information with the highest level of security. 
                This policy outlines how we handle your digital footprint to ensure a safe and transparent shopping experience.
            </p>
          </div>

          {/* Policy Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Section 1: Data Collection */}
            <div className="group p-8 bg-gray-50 rounded-[32px] border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black text-[#fbb03b] rounded-xl group-hover:bg-[#fbb03b] group-hover:text-black transition-colors">
                  <Database size={20} />
                </div>
                <h3 className="text-lg font-black uppercase  text-zinc-900 tracking-tight">Data Collection</h3>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-loose mb-6">
                We collect essential details to facilitate smooth transactions and logistics across Nigeria.
              </p>
              <div className="grid grid-cols-2 gap-3">
                 {['Email & Name', 'Delivery Address', 'Phone Number', 'Store Identity'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                        <div className="w-1 h-1 bg-[#fbb03b] rounded-full"></div> {item}
                    </div>
                 ))}
              </div>
            </div>

            {/* Section 2: Payments */}
            <div className="group p-8 bg-gray-50 rounded-[32px] border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black text-[#fbb03b] rounded-xl group-hover:bg-[#fbb03b] group-hover:text-black transition-colors">
                  <Lock size={20} />
                </div>
                <h3 className="text-lg font-black uppercase  text-zinc-900 tracking-tight">Payment Security</h3>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-loose">
                Financial security is our priority. All transactions are handled by **Paystack** using 
                AES-256 bank-level encryption. We **never** store your card details on SuK servers.
              </p>
            </div>

            {/* Section 3: Usage */}
            <div className="group p-8 bg-gray-50 rounded-[32px] border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black text-[#fbb03b] rounded-xl group-hover:bg-[#fbb03b] group-hover:text-black transition-colors">
                  <Eye size={20} />
                </div>
                <h3 className="text-lg font-black uppercase  text-zinc-900 tracking-tight">Data Usage</h3>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-loose">
                Information is only used to process orders, verify merchant authenticity, 
                and provide personalized deal recommendations based on your browsing history.
              </p>
            </div>

            {/* Section 4: Identity */}
            <div className="group p-8 bg-zinc-900 rounded-[32px] shadow-xl relative overflow-hidden">
                <Fingerprint size={80} className="absolute -right-4 -bottom-4 opacity-10 text-[#fbb03b] rotate-12" />
                <h3 className="text-lg font-black uppercase  text-[#fbb03b] mb-4">Identity Policy</h3>
                <p className="text-xs text-gray-400 font-medium leading-loose">
                    We perform KYC (Know Your Customer) checks on all SuK Merchants. 
                    This prevents fraudulent stores and ensures you only buy from verified Nigerian businesses.
                </p>
            </div>

          </div>

          {/* Footer Note */}
          <div className="mt-20 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest text-center md:text-left">
              Questions? Reach out to <span className="text-black">privacy@suk.com.ng</span>
            </p>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;