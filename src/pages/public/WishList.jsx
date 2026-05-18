import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, ChevronRight, Star, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const WishList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Temporary mock data - Later this will come from api.get('/wishlist/')
  const wishlistItems = []; 

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 font-sans">
      
      {/* --- 1. HERO IMAGE BANNER --- */}
      <div className="relative w-full h-48 md:h-64 bg-zinc-900 overflow-hidden flex items-center z-10">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Saved Items Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white font-sans">
            <nav className="flex items-center text-[10px] text-gray-300 font-black mb-3 uppercase tracking-[0.2em]">
                <Link to="/" className="hover:text-[#fbb03b] transition-colors">Home</Link>
                <ChevronRight size={10} className="mx-2 text-gray-500" />
                <span className="text-[#fbb03b]">Saved Items</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
                My <span className="text-[#fbb03b]">Wishlist</span>
            </h1>
        </div>
      </div>

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        
        {wishlistItems.length === 0 ? (
          /* --- EMPTY STATE --- */
          <div className="bg-white rounded-[40px] p-20 text-center shadow-2xl border border-gray-100 flex flex-col items-center">
            <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <Heart size={48} className="text-[#fbb03b]" fill="#fbb03b" />
            </div>
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-zinc-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-400 font-medium mb-10 max-w-sm">
              Save items you love here to find them easily later. We'll even notify you when they go on sale!
            </p>
            <Link to="/shop" className="bg-black text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#fbb03b] hover:text-black transition-all shadow-xl active:scale-95 inline-flex items-center gap-3">
              <ArrowLeft size={16} /> Explore Marketplace
            </Link>
          </div>
        ) : (
          /* --- WISHLIST GRID (Placeholder for future items) --- */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 group relative flex flex-col p-4 transition-all hover:shadow-xl rounded-3xl overflow-hidden">
                    {/* Item styling would go here, matching the ProductSection.jsx style */}
                </div>
            ))}
          </div>
        )}

        {/* Informational Footer for Wishlist */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard icon={<Star size={18}/>} title="Price Alerts" desc="We'll let you know if your saved items drop in price." />
            <InfoCard icon={<ShoppingCart size={18}/>} title="Quick Checkout" desc="Add saved items to bag in just one click." />
            <InfoCard icon={<Trash2 size={18}/>} title="Easy Manage" desc="Remove or update your favorites anytime." />
        </div>
      </div>
    </div>
  );
};

// Helper component for the feature cards
const InfoCard = ({ icon, title, desc }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#fbb03b] shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="font-black text-[10px] uppercase tracking-widest text-zinc-900">{title}</h4>
            <p className="text-[11px] text-gray-400 font-medium leading-tight">{desc}</p>
        </div>
    </div>
);

export default WishList;