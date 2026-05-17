import React, { useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const [formData, setFormData] = useState({ name: '', price: '', description: '', category: '' });
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      await api.post('/products/', data);
      toast.success("Product Added Successfully!");
    } catch (err) { toast.error("Error adding product."); }
  };

  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
       <div className="bg-white p-10 rounded-[40px] shadow-2xl">
          <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">List New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input placeholder="Product Name" className="setup-input" onChange={e => setFormData({...formData, name: e.target.value})} />
            <div className="grid grid-cols-2 gap-6">
               <input placeholder="Price (₦)" type="number" className="setup-input" onChange={e => setFormData({...formData, price: e.target.value})} />
               <input placeholder="Category" className="setup-input" onChange={e => setFormData({...formData, category: e.target.value})} />
            </div>
            <textarea placeholder="Full Description" className="setup-input h-32" onChange={e => setFormData({...formData, description: e.target.value})} />
            <div className="p-8 border-2 border-dashed border-gray-100 rounded-3xl text-center">
               <input type="file" onChange={e => setImage(e.target.files[0])} />
               <p className="text-[10px] text-gray-400 uppercase mt-2 font-black">Upload product image (Max 5MB)</p>
            </div>
            <button className="w-full bg-[#fbb03b] text-black font-black py-4 rounded-2xl shadow-xl">PUBLISH PRODUCT</button>
          </form>
       </div>
       <style dangerouslySetInnerHTML={{ __html: `.setup-input { width: 100%; border-bottom: 2px solid #f3f4f6; padding: 0.8rem 0.2rem; outline: none; font-weight: 600; }` }} />
    </div>
  );
};
export default AddProduct;