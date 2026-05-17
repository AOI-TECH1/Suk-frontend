import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react"; 
import { getAllProducts } from "../../../api/productApi";
import { useAuth } from "../../../context/AuthContext"; // IMPORT THIS
import toast from "react-hot-toast";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useAuth(); // GRAB THE FUNCTION

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
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#fbb03b]"></div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto bg-[#f5f5f5]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-bold uppercase tracking-tight text-black border-l-4 border-[#fbb03b] pl-4">
          Explore Our Products
        </h2>
        <div className="flex gap-2">
            <button className="bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100"><Eye size={14}/></button>
            <button className="bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100"><Heart size={14}/></button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 group relative flex flex-col p-4 transition-all hover:shadow-md">
            
            {/* NEW Badge */}
            {product.is_featured && (
                <div className="absolute top-6 left-6 z-10">
                    <span className="bg-[#4dbb5e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                        NEW
                    </span>
                </div>
            )}

            {/* Top Right Action Icons */}
            <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
              <button className="text-gray-400 hover:text-black transition p-1 bg-white rounded-full border border-gray-100 shadow-sm">
                <Heart size={16} />
              </button>
              <button className="text-gray-400 hover:text-black transition p-1 bg-white rounded-full border border-gray-100 shadow-sm">
                <Eye size={16} />
              </button>
            </div>

            {/* Product Image Area */}
            <div className="aspect-[4/5] flex items-center justify-center bg-[#f8f8f8] mb-4 overflow-hidden relative">
              <img
                src={product.main_image}
                alt={product.name}
                className="w-4/5 h-4/5 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col flex-grow">
              {/* SHRUNK TEXT: text-xs */}
              <h3 className="font-bold text-gray-900 text-xs mb-2 line-clamp-1">
                {product.name}
              </h3>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    {/* SHRUNK TEXT: text-sm */}
                    <span className="text-[#4dbb5e] font-bold text-sm">
                        ₦{Number(product.final_price).toLocaleString()}
                    </span>
                    {product.discounted_price && (
                        <span className="text-gray-400 text-[9px] line-through">
                            ₦{Number(product.price).toLocaleString()}
                        </span>
                    )}
                </div>

                {/* SHRUNK BUTTON: py-1 px-2 and text-[9px]. Added onClick logic */}
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-[#fbb03b] text-white text-[9px] font-bold py-1 px-2 rounded flex items-center gap-1 hover:bg-orange-500 transition shadow-sm active:scale-95"
                >
                  <ShoppingCart size={10} />
                  Add to cart
                </button>
              </div>

              {/* DESIGN: Star Rating Section */}
              <div className="flex items-center gap-1 mt-auto">
                <div className="flex text-[#fbb03b]">
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" />
                  <Star size={10} fill="currentColor" className="text-gray-300" />
                </div>
                <span className="text-gray-400 text-[9px] font-medium">(75)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductSection;