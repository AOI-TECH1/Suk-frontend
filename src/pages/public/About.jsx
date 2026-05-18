import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Target, ShieldCheck, Heart } from 'lucide-react';
import img1 from '../../assets/images/About1.png';
import img2 from '../../assets/images/vision.png';
import img3 from '../../assets/images/value.png';

const About = () => {
  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-28 font-sans">
      
      {/* --- 1. HERO IMAGE BANNER & BREADCRUMB --- */}
      <div className="relative w-full h-64 md:h-80 bg-zinc-900 overflow-hidden flex items-center z-10">
        {/* Cinematic Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
          alt="SuK Team" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        
        {/* Banner Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 w-full text-white">
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">
                <Link to="/" className="hover:text-[#fbb03b] transition-colors">Home</Link>
                <ChevronRight size={12} className="text-[#fbb03b]" />
                <span className="text-white">About SuK</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-[900] uppercase italic tracking-tighter leading-none">
                Home <span className="text-[#fbb03b]">Within.</span>
            </h1>
            <p className="mt-4 text-gray-300 font-medium max-w-md text-sm md:text-base border-l-2 border-[#fbb03b] pl-4">
                We are building the future of commerce in Nigeria, connecting millions through trust and speed.
            </p>
        </div>
      </div>

      {/* --- 2. OUR STORY SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            {/* Decorative frame */}
            <div className="absolute -inset-4 border-2 border-orange-100 rounded-[40px] -z-10 group-hover:scale-105 transition-transform duration-500"></div>
            <img src={img1} alt="About SuK" className="w-full h-[500px] object-cover rounded-[32px] shadow-2xl" />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-1 bg-[#fbb03b]"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-[#fbb03b]">The Beginning</span>
            </div>
            <h3 className="text-4xl font-black text-zinc-900 uppercase italic tracking-tight">Our Story</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-lg">
                SuK is a dynamic e-commerce platform designed to offer a seamless shopping experience to customers while providing robust management tools for merchants.
            </p>
            <p className="text-gray-600 leading-relaxed">
                SuK is not just an e-commerce website; it is a comprehensive ecosystem designed to meet the evolving needs of modern shoppers and businesses. We make online shopping enjoyable, efficient, and above all, secure.
            </p>
          </div>
        </div>
      </div>

      {/* --- 3. OUR VISION SECTION (Full Width Background) --- */}
      <div className="w-full bg-[#fff9e6] py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="w-12 h-12 bg-[#fbb03b] rounded-2xl flex items-center justify-center text-black mb-4">
               <Target size={24} />
            </div>
            <h3 className="text-4xl font-black text-zinc-900 uppercase italic tracking-tight">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed font-bold text-xl">
              To revolutionize the online shopping experience in Nigeria and beyond.
            </p>
            <p className="text-gray-600 leading-relaxed">
              SuK focuses on catering to the unique preferences and needs of local markets. By offering regional logistics and local merchant support, SuK ensures a personalized experience for every community.
            </p>
          </div>
          
          <div className="order-1 lg:order-2">
            <img src={img2} alt="Our Vision" className="w-full h-[450px] object-cover rounded-[32px] shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>
      </div>

      {/* --- 4. OUR VALUES SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl -z-10"></div>
            <img src={img3} alt="Our Values" className="w-full h-[500px] object-cover rounded-[32px] shadow-2xl" />
          </div>
          
          <div className="space-y-8">
            <h3 className="text-4xl font-black text-zinc-900 uppercase italic tracking-tight">Our Values</h3>
            <div className="space-y-6">
               <ValueItem icon={<ShieldCheck className="text-green-500"/>} title="Trust & Security" desc="We build foundations on verified transactions and merchant integrity." />
               <ValueItem icon={<Target className="text-blue-500"/>} title="Innovation" desc="Constantly evolving our tools to empower small and large businesses." />
               <ValueItem icon={<Heart className="text-red-500"/>} title="Community Focus" desc="Catering to the unique needs of the local markets we serve." />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// Reusable Value Component
const ValueItem = ({ icon, title, desc }) => (
  <div className="flex gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all group">
     <div className="shrink-0">{icon}</div>
     <div>
        <h4 className="font-black uppercase text-sm mb-1 group-hover:text-[#fbb03b] transition-colors">{title}</h4>
        <p className="text-xs text-gray-500 font-medium leading-relaxed">{desc}</p>
     </div>
  </div>
);

export default About;