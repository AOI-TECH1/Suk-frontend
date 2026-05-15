import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/productApi';
import ProductCard from '../../components/public/homepage/HomePage_ProductCard';

const GoodsService = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getAllProducts().then(res => setProducts(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex items-center gap-4 mb-10">
         <h1 className="text-3xl font-black">All Goods & Services</h1>
         <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-bold">{products.length} Items</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {products.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
};
export default GoodsService;