import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react"; 
import { getAllProducts } from "../../../api/productApi";
import ProductCard from "../../public/ProductCard"; 

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getAllProducts();
        // Handle both paginated results and direct arrays
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

  const groupedProducts = products.reduce((acc, product) => {
    const categoryName = product.category?.name || "General Items";
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(product);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center py-20 bg-[#f5f5f5]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#fbb03b]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] pb-10">
      {Object.entries(groupedProducts)
        .filter(([_, items]) => items.length > 0)
        .slice(0, 3) 
        .map(([category, items]) => {
          // FIX: Sanitize the category name to remove '&', spaces, etc. for CSS selectors
          const safeCategoryClass = category.replace(/[^a-zA-Z0-9]/g, '');

          return (
            <section key={category} className="py-6 px-4 max-w-7xl mx-auto relative group">
              
              {/* --- JUMIA STYLE RIBBON BANNER --- */}
              <div className="relative w-full bg-[#0F356C] rounded-t-lg h-11 flex items-center justify-between px-6 overflow-hidden mb-1 shadow-sm">
                <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-around">
                     {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-full w-px bg-white skew-x-[-45deg]"></div>
                     ))}
                </div>
                <h2 className="relative z-10 text-white font-black text-[12px] uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#fbb03b] rounded-full animate-pulse"></div>
                  {category}
                </h2>
                <Link to={`/shop?category=${category}`} className="relative z-10 text-white text-[9px] font-black uppercase flex items-center gap-1 hover:text-[#fbb03b] transition">
                  See All <ChevronRight size={12} />
                </Link>
              </div>

              {/* --- CAROUSEL CONTAINER --- */}
              <div className="relative bg-white p-4 rounded-b-xl border border-gray-100 shadow-sm">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={15}
                  navigation={{
                    // Use the sanitized safe class strings
                    nextEl: `.btn-next-${safeCategoryClass}`,
                    prevEl: `.btn-prev-${safeCategoryClass}`,
                  }}
                  breakpoints={{
                    320: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                  className="mySwiper"
                >
                  {items.map((product) => ( 
                    <SwiperSlide key={product.id} className="py-2">
                       <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* CUSTOM NAVIGATION ARROWS */}
                <button className={`btn-prev-${safeCategoryClass} absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white/90 border border-gray-200 p-2 rounded-full shadow-lg text-gray-800 hover:bg-[#fbb03b] hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:block disabled:opacity-0`}>
                  <ChevronLeft size={20} />
                </button>
                <button className={`btn-next-${safeCategoryClass} absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white/90 border border-gray-200 p-2 rounded-full shadow-lg text-gray-800 hover:bg-[#fbb03b] hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:block disabled:opacity-0`}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </section>
          );
        })}

      {/* Internal Style to handle Swiper disabled states cleaner */}
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-button-disabled {
          display: none !important;
        }
      `}} />
    </div>
  );
}

export default ProductSection;