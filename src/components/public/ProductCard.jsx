import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useAuth();

  // 1. PRICE LOGIC
  const originalPrice = Number(product.price) || 0;
  const currentPrice = Number(product.final_price || product.price) || 0;
  const hasDiscount = currentPrice < originalPrice;

  // 2. IMAGE URL HELPER
  // Handles full URLs, Cloudinary IDs, and provides a placeholder for broken links
  const getImageUrl = (img) => {
    if (!img) return 'https://placehold.co/400x400?text=No+Image';
    if (img.startsWith('http')) return img;
    // Construct Cloudinary URL using your specific cloud name 'dfcltknve' observed in logs
    return `https://res.cloudinary.com/dfcltknve/image/upload/v1/${img}`;
  };

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/400x400?text=SuK+Marketplace';
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#fbb03b] flex flex-col h-full relative">
      
      {/* --- IMAGE CONTAINER --- */}
      <div className="relative aspect-square bg-[#f9f9f9] flex items-center justify-center p-4 overflow-hidden">
        
        {/* NEW Badge */}
        {product.is_featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-[#4dbb5e] text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-sm">
              New
            </span>
          </div>
        )}

        {/* Action Icons (Always Visible) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
          <button 
            className="bg-white p-2 rounded-full shadow-sm border border-gray-50 text-gray-400 hover:text-red-500 hover:scale-110 transition-all"
            onClick={(e) => e.preventDefault()}
          >
            <Heart size={15} />
          </button>
          <Link 
            to={`/product/${product.slug || product.id}`} 
            className="bg-white p-2 rounded-full shadow-sm border border-gray-50 text-gray-400 hover:text-[#fbb03b] hover:scale-110 transition-all"
          >
            <Eye size={15} />
          </Link>
        </div>

        {/* Product Image */}
        <Link to={`/product/${product.slug || product.id}`} className="w-full h-full flex items-center justify-center">
          <img 
            src={getImageUrl(product.main_image || product.image)} 
            alt={product.name}
            onError={handleImageError}
            className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
          />
        </Link>
      </div>

      {/* --- DETAILS --- */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.15em] mb-1">
            {product.category?.name || "SuK Verified"}
        </p>

        <Link to={`/product/${product.slug || product.id}`}>
          <h3 className="text-[11px] font-black text-zinc-800 line-clamp-1 mb-3 uppercase italic tracking-tighter hover:text-[#fbb03b] transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex flex-col">
            <span className="text-sm font-black text-[#4dbb5e]">
              ₦{currentPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-[10px] text-gray-300 line-through font-bold">
                ₦{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button 
            onClick={(e) => { 
              e.preventDefault(); 
              addToCart(product); 
            }}
            className="bg-[#fbb03b] text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-zinc-900 transition-all active:scale-95 shadow-sm"
          >
            <ShoppingCart size={12} fill="currentColor" />
            <span className="text-[9px] font-black uppercase italic tracking-tighter">Add to cart</span>
          </button>
        </div>

        {/* Ratings (Pushed to bottom) */}
        <div className="mt-auto flex items-center gap-1">
          <div className="flex text-[#fbb03b]">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={10} 
                fill={i < 4 ? "currentColor" : "none"} 
                className={i < 4 ? "" : "text-gray-200"} 
              />
            ))}
          </div>
          <span className="text-[9px] text-gray-400 font-bold">(75)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;