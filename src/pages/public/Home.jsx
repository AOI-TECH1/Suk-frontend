import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Star } from 'lucide-react';

// 1. IMPORT THE AUTH CONTEXT TO GET THE USER
import { useAuth } from '../../context/AuthContext';

// Components imports 
import HeroSlider from '../../components/public/homepage/HomePage_slider';
import BrowserByCategory from '../../components/public/homepage/HomeCategory';
import TrendySlide from '../../components/public/homepage/TrendingSlide';
import ProductSection from '../../components/public/homepage/HomePage_ProductCard';

const Home = () => {
  // 2. EXTRACT THE USER FROM YOUR GLOBAL AUTH STATE
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans">
      
      {/* 1. HERO BANNER SECTION */}
      <HeroSlider />

      {/* 2. VISUAL BRIDGE: FLASH SALE MARQUEE */}
      <div className="bg-[#0a0a0a] py-4 border-y border-white/5 overflow-hidden">
        <div className="flex animate-marquee gap-20 whitespace-nowrap">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 text-[#fbb03b] font-black uppercase italic tracking-tighter text-sm">
                    <Flame size={18} fill="#fbb03b" className="animate-pulse" /> 
                    FLASH DEALS ENDING SOON 
                    <span className="text-white ml-2">UP TO 75% OFF EVERYTHING</span>
                </div>
            ))}
        </div>
      </div>

      {/* 3. CATEGORY NAVIGATION */}
      <section className="py-10">
        <BrowserByCategory />
      </section>

      {/* 4. TRENDING / FEATURED ITEMS */}
      <section className="py-10 bg-gray-50/50">
        <TrendySlide />
      </section>

      {/* 5. MAIN PRODUCT INVENTORY GRID */}
      <section className="pb-20">
        <ProductSection />
      </section>

      {/* --- MERCHANT RECRUITMENT BANNER --- */}
      <section className="max-w-7xl mx-auto px-6 pb-24 font-sans">
          <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-[50px] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/5">
              
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#fbb03b]/10 rounded-full blur-[100px]"></div>
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-orange-600/5 rounded-full blur-[100px]"></div>
              
              <div className="relative z-10 flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300">Free Merchant Tier Available</span>
                  </div>

                  <h2 className="text-5xl md:text-8xl font-[900] text-white italic uppercase leading-[0.85] tracking-tighter mb-8">
                      Own The <br /> 
                      <span className="text-[#fbb03b]">Market</span> <br /> 
                      Not Just <br />
                      The Bag.
                  </h2>

                  <p className="text-gray-400 font-bold max-w-md mb-10 text-lg leading-relaxed">
                      Join Nigeria's elite merchant network. List your first items for <span className="text-white">Free</span> and reach thousands of verified buyers in minutes.
                  </p>

                  <Link 
                      /* FIXED: Logic now works because user is defined above */
                      to={user ? "/seller/dashboard" : "/register?next=seller-onboarding"} 
                      className="group inline-flex items-center gap-4 bg-[#fbb03b] text-black px-12 py-5 rounded-2xl font-[900] uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-orange-500/20"
                  >
                      Start Selling Now <ArrowRight size={22} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
              </div>
              
              <div className="relative z-10 hidden lg:block flex-shrink-0 group">
                  <div className="w-80 h-96 bg-white/5 rounded-[40px] backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center text-center p-8 -rotate-3 group-hover:rotate-0 transition-all duration-700">
                      <div className="relative mb-6">
                          <div className="absolute inset-0 bg-[#fbb03b] blur-2xl opacity-20"></div>
                          <div className="relative bg-[#fbb03b] p-6 rounded-3xl shadow-lg">
                              <Star size={44} className="text-black" fill="currentColor" />
                          </div>
                      </div>

                      <h3 className="text-white font-black text-3xl mb-1 uppercase italic leading-none">Elite <br/> Merchant</h3>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] mt-4 leading-loose">
                          Zero Setup Fee <br />
                          Unlimited Reach <br />
                          Secure Payouts
                      </p>
                      
                      <div className="mt-8 bg-zinc-800/50 px-4 py-2 rounded-xl border border-white/5">
                          <p className="text-[8px] text-[#fbb03b] font-black uppercase tracking-widest">Free Plan: 10 Products</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Marquee Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 25s linear infinite;
        }
      `}} />

    </div>
  );
};

export default Home;