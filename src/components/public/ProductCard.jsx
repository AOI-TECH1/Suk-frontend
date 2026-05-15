import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useAuth();

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[4/5] overflow-hidden rounded-[40px] bg-gray-50 relative border border-gray-100">
          <img 
            src={product.image || "https://placehold.co/400x500"} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.discount && (
            <div className="absolute top-6 left-6 bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                -{product.discount}%
            </div>
          )}
        </div>
      </Link>

      <div className="mt-5 px-2">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/product/${product.id}`}>
             <h3 className="text-lg font-black text-zinc-900 group-hover:text-[#fbb03b] transition-colors truncate w-40 italic uppercase tracking-tighter">
               {product.name}
             </h3>
          </Link>
          <button className="text-gray-300 hover:text-red-500 transition-colors">
            <Heart size={20} />
          </button>
        </div>
        
        <p className="text-[10px] text-gray-400 font-black uppercase mb-3 truncate tracking-widest">
            {product.category_name || "New Arrival"}
        </p>
        
        <div className="flex items-center justify-between">
           <p className="text-xl font-black text-zinc-900 italic">₦{Number(product.price).toLocaleString()}</p>
           <button 
             onClick={() => addToCart(product)}
             className="bg-zinc-900 text-white p-3 rounded-2xl hover:bg-[#fbb03b] hover:text-black transition-all shadow-lg active:scale-90"
           >
             <ShoppingCart size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;