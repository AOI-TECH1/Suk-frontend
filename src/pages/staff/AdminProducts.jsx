import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Package, ShieldAlert, Star, Trash2, Search, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchAllProducts(); }, []);

  const fetchAllProducts = async () => {
    try {
      const res = await api.get('/products/');
      setProducts(res.data.results || res.data);
    } catch (err) { toast.error("Inventory sync failed"); }
    finally { setLoading(false); }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await api.patch(`/products/${id}/`, { status: newStatus });
      toast.success(`Product ${newStatus}`);
      fetchAllProducts();
    } catch (err) { toast.error("Update failed"); }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="pt-40 text-center"><Loader2 className="animate-spin mx-auto text-[#fbb03b]" /></div>;

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans">
      <Link to="/staff/dashboard" className="inline-flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase mb-10"><ArrowLeft size={14}/> Dashboard</Link>
      
      <div className="flex justify-between items-end mb-12">
        <h1 className="text-4xl font-[900]  uppercase tracking-tighter">Marketplace <span className="text-[#fbb03b]">Vault</span></h1>
        <input placeholder="Search SKU..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-white border border-gray-100 rounded-2xl py-3 px-6 text-xs font-bold outline-none focus:border-[#fbb03b]" />
      </div>

      <div className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-zinc-950 text-white">
            <tr className="text-[9px] font-black uppercase tracking-widest">
              <th className="px-10 py-5">Product/Seller</th>
              <th className="px-10 py-5">Pricing</th>
              <th className="px-10 py-5">Status</th>
              <th className="px-10 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <img src={p.main_image} className="w-12 h-12 object-cover rounded-xl border border-gray-100" />
                    <div>
                      <p className="font-black text-sm text-zinc-900">{p.name}</p>
                      <p className="text-[9px] font-bold text-[#fbb03b] uppercase">Owner: {p.seller?.full_name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6 font-black text-sm text-zinc-900">₦{parseFloat(p.price).toLocaleString()}</td>
                <td className="px-10 py-6">
                  <span className={`text-[8px] font-black px-2 py-1 rounded uppercase ${p.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{p.status}</span>
                </td>
                <td className="px-10 py-6 text-right space-x-2">
                   <button onClick={() => toggleStatus(p.id, p.status)} className="p-2 bg-gray-50 rounded-lg hover:bg-zinc-900 hover:text-white transition-all"><ShieldAlert size={14}/></button>
                   <button className="p-2 bg-gray-50 rounded-lg text-gray-300 hover:text-red-500"><Trash2 size={14}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;