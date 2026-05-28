import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { Save, UserCircle } from 'lucide-react';

const BuyerSettings = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    phone_no: user?.phone_no || '',
    state: user?.state || '',
    Area: user?.Area || '',
    address: user?.address || ''
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch('/auth/user/', formData);
      setUser(res.data);
      toast.success("Profile updated!");
    } catch (err) { toast.error("Failed to update."); }
  };

  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-6">
      <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100">
        <div className="flex items-center gap-4 mb-10">
           <div className="w-16 h-16 bg-[#fbb03b] rounded-2xl flex items-center justify-center text-black font-black text-2xl ">
              {user?.full_name?.charAt(0)}
           </div>
           <div>
              <h2 className="text-3xl font-black  uppercase tracking-tighter">Account Settings</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Manage your profile info</p>
           </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8">
           <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
              <input value={formData.full_name} className="set-input" onChange={e => setFormData({...formData, full_name: e.target.value})} />
           </div>

           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone</label>
                <input value={formData.phone_no} className="set-input" onChange={e => setFormData({...formData, phone_no: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">State</label>
                <input value={formData.state} className="set-input" onChange={e => setFormData({...formData, state: e.target.value})} />
              </div>
           </div>

           <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Delivery Address</label>
              <textarea value={formData.address} className="set-input h-24 resize-none" onChange={e => setFormData({...formData, address: e.target.value})} />
           </div>

           <button className="w-full bg-black text-[#fbb03b] font-black py-5 rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:bg-zinc-800 transition-all">
             <Save size={18} /> SAVE CHANGES
           </button>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `.set-input { width: 100%; border-bottom: 2px solid #f3f4f6; padding: 0.8rem 0.2rem; outline: none; font-weight: 600; background: transparent; transition: border-color 0.3s; } .set-input:focus { border-color: #fbb03b; }` }} />
    </div>
  );
};

export default BuyerSettings;