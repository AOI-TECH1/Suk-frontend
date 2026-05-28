import React, { useState, useEffect } from 'react';
import { Users, UserPlus, ShieldCheck, Trash2, Loader2, ArrowLeft, Mail, Lock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { listStaffAccounts, createStaffAccount, deleteUserAdmin } from '../../api/adminApi';
import toast from 'react-hot-toast';

const StaffMgmt = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '', role: 'MANAGER' });

  useEffect(() => { fetchStaff(); }, []);

  const fetchStaff = async () => {
    try {
      const res = await listStaffAccounts();
      const data = Array.isArray(res.data) ? res.data : (res.data.results || []);
      setStaff(data);
    } catch (err) { toast.error("Personnel database offline"); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      await createStaffAccount(formData);
      toast.success(`${formData.role} Deployed`);
      setFormData({ full_name: '', email: '', password: '', role: 'MANAGER' });
      fetchStaff();
    } catch (err) { toast.error("Deployment failed"); }
    finally { setIsAdding(false); }
  };

  const handleRevoke = async (id) => {
    if (window.confirm("REVOKE ACCESS: Remove this staff member?")) {
      try {
        await deleteUserAdmin(id);
        setStaff(staff.filter(s => s.id !== id));
        toast.success("Personnel Decommissioned");
      } catch (err) { toast.error("Revoke failed"); }
    }
  };

  if (loading) return <div className="pt-40 text-center"><Loader2 className="animate-spin mx-auto text-[#fbb03b]" /></div>;

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans">
      <Link to="/staff/dashboard" className="inline-flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase mb-10"><ArrowLeft size={14}/> Command Center</Link>
      
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
        <div>
           <h1 className="text-5xl font-[900]  uppercase tracking-tighter text-zinc-900 leading-none mb-4">Personnel <span className="text-[#fbb03b]">Hierarchy</span></h1>
           <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] max-w-md">Authorize internal access for system managers. Every action is cryptographically logged.</p>
        </div>

        <div className="w-full lg:w-[450px] bg-white border border-gray-100 p-8 rounded-[45px] shadow-2xl relative">
            <h3 className="font-black text-sm uppercase  mb-6 flex items-center gap-2"><Zap size={16} className="text-[#fbb03b]" fill="currentColor" /> Deploy Staff</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Full Name" required value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} className="bg-gray-50 border-none rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-[#fbb03b]" />
                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="bg-gray-50 border-none rounded-xl py-3 px-4 text-[10px] font-black uppercase outline-none">
                        <option value="MANAGER">Manager</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-xs font-bold outline-none" />
                <input type="password" placeholder="Access Key" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-xs font-bold outline-none" />
                <button disabled={isAdding} className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] hover:bg-[#fbb03b] hover:text-black transition-all">
                    {isAdding ? "Deploying..." : "Authorize Identity"}
                </button>
            </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map(member => (
            <div key={member.id} className="bg-white border border-gray-100 p-8 rounded-[40px] hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${member.role === 'ADMIN' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>{member.full_name.charAt(0)}</div>
                    <span className="text-[8px] font-black px-2 py-1 rounded bg-zinc-950 text-white uppercase">{member.role}</span>
                </div>
                <h4 className="font-black text-zinc-900 uppercase  leading-none">{member.full_name}</h4>
                <p className="text-[10px] font-bold text-gray-400 mt-2">{member.email}</p>
                <button onClick={() => handleRevoke(member.id)} className="mt-8 pt-6 border-t border-gray-50 w-full flex items-center justify-between group-hover:text-red-600 transition-colors">
                    <span className="text-[9px] font-black uppercase">Revoke Access</span>
                    <Trash2 size={16} className="text-gray-300 group-hover:text-red-600" />
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default StaffMgmt;