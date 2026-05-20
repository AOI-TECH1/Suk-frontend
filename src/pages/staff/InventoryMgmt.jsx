import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, ShieldAlert, Trash2, Package, Store, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const InventoryMgmt = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('PRODUCTS'); // Toggle between PRODUCTS and MERCHANTS

  useEffect(() => { fetchInventory(); }, [view]);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const endpoint = view === 'PRODUCTS' ? '/products/' : '/auth/seller/store/';
      const res = await api.get(endpoint);
      setItems(res.data.results || res.data);
    } catch (err) { toast.error("Sync failed"); }
    finally { setLoading(false); }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await api.patch(`/products/${id}/`, { status: currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' });
      toast.success("Terminal Updated");
      fetchInventory();
    } catch (err) { toast.error("Override failed"); }
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans">
      <div className="flex justify-between items-end mb-12">
        <div>
            <h1 className="text-4xl font-[900] italic uppercase tracking-tighter text-zinc-900">Marketplace <span className="text-[#fbb03b]">Oversight</span></h1>
            <div className="flex gap-4 mt-6">
                <button onClick={() => setView('PRODUCTS')} className={`text-[10px] font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${view === 'PRODUCTS' ? 'border-[#fbb03b] text-black' : 'border-transparent text-gray-400'}`}>Product Inventory</button>
                <button onClick={() => setView('MERCHANTS')} className={`text-[10px] font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${view === 'MERCHANTS' ? 'border-[#fbb03b] text-black' : 'border-transparent text-gray-400'}`}>Merchant Terminals</button>
            </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-[45px] overflow-hidden shadow-sm">
          {loading ? <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#fbb03b]"/></div> : (
              <table className="w-full text-left">
                  <thead className="bg-zinc-950 text-white">
                      <tr className="text-[9px] font-black uppercase tracking-widest">
                          <th className="px-10 py-6">Entity</th>
                          <th className="px-10 py-6">Ownership / Category</th>
                          <th className="px-10 py-6">Status</th>
                          <th className="px-10 py-6 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                      {items.map(item => (
                          <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                              <td className="px-10 py-6">
                                  <p className="font-black text-sm text-zinc-900">{item.name || item.store_name}</p>
                                  <p className="text-[10px] text-gray-400 font-bold uppercase">ID: {item.slug || item.id}</p>
                              </td>
                              <td className="px-10 py-6 text-xs font-bold text-gray-500">
                                  {item.seller?.email || item.user?.email || "System"}
                              </td>
                              <td className="px-10 py-6">
                                  <span className={`text-[9px] font-black px-3 py-1 rounded-md uppercase ${item.status === 'ACTIVE' || item.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                      {item.status || (item.is_active ? 'ACTIVE' : 'SUSPENDED')}
                                  </span>
                              </td>
                              <td className="px-10 py-6 text-right">
                                  <button onClick={() => handleToggleActive(item.id, item.status)} className="p-2 text-gray-300 hover:text-black transition-colors">
                                      <ShieldAlert size={18} />
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          )}
      </div>
    </div>
  );
};

export default InventoryMgmt;