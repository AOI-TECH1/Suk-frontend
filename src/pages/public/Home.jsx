import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Star } from 'lucide-react';

// Components imports (Verify these paths match your folder structure)
import HeroSlider from '../../components/public/homepage/HomePage_slider';
import BrowserByCategory from '../../components/public/homepage/HomeCategory';
import TrendySlide from '../../components/public/homepage/TrendingSlide';
import ProductSection from '../../components/public/homepage/HomePage_ProductCard';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans">
      
      {/* 1. HERO BANNER SECTION */}
      <HeroSlider />

      {/* 2. VISUAL BRIDGE: FLASH SALE MARQUEE 
          This adds "Life" to the page. It's the black bar with orange scrolling text. */}
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

      {/* 4. TRENDING / FEATURED ITEMS 
          Usually filtered by 'is_featured=true' in the backend */}
      <section className="py-10 bg-gray-50/50">
        <TrendySlide />
      </section>

      {/* 5. MAIN PRODUCT INVENTORY GRID */}
      <section className="pb-20">
        <ProductSection />
      </section>

      {/* 6. MERCHANT RECRUITMENT BANNER (The SuK "Seller" Bridge) 
          This encourages shoppers to also become sellers. */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
         <div className="bg-gradient-to-br from-zinc-900 to-black rounded-[50px] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
            
            {/* Abstract glow decoration */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#fbb03b]/10 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 flex-1 text-center md:text-left">
                <h2 className="text-5xl md:text-7xl font-[900] text-white italic uppercase leading-[0.9] tracking-tighter mb-6">
                    Turn Your <br /> 
                    <span className="text-[#fbb03b]">Passion</span> To <br /> 
                    Profit.
                </h2>
                <p className="text-gray-400 font-bold max-w-sm mb-10 text-lg leading-relaxed">
                    Join Nigeria's elite merchant network. List your products and start earning in minutes.
                </p>
                <Link 
                  to="/setup-store" 
                  className="inline-flex items-center gap-4 bg-[#fbb03b] text-black px-12 py-5 rounded-2xl font-[900] uppercase tracking-widest hover:bg-orange-500 hover:scale-105 transition-all shadow-xl shadow-orange-500/20"
                >
                    Open Your Store <ArrowRight size={22} strokeWidth={3} />
                </Link>
            </div>
            
            {/* Visual Box */}
            <div className="relative z-10 hidden lg:block flex-shrink-0">
                <div className="w-80 h-80 bg-white/5 rounded-[40px] backdrop-blur-md border border-white/10 flex flex-col items-center justify-center text-center p-8 rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="bg-[#fbb03b] p-5 rounded-full mb-4 shadow-lg shadow-orange-500/40">
                        <Star size={40} className="text-black" fill="currentColor" />
                    </div>
                    <h3 className="text-white font-black text-2xl mb-1 uppercase italic">TOP RATED</h3>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Verified Merchant Hub</p>
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