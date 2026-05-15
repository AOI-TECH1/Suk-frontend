import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}/`);
        setProduct(res.data);
      } catch (err) { toast.error("Product not found"); }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="h-screen flex items-center justify-center animate-pulse text-gray-400">Loading Product...</div>;

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT: IMAGE GALLERY */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100 shadow-inner">
            <img src={product.image || "https://placehold.co/600x600"} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={product.name} />
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="flex flex-col">
          <div className="border-b border-gray-100 pb-8 mb-8">
            <p className="text-[#fbb03b] font-black uppercase tracking-widest text-xs mb-3">{product.category_name}</p>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-4 italic">{product.name}</h1>
            <div className="flex items-center gap-4">
               <span className="text-3xl font-black">₦{Number(product.price).toLocaleString()}</span>
               <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">In Stock</span>
            </div>
          </div>

          <p className="text-gray-500 leading-relaxed mb-8 font-medium">{product.description}</p>

          {/* ACTIONS */}
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-4">
               <div className="flex items-center border-2 border-gray-100 rounded-2xl overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 py-4 hover:bg-gray-50 font-black">-</button>
                  <span className="px-6 font-black">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-6 py-4 hover:bg-gray-50 font-black">+</button>
               </div>
               <button className="flex-1 bg-black text-[#fbb03b] font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all shadow-xl active:scale-95">
                 <ShoppingCart size={20} /> ADD TO CART
               </button>
            </div>
            <button className="w-full border-2 border-gray-100 font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <Heart size={20} /> ADD TO WISHLIST
            </button>
          </div>

          {/* TRUST BADGES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
             <Badge icon={<Truck size={18}/>} text="Fast Delivery" />
             <Badge icon={<RotateCcw size={18}/>} text="7 Days Return" />
             <Badge icon={<ShieldCheck size={18}/>} text="Secure Pay" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
    <span className="text-zinc-900">{icon}</span> {text}
  </div>
);

export default ProductDetail;