import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingCart, Star, ChevronRight } from "lucide-react"; 
import { getAllProducts } from "../../../api/productApi";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

function ProductSection() {
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

  // --- LOGIC: Group products by Category Name ---
  const groupedProducts = products.reduce((acc, product) => {
    const categoryName = product.category?.name || "General Items";
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(product);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#fbb03b]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] pb-20">
      {Object.entries(groupedProducts).map(([category, items]) => (
        <section key={category} className="py-6 px-4 max-w-7xl mx-auto">
          
          {/* --- 1. JUMIA STYLE RIBBON BANNER --- */}
          <div className="relative w-full bg-[#8e044d] rounded-t-lg h-12 flex items-center justify-between px-6 overflow-hidden mb-4 shadow-md">
            {/* Futuristic Geometric Background Pattern (Overlay) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-around">
                 {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-full w-px bg-white skew-x-[-45deg]"></div>
                 ))}
            </div>

            <h2 className="relative z-10 text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#fbb03b] rounded-full animate-pulse"></div>
              {category}
            </h2>

            <Link to={`/shop?category=${category}`} className="relative z-10 text-white text-[10px] font-black uppercase flex items-center gap-1 hover:text-[#fbb03b] transition">
              See All Items <ChevronRight size={14} />
            </Link>
          </div>

          {/* --- 2. PRODUCT GRID --- */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items.slice(0, 5).map((product) => ( // Show top 5 items per row
              <div key={product.id} className="bg-white border border-gray-200 group relative flex flex-col p-3 transition-all hover:shadow-lg rounded-xl">
                
                {/* NEW Badge */}
                {product.is_featured && (
                    <div className="absolute top-4 left-4 z-10">
                        <span className="bg-[#4dbb5e] text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm">NEW</span>
                    </div>
                )}

                {/* Icons */}
                <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 hover:text-red-500 transition p-1 bg-white rounded-full border shadow-sm"><Heart size={14} /></button>
                  <Link to={`/product/${product.slug}`} className="text-gray-400 hover:text-blue-500 transition p-1 bg-white rounded-full border shadow-sm"><Eye size={14} /></Link>
                </div>

                {/* Image */}
                <div className="aspect-square flex items-center justify-center bg-[#f8f8f8] mb-3 overflow-hidden rounded-lg">
                  <img src={product.main_image} alt={product.name} className="w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow">
                  <h6 className="font-bold text-gray-900 text-[11px] mb-2 line-clamp-1 leading-tight">{product.name}</h6>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col">
                        <span className="text-[#4dbb5e] font-black text-xs">₦{Number(product.final_price).toLocaleString()}</span>
                        {product.discounted_price && (
                            <span className="text-gray-300 text-[9px] line-through font-bold">₦{Number(product.price).toLocaleString()}</span>
                        )}
                    </div>

                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-[#fbb03b] text-white text-[8px] font-black py-1.5 px-2 rounded flex items-center gap-1 hover:bg-orange-500 transition shadow-sm active:scale-95"
                    >
                      <ShoppingCart size={10} /> Add
                    </button>
                  </div>

                  <div className="flex items-center gap-1 mt-auto">
                    <div className="flex text-[#fbb03b]">
                      {[...Array(4)].map((_, i) => <Star key={i} size={8} fill="currentColor" />)}
                      <Star size={8} fill="currentColor" className="text-gray-200" />
                    </div>
                    <span className="text-gray-400 text-[8px] font-bold">(75)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductSection;