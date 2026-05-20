import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ShieldAlert, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 font-sans">
      
      {/* --- 1. HERO IMAGE BANNER --- */}
      <div className="relative w-full h-48 md:h-64 bg-zinc-900 overflow-hidden flex items-center z-10">
        <img 
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop" 
          alt="Customer Service Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white">
            {/* Breadcrumb */}
            <nav className="flex items-center text-[10px] text-gray-300 font-black mb-3 uppercase tracking-[0.2em]">
                <Link to="/" className="hover:text-[#fbb03b] transition-colors">Home</Link>
                <ChevronRight size={10} className="mx-2 text-gray-500" />
                <span className="text-[#fbb03b]">Refund Policy</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
                Returns <span className="text-[#fbb03b]">&</span> Refunds
            </h1>
        </div>
      </div>

      {/* --- 2. CONTENT CARD --- */}
      <div className="flex items-center justify-center px-4 -mt-16 relative z-30">
        <div className="max-w-5xl w-full bg-white p-8 md:p-16 rounded-[40px] shadow-2xl border border-gray-100">
          
          {/* Header Intro */}
          <div className="mb-12 border-b border-gray-50 pb-8 text-center md:text-left">
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-zinc-900 mb-4">Our Guarantee</h2>
            <p className="text-gray-500 font-medium leading-relaxed max-w-2xl text-sm">
                At SuK, we prioritize your satisfaction. If you are not entirely happy with your purchase, 
                we are here to help you get your money back or exchange your item quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* 7-Day Return Policy Card */}
            <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 transition-all hover:shadow-xl hover:bg-white group">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-[#fbb03b] mb-6 group-hover:bg-[#fbb03b] group-hover:text-black transition-colors duration-300">
                    <RotateCcw size={24} />
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tight mb-4 text-zinc-900">7-Day Return Policy</h3>
                <p className="text-xs text-gray-500 font-medium leading-loose">
                    You have exactly **7 days** after receiving your item to request a return. 
                    The item must be in its original condition, unworn or unused, with tags, 
                    and in its original packaging.
                </p>
            </div>

            {/* Non-Returnable Items Card */}
            <div className="p-8 bg-zinc-900 rounded-[32px] shadow-xl text-white relative overflow-hidden group">
                {/* Decorative Icon */}
                <ShieldAlert size={100} className="absolute -right-8 -bottom-8 opacity-5 group-hover:rotate-12 transition-transform duration-700" />
                
                <h3 className="text-xl font-black uppercase italic tracking-tight mb-6 text-[#fbb03b]">Non-Returnable Items</h3>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider opacity-80">
                        <CheckCircle2 size={16} className="text-[#fbb03b]" /> Underwear & Lingerie
                    </li>
                    <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider opacity-80">
                        <CheckCircle2 size={16} className="text-[#fbb03b]" /> Beauty Products (Seals broken)
                    </li>
                    <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider opacity-80">
                        <CheckCircle2 size={16} className="text-[#fbb03b]" /> Custom/Personalized Goods
                    </li>
                    <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider opacity-80">
                        <CheckCircle2 size={16} className="text-[#fbb03b]" /> Pre-owned Electronics
                    </li>
                </ul>
            </div>
          </div>

          {/* Refund Process Steps */}
          <div className="mt-16 p-8 bg-orange-50 rounded-[32px] border border-orange-100">
             <h3 className="text-lg font-black uppercase italic text-orange-900 mb-6 flex items-center gap-2">
                <HelpCircle size={20} /> The Refund Process
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <span className="text-3xl font-black text-orange-200">01</span>
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-900">Request Return</p>
                    <p className="text-[11px] text-orange-700/70 font-medium">Contact SuK support to initiate your return request.</p>
                </div>
                <div className="space-y-2">
                    <span className="text-3xl font-black text-orange-200">02</span>
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-900">Quality Check</p>
                    <p className="text-[11px] text-orange-700/70 font-medium">Our logistics partner will pick up and inspect the item.</p>
                </div>
                <div className="space-y-2">
                    <span className="text-3xl font-black text-orange-200">03</span>
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-900">Instant Refund</p>
                    <p className="text-[11px] text-orange-700/70 font-medium">Money is returned to your SuK wallet or original payment bank.</p>
                </div>
             </div>
          </div>

          {/* Final CTA */}
          <div className="mt-12 text-center">
             <p className="text-xs text-gray-400 font-medium mb-6">Need more help? Our support team is available 24/7.</p>
             <Link to="/contact" className="bg-black text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#fbb03b] hover:text-black transition-all shadow-xl active:scale-95">
                Contact SuK Support
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;