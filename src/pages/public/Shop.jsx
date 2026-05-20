import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; // Added for URL params
import api from '../../api/axios';
import { 
  MdSearch, MdOutlineFilterList, MdOutlineCategory, 
  MdOutlineAttachMoney, MdClose 
} from "react-icons/md";
import { HiChevronRight, HiOutlineHome } from "react-icons/hi"; // For Breadcrumbs
import ProductCard from '../../components/public/ProductCard';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // --- FILTER STATES (Synced with URL) ---
  const [search, setSearch] = useState(searchParams.get('search') || "");
  const [selectedCat, setSelectedCat] = useState(searchParams.get('category') || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("-created_at");

  // 1. Fetch Categories
  useEffect(() => {
    api.get('/categories/').then(res => {
        const data = res.data.results || res.data;
        setCategories(data);
    });
  }, []);

  // 2. Sync State with URL changes (Crucial for "Browse by Category" to work)
  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl) setSelectedCat(catFromUrl);
  }, [searchParams]);

  // 3. Main Product Fetch
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        // Ensure your Django Filter matches this key:
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

    const timer = setTimeout(fetchFilteredProducts, 400);
    return () => clearTimeout(timer);
  }, [search, selectedCat, minPrice, maxPrice, sortOption]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCat("");
    setMinPrice("");
    setMaxPrice("");
    setSortOption("-created_at");
    setSearchParams({}); // Clear URL too
  };

  return (
    <div className="pt-20 pb-16 bg-[#fcfcfc] min-h-screen font-sans">
      
      {/* --- 1. DYNAMIC BANNER & BREADCRUMBS --- */}
      <div className="bg-zinc-900 pt-20 pb-12 mb-10">
        <div className="max-w-7xl mx-auto px-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">
                <Link to="/" className="hover:text-[#fbb03b] flex items-center gap-1 transition-colors">
                    <HiOutlineHome size={12}/> Home
                </Link>
                <HiChevronRight size={10}/>
                <span className="text-[#fbb03b]">Marketplace</span>
                {selectedCat && (
                    <>
                        <HiChevronRight size={10}/>
                        <span className="text-white italic">{selectedCat}</span>
                    </>
                )}
            </nav>
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                The <span className="text-[#fbb03b]">Suk</span> Shop
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2 max-w-md">
                Browse through our curated selection of high-quality verified items.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10">
        
        {/* --- 2. COMPACT SIDEBAR --- */}
        <aside className={`fixed inset-0 z-[120] lg:relative lg:z-0 lg:block lg:w-60 bg-white lg:bg-transparent p-6 lg:p-0 transition-transform duration-300 ${showMobileFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="flex justify-between items-center mb-6 lg:hidden">
             <h2 className="font-black uppercase italic text-sm">Filters</h2>
             <button onClick={() => setShowMobileFilters(false)}><MdClose size={20}/></button>
          </div>

          <div className="space-y-7 sticky top-32">
            {/* Search */}
            <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#fbb03b]">
                   <MdSearch size={12}/> Search
                </h4>
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Keywords..." 
                  className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-[11px] font-bold focus:border-[#fbb03b] outline-none transition-colors"
                />
            </div>

            {/* Categories */}
            <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-gray-400">
                   <MdOutlineCategory size={12}/> Categories
                </h4>
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    <button 
                      onClick={() => {setSelectedCat(""); setSearchParams({})}}
                      className={`text-left text-[10px] font-black uppercase py-2 px-3 rounded-md transition ${selectedCat === "" ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      All Categories
                    </button>
                    {categories.map(cat => (
                        <button 
                          key={cat.id}
                          onClick={() => {setSelectedCat(cat.slug); setSearchParams({category: cat.slug})}}
                          className={`text-left text-[10px] font-black uppercase py-2 px-3 rounded-md transition ${selectedCat === cat.slug ? 'bg-[#fbb03b] text-black shadow-sm' : 'text-gray-400 hover:text-black hover:bg-gray-50'}`}
                        >
                          {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price */}
            <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-gray-400">
                   <MdOutlineAttachMoney size={12}/> Price Range
                </h4>
                <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="number" placeholder="Min" className="filter-input-compact" 
                      value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input 
                      type="number" placeholder="Max" className="filter-input-compact" 
                      value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>

            <button 
              onClick={clearFilters}
              className="w-full py-3 rounded-xl border border-gray-200 text-[8px] font-black uppercase tracking-widest text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
            >
                Reset Filters
            </button>
          </div>
        </aside>

        {/* --- 3. MAIN CONTENT AREA --- */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.2em]">{products.length} Items Found</p>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
               <button 
                 onClick={() => setShowMobileFilters(true)}
                 className="lg:hidden flex-1 border border-gray-200 py-2 rounded-lg flex items-center justify-center gap-2 font-black text-[9px] uppercase tracking-widest"
               >
                 <MdOutlineFilterList size={16}/> Filters
               </button>

               <select 
                 value={sortOption}
                 onChange={(e) => setSortOption(e.target.value)}
                 className="flex-1 sm:w-40 border border-gray-200 px-3 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest bg-white focus:border-[#fbb03b] outline-none cursor-pointer shadow-sm"
               >
                 <option value="-created_at">Newest First</option>
                 <option value="price">Price: Low to High</option>
                 <option value="-price">Price: High to Low</option>
                 <option value="name">Alphabetical</option>
               </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
             <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
                {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="bg-gray-100 aspect-[4/5] rounded-3xl"></div>
                ))}
             </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
               {products.map(product => (
                 <ProductCard key={product.id} product={product} />
               ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
               <h3 className="text-sm font-black uppercase italic text-gray-300 tracking-widest">No Results Found</h3>
               <button onClick={clearFilters} className="mt-2 text-[#fbb03b] font-bold text-[10px] underline uppercase">Clear Filters</button>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .filter-input-compact {
          width: 100%;
          background: white;
          border: 1px solid #e5e7eb;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 10px;
          font-weight: 800;
          outline: none;
        }
        .filter-input-compact:focus {
          border-color: #fbb03b;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fbb03b;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default Shop;