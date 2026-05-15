import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products/my-products/').then(res => setProducts(res.data));
  }, []);

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
         <h1 className="text-4xl font-black italic uppercase tracking-tighter">My Inventory</h1>
         <Link to="/seller/add-product" className="text-xs font-black uppercase tracking-widest border-b-2 border-[#fbb03b] pb-1">Add New Item</Link>
      </div>

      <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
            <tr>
              <th className="px-8 py-6">Product</th>
              <th className="px-8 py-6">Price</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map(p => (
              <tr key={p.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <img src={p.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                    <span className="font-black text-zinc-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6 font-bold text-gray-500">₦{Number(p.price).toLocaleString()}</td>
                <td className="px-8 py-6"><span className="bg-orange-50 text-orange-600 text-[9px] font-black px-3 py-1 rounded-full uppercase">Active</span></td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-400 hover:text-black"><Eye size={18} /></button>
                    <button className="text-gray-400 hover:text-black"><Edit size={18} /></button>
                    <button className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProducts;