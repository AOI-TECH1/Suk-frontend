import React from 'react';
import { Heart } from 'lucide-react';

const Wishlist = () => (
  <div className="max-w-7xl mx-auto py-20 px-4 text-center">
    <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
      <Heart className="text-orange-500" size={40} />
    </div>
    <h1 className="text-3xl font-black mb-2">Your Wishlist is empty</h1>
    <p className="text-gray-500 mb-8">Save items you love here to find them easily later.</p>
    <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-orange-500 transition">
      Start Shopping
    </button>
  </div>
);
export default Wishlist;