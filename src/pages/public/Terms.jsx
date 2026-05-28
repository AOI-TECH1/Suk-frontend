import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronRight, ShieldCheck, Scale, AlertOctagon, HelpCircle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 font-sans">
      
      {/* --- 1. HERO IMAGE BANNER --- */}
      <div className="relative w-full h-48 md:h-64 bg-zinc-900 overflow-hidden flex items-center z-10">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" 
          alt="Legal Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white font-sans">
            {/* Breadcrumb */}
            <nav className="flex items-center text-[10px] text-gray-300 font-black mb-3 uppercase tracking-[0.2em]">
                <Link to="/" className="hover:text-[#fbb03b] transition-colors">Home</Link>
                <ChevronRight size={10} className="mx-2 text-gray-500" />
                <span className="text-[#fbb03b]">Legal</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter  leading-none">
                Terms <span className="text-[#fbb03b]">Of Use</span>
            </h1>
        </div>
      </div>

      {/* --- 2. MAIN CONTENT CARD --- */}
      <div className="flex items-center justify-center px-4 -mt-16 relative z-30">
        <div className="max-w-4xl w-full bg-white p-8 md:p-16 rounded-[40px] shadow-2xl border border-gray-100">
          
          {/* Header Intro */}
          <div className="mb-16 border-b border-gray-50 pb-10 text-center md:text-left">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#fbb03b]">
                    <Scale size={22} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Effective: May 2026</p>
            </div>
            <h2 className="text-3xl font-black uppercase  tracking-tight text-zinc-900 mb-6">User Agreement.</h2>
            <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">
                Welcome to SuK. By utilizing our marketplace, you enter into a legally binding contract 
                with SuK Marketplace NG. Please read these terms carefully to understand your rights and 
                obligations as a Buyer or a Merchant.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            
            {/* Section 01 */}
            <section className="relative pl-12 sm:pl-16">
                <span className="absolute left-0 top-0 text-5xl font-[900] text-gray-50  leading-none select-none">01</span>
                <h3 className="text-lg font-black uppercase  text-zinc-900 tracking-tight mb-4">Acceptance of Terms</h3>
                <p className="text-xs text-gray-500 font-medium leading-loose">
                    By accessing SuK, you agree to be bound by these Terms of Use. We reserve the 
                    right to modify these terms as the marketplace evolves. Continued use of the 
                    platform constitutes your acceptance of any changes.
                </p>
            </section>

            {/* Section 02 */}
            <section className="relative pl-12 sm:pl-16">
                <span className="absolute left-0 top-0 text-5xl font-[900] text-gray-50  leading-none select-none">02</span>
                <h3 className="text-lg font-black uppercase  text-zinc-900 tracking-tight mb-4">Merchant Integrity</h3>
                <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 space-y-4">
                    <p className="text-[11px] text-orange-900 font-bold uppercase tracking-widest">Sellers must adhere to:</p>
                    <ul className="space-y-3">
                        {[
                            "Verification of business identity (KYC)",
                            "Listing of authentic, non-counterfeit goods",
                            "Strict adherence to shipping timelines",
                            "Accurate visual representation of products"
                        ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-xs font-bold text-orange-800 ">
                                <div className="w-1.5 h-1.5 bg-[#fbb03b] rounded-full"></div> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Section 03 */}
            <section className="relative pl-12 sm:pl-16">
                <span className="absolute left-0 top-0 text-5xl font-[900] text-gray-50  leading-none select-none">03</span>
                <h3 className="text-lg font-black uppercase  text-zinc-900 tracking-tight mb-4">Payments & Escrow</h3>
                <p className="text-xs text-gray-500 font-medium leading-loose">
                    SuK utilizes **Paystack** for secure processing. To protect both parties, 
                    we hold funds in a secure escrow vault. Funds are only released to merchants 
                    once the buyer confirms quality receipt or after the 7-day return window expires.
                </p>
            </section>

            {/* Section 04 */}
            <section className="relative pl-12 sm:pl-16">
                <span className="absolute left-0 top-0 text-5xl font-[900] text-gray-50  leading-none select-none">04</span>
                <h3 className="text-lg font-black uppercase  text-zinc-900 tracking-tight mb-4 flex items-center gap-2">
                    Prohibited Conduct <AlertOctagon size={16} className="text-red-500" />
                </h3>
                <p className="text-xs text-gray-500 font-medium leading-loose">
                    Fraudulent listings, account sharing, or attempting to bypass the SuK payment 
                    gateway to conduct off-platform transactions will result in an immediate 
                    and permanent ban from the network.
                </p>
            </section>

          </div>

          {/* Footer Disclaimer */}
          <div className="mt-20 p-8 bg-zinc-900 rounded-[32px] text-white relative overflow-hidden">
             <FileText size={80} className="absolute -right-4 -bottom-4 opacity-5 rotate-12" />
             <div className="relative z-10">
                <h4 className="text-[#fbb03b] font-black uppercase  text-sm mb-4">Limitation of Liability</h4>
                <p className="text-xs text-gray-400 font-medium leading-relaxed ">
                    "SuK Marketplace is a facilitator. While we verify all merchants, we are not 
                    liable for the physical performance of products. Users are encouraged to 
                    review merchant ratings before purchase."
                </p>
             </div>
          </div>

          {/* Footer Note - Updated to general support email */}
<div className="mt-20 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest text-center md:text-left">
    Questions? Reach out to <span className="text-black">support@suk.com.ng</span>
  </p>
  <Link to="/contact" className="bg-black text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#fbb03b] hover:text-black transition-all shadow-xl active:scale-95">
      Visit Help Center
  </Link>
</div>

        </div>
      </div>
    </div>
  );
};

export default Terms;