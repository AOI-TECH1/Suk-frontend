import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../api/adminApi';
import { ShieldCheck, UserMinus, Search, Loader2, ArrowLeft, Store, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminMerchants = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('SELLER'); // Toggle between Buyer/Seller

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data.results || res.data);
    } catch (err) { toast.error("Auth database sync failed"); }
    finally { setLoading(false); }
  };

  const filtered = users.filter(u => u.role === view);

  if (loading) return <div className="pt-40 text-center"><Loader2 className="animate-spin mx-auto text-[#fbb03b]" /></div>;

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans">
      <Link to="/staff/dashboard" className="inline-flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase mb-10"><ArrowLeft size={14}/> Dashboard</Link>
      
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-[900] italic uppercase tracking-tighter">Identity <span className="text-[#fbb03b]">Control</span></h1>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100">
           <button onClick={() => setView('SELLER')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${view === 'SELLER' ? 'bg-black text-white' : 'text-gray-400'}`}>Merchants</button>
           <button onClick={() => setView('BUYER')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${view === 'BUYER' ? 'bg-black text-white' : 'text-gray-400'}`}>Buyers</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(u => (
          <div key={u.id} className="bg-white border border-gray-100 p-8 rounded-[40px] hover:shadow-xl transition-all">
             <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center font-black text-[#fbb03b] border border-gray-100">{u.full_name.charAt(0)}</div>
                <span className="text-[8px] font-black px-2 py-1 rounded-md bg-zinc-950 text-white uppercase">{u.role}</span>
             </div>
             <h3 className="font-[900] text-zinc-900 uppercase italic text-lg leading-none">{u.full_name}</h3>
             <p className="text-[10px] font-bold text-gray-400 mt-2">{u.email}</p>
             <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase text-zinc-800">Operational</span>
                </div>
                <button className="text-gray-300 hover:text-red-600 transition-colors"><UserMinus size={16}/></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMerchants;