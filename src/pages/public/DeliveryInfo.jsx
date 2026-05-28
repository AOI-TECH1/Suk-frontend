import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, MapPin, ShieldCheck, ChevronRight } from 'lucide-react';
import deliveryimg from '../../assets/images/delivery-info.avif';

const DeliveryInfo = () => {
  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 font-sans">
      
      {/* --- 1. HERO IMAGE BANNER --- */}
      <div className="relative w-full h-48 md:h-64 bg-zinc-900 overflow-hidden flex items-center z-10">
        <img src={deliveryimg} alt="Logistics Banner" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white">
            {/* Breadcrumb */}
            <nav className="flex items-center text-[10px] text-gray-300 font-black mb-3 uppercase tracking-[0.2em]">
                <Link to="/" className="hover:text-[#fbb03b] transition-colors">Home</Link>
                <ChevronRight size={10} className="mx-2 text-gray-500" />
                <span className="text-[#fbb03b]">Delivery Info</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter  leading-none">
                Shipping <span className="text-[#fbb03b]">&</span> Logistics
            </h1>
        </div>
      </div>

      {/* --- 2. CONTENT CARD --- */}
      <div className="flex items-center justify-center px-4 -mt-16 relative z-30">
        <div className="max-w-4xl w-full bg-white p-8 md:p-16 rounded-[40px] shadow-2xl border border-gray-100">
          
          <div className="space-y-12">
            
            {/* Section: Shipping Coverage */}
            <section className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#fbb03b] shrink-0">
                    <MapPin size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black uppercase  tracking-tight mb-4 text-zinc-900">Shipping Coverage</h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        SuK Marketplace currently delivers to all major cities across **Nigeria**. 
                        We partner with top-tier logistics providers like GIGL, DHL, and local expert dispatchers 
                        to ensure your items arrive safely and on time.
                    </p>
                </div>
            </section>

            {/* Section: Delivery Times */}
            <section className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-[#fbb03b] shrink-0">
                    <Clock size={24} />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-black uppercase  tracking-tight mb-4 text-zinc-900">Standard Delivery Times</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <TimeCard location="Lagos" time="1-2 Days" />
                        <TimeCard location="Abuja / PH" time="3-4 Days" />
                        <TimeCard location="Others" time="5-7 Days" />
                    </div>
                </div>
            </section>

            {/* Orange Info Box */}
            <div className="bg-orange-50 p-8 rounded-3xl border-l-8 border-[#fbb03b] flex items-center gap-6">
                <div className="hidden sm:block">
                    <ShieldCheck size={40} className="text-[#fbb03b]" />
                </div>
                <p className="text-sm text-orange-900 font-bold leading-relaxed ">
                    "All SuK deliveries are insured. If your item is damaged during transit, 
                    we offer a full refund or immediate replacement as part of our Buyer Protection program."
                </p>
            </div>

          </div>

          {/* Footer of the page */}
          <div className="mt-16 pt-10 border-t border-gray-50 text-center">
             <Link to="/shop" className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#fbb03b] hover:text-black transition-all shadow-xl active:scale-95 inline-flex items-center gap-2">
                <Truck size={16} /> Start Shopping Now
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

// Small helper component for the Delivery Grid
const TimeCard = ({ location, time }) => (
  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 group hover:border-[#fbb03b] transition-colors">
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{location}</p>
    <p className="text-lg font-black text-zinc-900">{time}</p>
  </div>
);

export default DeliveryInfo;