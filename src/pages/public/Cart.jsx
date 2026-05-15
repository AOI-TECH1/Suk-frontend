import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-12">Your Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LIST OF ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {[1, 2].map((item) => (
            <div key={item} className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm">
               <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                  <img src="https://placehold.co/100x100" className="w-full h-full object-cover" alt="item" />
               </div>
               <div className="flex-1">
                  <h3 className="font-black text-lg">Product Name Here</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase mb-2">Category</p>
                  <p className="font-black text-[#fbb03b]">₦45,000</p>
               </div>
               <div className="flex items-center gap-4">
                  <button className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
               </div>
            </div>
          ))}
        </div>

        {/* SUMMARY BOX */}
        <div className="bg-black text-white p-10 rounded-[40px] shadow-2xl h-fit sticky top-32">
           <h3 className="text-2xl font-black mb-8 italic uppercase tracking-widest">Summary</h3>
           <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400 font-bold uppercase text-xs"><span>Subtotal</span> <span>₦90,000</span></div>
              <div className="flex justify-between text-gray-400 font-bold uppercase text-xs"><span>Delivery</span> <span>₦2,500</span></div>
              <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-black">
                 <span>Total</span> <span className="text-[#fbb03b]">₦92,500</span>
              </div>
           </div>
           <button className="w-full bg-[#fbb03b] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-orange-500 transition-all shadow-xl">
              CHECKOUT NOW <ArrowRight size={20} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;