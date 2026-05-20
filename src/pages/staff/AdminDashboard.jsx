import React, { useState, useEffect } from 'react';
import { 
  Users, Store, ShoppingCart, ShieldCheck, 
  UserPlus, Activity, Zap, Package, 
  LayoutGrid, ChevronRight, Terminal, Globe,
  Plus, X, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

// API Imports
import { getAllUsers, createStaffAccount } from '../../api/adminApi';
import api from '../../api/axios'; 
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, sellers: 0, products: 0, orders: 0 });
  const [loading, setLoading] = useState(true);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [isSubmitting, setIsAdding] = useState(false);

  // Quick Staff Form State
  const [staffData, setStaffData] = useState({ full_name: '', email: '', password: '', role: 'MANAGER' });

  useEffect(() => { fetchSystemData(); }, []);

  const fetchSystemData = async () => {
    try {
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        getAllUsers(),
        api.get('/products/'),
        api.get('/orders/')
      ]);

      const allUsers = usersRes.data.results || usersRes.data;
      setStats({
        users: allUsers.length,
        sellers: allUsers.filter(u => u.role === 'SELLER').length,
        products: (productsRes.data.results || productsRes.data).length,
        orders: (ordersRes.data.results || ordersRes.data).length
      });
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      await createStaffAccount(staffData);
      toast.success(`${staffData.role} Deployed!`);
      setShowAddStaff(false);
      setStaffData({ full_name: '', email: '', password: '', role: 'MANAGER' });
      fetchSystemData();
    } catch (err) {
      toast.error("Deployment failed. Check credentials.");
    } finally { setIsAdding(false); }
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans bg-[#fcfcfc] min-h-screen relative">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
            <h1 className="text-5xl font-[900] italic uppercase tracking-tighter text-zinc-900 leading-none">
                SuK <span className="text-[#fbb03b]">Command</span>
            </h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mt-4 ml-1 italic">Level 4 Admin Authorization Active</p>
        </div>

        <div className="flex items-center gap-4">
            <button 
                onClick={() => setShowAddStaff(true)}
                className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-[900] text-[10px] uppercase tracking-widest hover:bg-[#fbb03b] hover:text-black transition-all shadow-xl"
            >
                <UserPlus size={16} strokeWidth={3} /> Deploy New Staff
            </button>
        </div>
      </div>

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatTile title="Identity Database" value={stats.users} sub="Registrations" icon={<Users />} color="bg-blue-600" />
        <StatTile title="Verified Nodes" value={stats.sellers} sub="Live Merchants" icon={<Store />} color="bg-orange-500" />
        <StatTile title="Market Vault" value={stats.products} sub="Active Listings" icon={<Package />} color="bg-purple-600" />
        <StatTile title="Order Stream" value={stats.orders} sub="Total Volume" icon={<ShoppingCart />} color="bg-green-600" />
      </div>

      {/* 3. DIRECT MANAGEMENT HUB */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ManagementCard title="User Control" desc="Ban, Verify or Edit User Access" link="/staff/users" icon={<ShieldCheck size={32}/>} count={`${stats.users} Users`} />
            <ManagementCard title="Merchant Desk" desc="Audit Stores & Bank Payouts" link="/staff/merchants" icon={<Globe size={32}/>} count={`${stats.sellers} Sellers`} />
            <ManagementCard title="Order Logs" desc="Track Logistics & Payments" link="/staff/orders" icon={<ShoppingCart size={32}/>} count={`${stats.orders} Orders`} />
            <ManagementCard title="Product Vault" desc="Moderate & Feature Items" link="/staff/products" icon={<Package size={32}/>} count={`${stats.products} Items`} />
        </div>

        {/* 4. SYSTEM ACTIVITY & ADs */}
        <div className="space-y-8">
            <div className="bg-zinc-950 rounded-[50px] p-10 text-white shadow-2xl relative overflow-hidden">
                <h3 className="font-[900] text-2xl uppercase italic leading-none mb-6 text-[#fbb03b]">System Ops</h3>
                <div className="space-y-4">
                    <SideLink label="Banner Ad Manager" to="/staff/ads" />
                    <SideLink label="Staff Hierarchy" to="/staff/users" />
                    <div className="mt-10 p-6 bg-white/5 rounded-3xl border border-white/10">
                        <p className="text-[10px] font-black uppercase text-gray-500">Security Warning</p>
                        <p className="text-[11px] leading-relaxed text-gray-400 mt-2">All administrative actions are permanently recorded in the system audit log.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- QUICK DEPLOY STAFF MODAL --- */}
      {showAddStaff && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowAddStaff(false)}></div>
            <div className="bg-white w-full max-w-lg rounded-[50px] p-12 relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
                <button onClick={() => setShowAddStaff(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black"><X/></button>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Deploy Staff Account</h2>
                
                <form onSubmit={handleAddStaff} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <input name="name" required placeholder="Full Name" className="modal-input" value={staffData.full_name} onChange={(e)=>setStaffData({...staffData, full_name: e.target.value})} />
                        <select className="modal-input" value={staffData.role} onChange={(e)=>setStaffData({...staffData, role: e.target.value})}>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <input type="email" required placeholder="Staff Email" className="modal-input" value={staffData.email} onChange={(e)=>setStaffData({...staffData, email: e.target.value})} />
                    <input type="password" required placeholder="Secret Access Key" className="modal-input" value={staffData.password} onChange={(e)=>setStaffData({...staffData, password: e.target.value})} />
                    
                    <button disabled={isSubmitting} type="submit" className="w-full bg-black text-[#fbb03b] py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-[#fbb03b] hover:text-black transition-all flex justify-center">
                        {isSubmitting ? <Loader2 className="animate-spin"/> : "AUTHORIZE & DEPLOY"}
                    </button>
                </form>
            </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .modal-input {
            width: 100%;
            background: #f9fafb;
            border: 2px solid #f3f4f6;
            padding: 1rem 1.5rem;
            border-radius: 1.5rem;
            font-size: 0.875rem;
            font-weight: 700;
            outline: none;
        }
        .modal-input:focus { border-color: #fbb03b; background: white; }
      `}} />
    </div>
  );
};

// ... Sub-components (StatTile, ManagementCard, SideLink) remain same as previous version
const StatTile = ({ title, value, sub, icon, color }) => (
    <div className="bg-white border border-gray-100 p-8 rounded-[45px] shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
        <div className={`absolute -right-6 -bottom-6 w-32 h-32 ${color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-1000`}></div>
        <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className={`${color} p-3 rounded-2xl text-white shadow-lg`}>{icon}</div>
            <p className="text-[10px] font-[900] uppercase tracking-[0.2em] text-gray-400">{title}</p>
        </div>
        <h3 className="text-5xl font-[900] text-zinc-900 tracking-tighter leading-none mb-1 relative z-10">{value}</h3>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest relative z-10">{sub}</p>
    </div>
);

const ManagementCard = ({ title, desc, link, icon, count }) => (
    <Link to={link} className="bg-white border border-gray-100 p-10 rounded-[50px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
        <div className="flex justify-between items-start mb-10">
            <div className="text-[#fbb03b] group-hover:scale-110 transition-transform duration-700">{icon}</div>
            <span className="text-[9px] font-black text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full uppercase tracking-widest">{count}</span>
        </div>
        <h4 className="font-[900] text-2xl uppercase italic text-zinc-900 leading-none mb-3">{title}</h4>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-relaxed pr-10">{desc}</p>
        <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#fbb03b] group-hover:gap-4 transition-all">
            Access Portal <ChevronRight size={14} strokeWidth={3} />
        </div>
    </Link>
);

const SideLink = ({ label, to }) => (
    <Link to={to} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-[#fbb03b] hover:text-black transition-all group">
        <span className="text-[10px] font-[900] uppercase tracking-widest">{label}</span>
        <ChevronRight size={14} className="opacity-40 group-hover:translate-x-1 transition-transform" />
    </Link>
);

export default AdminDashboard;