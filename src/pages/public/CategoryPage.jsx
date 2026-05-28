import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import api from '../../api/axios';
import ProductCard from '../../components/public/ProductCard';

const CategoryPage = () => {
  const { slug } = useParams(); // Gets the category name from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        // We filter the products by category slug using Django's filter backend
        const res = await api.get(`/products/?category__slug=${slug}`);
        const data = res.data.results ? res.data.results : res.data;
        setProducts(data);
      } catch (err) {
        console.error("Error loading category", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [slug]);

  return (
    <div className="pt-32 pb-20 bg-[#fcfcfc] min-h-screen">
      
      {/* 1. CATEGORY HEADER BANNER */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
          <Link to="/" className="hover:text-[#fbb03b]">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-[#fbb03b]">Marketplace</Link>
          <ChevronRight size={12} />
          <span className="text-black">{slug.replace('-', ' ')}</span>
        </nav>
        
        <h1 className="text-5xl font-[900] uppercase  tracking-tighter text-zinc-900 border-l-8 border-[#fbb03b] pl-6">
            {slug.replace('-', ' ')}
        </h1>
      </div>

      {/* 2. PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-pulse">
            {[1,2,3,4].map(i => <div key={i} className="aspect-[4/5] bg-gray-100 rounded-[40px]"></div>)}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-gray-100">
             <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
             <h3 className="font-black uppercase  text-gray-400">No items in this category yet</h3>
             <Link to="/shop" className="mt-4 inline-block text-[#fbb03b] font-bold underline">Browse All Categories</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;