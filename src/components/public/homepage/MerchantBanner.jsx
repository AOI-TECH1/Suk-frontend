import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // Assuming your context path

const MerchantBanner = () => {
   const { user } = useAuth();

   // Requirement: If not registered, go to register. If registered, go to onboarding.
   const destination = user ? "/seller/onboarding" : "/register?next=onboarding";

   return (
      <section className="max-w-7xl mx-auto px-6 pb-24 font-sans">
         <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-[60px] p-10 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_40px_80px_rgba(0,0,0,0.4)] border border-white/5">
            
            {/* Ambient Background Elements */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#fbb03b]/10 rounded-full blur-[120px]"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-orange-600/5 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 flex-1 text-center md:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
                    <Zap size={14} className="text-[#fbb03b]" fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">SuK Merchant Network</span>
                </div>

                <h2 className="text-5xl md:text-8xl font-[900] text-white  uppercase leading-[0.85] tracking-tighter mb-8">
                    Own The <br /> 
                    <span className="text-[#fbb03b]">Market</span> <br /> 
                    Not Just <br />
                    The Bag.
                </h2>

                <p className="text-gray-400 font-bold max-w-md mb-12 text-lg leading-relaxed">
                    Why stop at shopping? List your products on Nigeria's most futuristic marketplace. 
                    Get started with our <span className="text-white">Free Plan</span> and reach 
                    thousands of verified buyers instantly.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Link 
                        to={destination} 
                        className="group inline-flex items-center gap-4 bg-[#fbb03b] text-black px-12 py-6 rounded-2xl font-[900] uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-2xl shadow-[#fbb03b]/20"
                    >
                        Setup Your Shop <ArrowRight size={22} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                    
                    <div className="flex items-center gap-3 text-left">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                            <ShieldCheck className="text-[#fbb03b]" size={24} />
                        </div>
                        <div>
                            <p className="text-white font-black text-xs uppercase ">Verified Selling</p>
                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Secure Merchant Portal</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Glassmorphism Visual Card */}
            <div className="relative z-10 hidden lg:block flex-shrink-0 group">
                <div className="w-80 h-96 bg-gradient-to-b from-white/10 to-transparent rounded-[50px] backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center text-center p-10 -rotate-3 group-hover:rotate-0 transition-all duration-700">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-[#fbb03b] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-[#fbb03b] p-6 rounded-[24px] shadow-2xl shadow-orange-500/40">
                            <Star size={44} className="text-black" fill="currentColor" />
                        </div>
                    </div>
                    
                    <h3 className="text-white font-black text-3xl mb-2 uppercase  leading-none">Elite <br/> Merchant</h3>
                    <div className="w-12 h-1 bg-[#fbb03b] mb-4 mx-auto"></div>
                    
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] leading-loose">
                        Unmatched Reach <br />
                        Zero Setup Fee <br />
                        Smart Logistics
                    </p>
                </div>
                
                {/* Floating Stat Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-3xl shadow-2xl flex items-center gap-4 animate-bounce">
                    <div className="bg-green-100 p-2 rounded-full">
                        <Zap size={20} className="text-green-600" fill="currentColor" />
                    </div>
                    <div className="text-left">
                        <p className="text-black font-black text-lg leading-none">FREE</p>
                        <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Tier Active</p>
                    </div>
                </div>
            </div>
         </div>
      </section>
   );
};

export default MerchantBanner;