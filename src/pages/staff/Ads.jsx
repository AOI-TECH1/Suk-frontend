import React from 'react';
import { Plus, Image as ImageIcon, Trash2 } from 'lucide-react';

const AdManagement = () => {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
           <h1 className="text-4xl font-black italic uppercase tracking-tighter">Marketing & Ads</h1>
           <p className="text-gray-500 font-medium">Manage home page sliders and promotional banners.</p>
        </div>
        <button className="bg-black text-[#fbb03b] font-black px-8 py-4 rounded-2xl flex items-center gap-2 hover:bg-zinc-800 transition-all">
          <Plus size={20}/> NEW CAMPAIGN
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map(ad => (
          <div key={ad} className="group bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-xl">
             <div className="aspect-video bg-gray-50 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                   <ImageIcon size={48} />
                </div>
                {/* Active Tag */}
                <div className="absolute top-6 left-6 bg-green-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">Active Now</div>
             </div>
             <div className="p-8 flex justify-between items-center">
                <div>
                   <h3 className="font-black text-xl uppercase italic">Black Friday Sale</h3>
                   <p className="text-xs text-gray-400 font-bold uppercase mt-1">Ends in: 14 Days</p>
                </div>
                <button className="text-gray-300 hover:text-red-500 transition-colors p-3 bg-gray-50 rounded-2xl">
                   <Trash2 size={20} />
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdManagement;