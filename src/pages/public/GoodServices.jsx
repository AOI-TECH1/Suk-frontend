import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingCart, Star, ChevronRight, Package, ShieldCheck } from "lucide-react"; 
import { getAllProducts } from "../../api/productApi";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function GoodsService() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useAuth();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getAllProducts();
        const data = res.data.results ? res.data.results : res.data;
        setProducts(data);
      } catch (error) {
        console.error("SuK API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#fbb03b] border-gray-200"></div>
          <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Loading Catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 font-sans">
      
      {/* --- 1. HERO BANNER --- */}
      <div className="relative w-full h-48 md:h-64 bg-zinc-900 overflow-hidden flex items-center z-10">
        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" 
          alt="Goods Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white">
            <nav className="flex items-center text-[10px] text-gray-300 font-black mb-3 uppercase tracking-[0.2em]">
                <Link to="/" className="hover:text-[#fbb03b] transition-colors">Home</Link>
                <ChevronRight size={10} className="mx-2 text-gray-500" />
                <span className="text-[#fbb03b]">Goods & Services</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
                Our <span className="text-[#fbb03b]">Inventory</span>
            </h1>
        </div>
      </div>

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        
        {/* Intro Section Card */}
        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-100 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                    <h2 className="text-3xl font-black uppercase italic tracking-tight text-zinc-900 mb-4">Quality Guaranteed</h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Explore our curated selection of premium goods. From the latest electronics to 
                        exclusive fashion, every item on SuK is verified for quality and authenticity.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1 bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center">
                        <Package className="mx-auto mb-3 text-[#fbb03b]" size={28} />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Verified</p>
                        <p className="text-lg font-black text-zinc-900">Merchants</p>
                    </div>
                    <div className="flex-1 bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center">
                        <ShieldCheck className="mx-auto mb-3 text-[#fbb03b]" size={28} />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Secure</p>
                        <p className="text-lg font-black text-zinc-900">Checkout</p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- 3. PRODUCT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 group relative flex flex-col p-4 transition-all hover:shadow-xl rounded-3xl overflow-hidden">
              
              {/* Badge */}
              {product.is_featured && (
                  <div className="absolute top-4 left-4 z-10">
                      <span className="bg-[#4dbb5e] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
                          NEW ARRIVAL
                      </span>
                  </div>
              )}

              {/* Action Icons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <button className="text-gray-400 hover:text-red-500 transition p-2 bg-white rounded-full shadow-md border border-gray-50">
                  <Heart size={16} />
                </button>
                <Link to={`/product/${product.slug}`} className="text-gray-400 hover:text-[#fbb03b] transition p-2 bg-white rounded-full shadow-md border border-gray-50">
                  <Eye size={16} />
                </Link>
              </div>

              {/* Product Image Area */}
              <Link to={`/product/${product.slug}`} className="aspect-square flex items-center justify-center bg-[#f8f8f8] mb-4 overflow-hidden relative rounded-2xl">
                <img
                  src={product.main_image}
                  alt={product.name}
                  className="w-3/4 h-3/4 object-contain transition-transform duration-700 group-hover:scale-110"
                />
              </Link>

              {/* Product Details */}
              <div className="flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 text-xs mb-2 line-clamp-1 group-hover:text-[#fbb03b] transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col leading-tight">
                      <span className="text-[#4dbb5e] font-black text-sm">
                          ₦{Number(product.final_price).toLocaleString()}
                      </span>
                      {product.discounted_price && (
                          <span className="text-gray-400 text-[9px] line-through font-bold">
                              ₦{Number(product.price).toLocaleString()}
                          </span>
                      )}
                  </div>

                  {/* Add to cart button */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-[#fbb03b] text-white text-[9px] font-black py-2 px-3 rounded-xl flex items-center gap-2 hover:bg-orange-500 transition shadow-lg shadow-orange-100 active:scale-95"
                  >
                    <ShoppingCart size={10} strokeWidth={3} />
                    ADD
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mt-auto border-t border-gray-50 pt-3">
                  <div className="flex text-[#fbb03b]">
                    {[1,2,3,4].map(i => <Star key={i} size={10} fill="currentColor" />)}
                    <Star size={10} className="text-gray-200" />
                  </div>
                  <span className="text-gray-400 text-[9px] font-black uppercase tracking-widest">(75 Reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default GoodsService;