import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Filter, ShoppingBag, Search } from 'lucide-react';
import ProductCard from '../../components/public/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Ensure this endpoint matches your Django urls.py (path('products/', ...))
        const res = await api.get('/products/');
        setProducts(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  /**
   * SORTING LOGIC
   * Automatically sorts the products based on dropdown selection
   */
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "price-high") return b.price - a.price;
    if (sortOption === "alphabetical") return a.name.localeCompare(b.name);
    return 0; // Default: newest (original order)
  });

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans">
      
      {/* 1. HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-1 bg-[#fbb03b]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fbb03b]">SuK Marketplace</span>
           </div>
           <h1 className="text-5xl font-black italic tracking-tighter uppercase text-zinc-900">Discover</h1>
           <p className="text-gray-400 font-medium mt-1">Showing {sortedProducts.length} premium results</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
           {/* Mobile Filter Toggle */}
           <button className="flex-1 md:flex-none border-2 border-gray-100 px-6 py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition">
             <Filter size={16} /> Filters
           </button>

           {/* Sorting Dropdown */}
           <select 
             onChange={(e) => setSortOption(e.target.value)}
             className="flex-1 md:flex-none border-2 border-gray-100 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-white outline-none focus:border-[#fbb03b] appearance-none cursor-pointer"
           >
             <option value="newest">Newest Arrivals</option>
             <option value="price-low">Price: Low to High</option>
             <option value="price-high">Price: High to Low</option>
             <option value="alphabetical">Alphabetical</option>
           </select>
        </div>
      </div>

      {/* 2. PRODUCT GRID */}
      {loading ? (
        // --- SKELETON LOADER ---
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
           {[1,2,3,4,5,6,7,8].map(i => (
             <div key={i} className="animate-pulse">
                <div className="bg-gray-100 aspect-[4/5] rounded-[40px] mb-4"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
             </div>
           ))}
        </div>
      ) : sortedProducts.length > 0 ? (
        // --- ACTUAL PRODUCT LIST ---
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
           {sortedProducts.map(product => (
             <ProductCard key={product.id} product={product} />
           ))}
        </div>
      ) : (
        // --- EMPTY STATE ---
        <div className="py-32 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-100 rounded-[50px]">
           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-gray-300" />
           </div>
           <h3 className="text-2xl font-black uppercase italic tracking-tighter">No Products Found</h3>
           <p className="text-gray-400 font-medium max-w-xs mx-auto mt-2">
             Our merchants are currently updating their inventory. Check back soon for new arrivals!
           </p>
           <button 
             onClick={() => window.location.reload()}
             className="mt-8 text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-[#fbb03b] hover:border-[#fbb03b] transition-all"
           >
             Refresh Store
           </button>
        </div>
      )}

    </div>
  );
};

export default Shop;