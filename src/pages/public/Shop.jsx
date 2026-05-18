import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  MdSearch, MdOutlineFilterList, MdOutlineCategory, 
  MdOutlineAttachMoney, MdClose 
} from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import ProductCard from '../../components/public/ProductCard';
import toast from 'react-hot-toast';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // --- FILTER STATES ---
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("-created_at");

  // 1. Fetch Categories for the Sidebar
  useEffect(() => {
    api.get('/categories/').then(res => {
        const data = res.data.results || res.data;
        setCategories(data);
    });
  }, []);

  // 2. Main Product Fetch (Syncs with Filters)
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        // Constructing the query string for Django
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (selectedCat) params.append('category__slug', selectedCat);
        if (minPrice) params.append('price__gte', minPrice);
        if (maxPrice) params.append('price__lte', maxPrice);
        if (sortOption) params.append('ordering', sortOption);

        const res = await api.get(`/products/?${params.toString()}`);
        const data = res.data.results ? res.data.results : res.data;
        setProducts(data);
      } catch (err) {
        console.error("Filter Error", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search slightly so it doesn't hit server on every keystroke
    const timer = setTimeout(() => {
        fetchFilteredProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, selectedCat, minPrice, maxPrice, sortOption]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCat("");
    setMinPrice("");
    setMaxPrice("");
    setSortOption("-created_at");
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans bg-[#fcfcfc]">
      
      <div className="flex gap-10">
        
        {/* --- 1. SIDEBAR (Hidden on mobile without toggle) --- */}
        <aside className={`fixed inset-0 z-[120] lg:relative lg:z-0 lg:block lg:w-64 bg-white lg:bg-transparent p-6 lg:p-0 transition-transform duration-300 ${showMobileFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="flex justify-between items-center mb-8 lg:hidden">
             <h2 className="font-black uppercase italic">SuK Filters</h2>
             <button onClick={() => setShowMobileFilters(false)}><MdClose size={24}/></button>
          </div>

          <div className="space-y-10 sticky top-32">
            
            {/* Search Filter */}
            <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#fbb03b]">
                   <MdSearch size={14}/> Search Product
                </h4>
                <div className="relative">
                    <input 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="e.g iPhone 15" 
                      className="w-full bg-white border-2 border-gray-100 rounded-xl py-3 px-4 text-xs font-bold focus:border-[#fbb03b] outline-none"
                    />
                </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                   <MdOutlineCategory size={14}/> Category
                </h4>
                <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => setSelectedCat("")}
                      className={`text-left text-xs font-bold py-2 px-4 rounded-lg transition ${selectedCat === "" ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      All Categories
                    </button>
                    {categories.map(cat => (
                        <button 
                          key={cat.id}
                          onClick={() => setSelectedCat(cat.slug)}
                          className={`text-left text-xs font-bold py-2 px-4 rounded-lg transition ${selectedCat === cat.slug ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                          {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                   <MdOutlineAttachMoney size={14}/> Price Range
                </h4>
                <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number" placeholder="Min" className="filter-price-input" 
                      value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input 
                      type="number" placeholder="Max" className="filter-price-input" 
                      value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>

            <button 
              onClick={clearFilters}
              className="w-full py-4 rounded-2xl border-2 border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 hover:border-red-100 transition-all"
            >
                Reset All Filters
            </button>
          </div>
        </aside>

        {/* --- 2. MAIN CONTENT AREA --- */}
        <div className="flex-1">
          {/* Header & Mobile Toggle */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
               <h1 className="text-4xl font-black italic uppercase tracking-tighter text-zinc-900">Marketplace</h1>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Showing {products.length} verified items</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
               <button 
                 onClick={() => setShowMobileFilters(true)}
                 className="lg:hidden flex-1 border-2 border-gray-100 py-3 rounded-xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest"
               >
                 <MdOutlineFilterList size={18}/> Filters
               </button>

               <select 
                 value={sortOption}
                 onChange={(e) => setSortOption(e.target.value)}
                 className="flex-1 md:flex-none border-2 border-gray-100 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest bg-white focus:border-[#fbb03b] outline-none cursor-pointer"
               >
                 <option value="-created_at">Newest First</option>
                 <option value="price">Price: Low to High</option>
                 <option value="-price">Price: High to Low</option>
                 <option value="name">Alphabetical</option>
               </select>
            </div>
          </div>

          {/* Grid Logic */}
          {loading ? (
             <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="bg-gray-100 aspect-[4/5] rounded-[32px]"></div>
                ))}
             </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
               {products.map(product => (
                 <ProductCard key={product.id} product={product} />
               ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-white rounded-[50px] border-2 border-dashed border-gray-100">
               <h3 className="text-xl font-black uppercase italic text-gray-300 tracking-widest">No matching items</h3>
               <button onClick={clearFilters} className="mt-4 text-[#fbb03b] font-bold text-xs underline">Clear your search</button>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .filter-price-input {
          width: 100%;
          background: white;
          border: 2px solid #f3f4f6;
          padding: 0.75rem;
          border-radius: 0.75rem;
          font-size: 0.7rem;
          font-weight: 800;
          outline: none;
        }
        .filter-price-input:focus {
          border-color: #fbb03b;
        }
      `}} />
    </div>
  );
};

export default Shop;