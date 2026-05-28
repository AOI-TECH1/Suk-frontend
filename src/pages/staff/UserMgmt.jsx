import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, ShieldCheck, Trash2, Loader2, 
  ArrowLeft, UserMinus, UserPlus, X,
  Ban, ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllUsers, toggleUserStatus, createStaffAccount, deleteUserAdmin } from '../../api/adminApi';
import toast from 'react-hot-toast';

const UserManagement = () => {
  // 1. STATE
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newStaff, setNewStaff] = useState({ full_name: '', email: '', password: '', role: 'MANAGER' });

  useEffect(() => { fetchUsers(); }, []);

  // 2. FETCH DATA (Fixed extraction to prevent crash)
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      let data = [];
      
      if (res.data && res.data.results) {
        data = res.data.results;
      } else if (Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data && typeof res.data === 'object') {
        data = [res.data]; // Wrap single object in array
      }
      
      setUsers(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Auth database sync failed.");
      setUsers([]); 
    } finally {
      setLoading(false);
    }
  };

  // 3. ACTION HANDLERS
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleUserStatus(id, !currentStatus);
      toast.success(currentStatus ? "Identity Restricted" : "Identity Reactivated");
      fetchUsers(); // Live Refresh
    } catch (err) { 
        toast.error(err.response?.data?.detail || "State change failed.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("CRITICAL: Purge this identity? This action is permanent.")) {
      try {
        await deleteUserAdmin(id);
        toast.success("Identity Purged");
        fetchUsers(); 
      } catch (err) { toast.error("System restricted deletion."); }
    }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createStaffAccount(newStaff);
      toast.success(`${newStaff.role} Deployed!`);
      setShowAddModal(false);
      setNewStaff({ full_name: '', email: '', password: '', role: 'MANAGER' });
      fetchUsers(); 
    } catch (err) {
      toast.error(err.response?.data?.email ? "Email already exists." : "Deployment failed.");
    } finally { setIsSubmitting(false); }
  };

  // 4. FILTERING
  const filtered = useMemo(() => {
    return users.filter(u => {
      const name = u.full_name?.toLowerCase() || "";
      const email = u.email?.toLowerCase() || "";
      const matchesSearch = name.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#fbb03b]" size={40} />
    </div>
  );

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans bg-[#fcfcfc] min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
        <div>
           <Link to="/staff/dashboard" className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase mb-4 hover:text-black transition-colors"><ArrowLeft size={14}/> Command Center</Link>
           <h1 className="text-5xl font-[900]  uppercase tracking-tighter text-zinc-900 leading-none">Identity <span className="text-[#fbb03b]">Control</span></h1>
           <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3">Auth Database Management • {users.length} Active Nodes</p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <button onClick={() => setShowAddModal(true)} className="bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-[900] uppercase tracking-widest hover:bg-[#fbb03b] hover:text-black transition-all flex items-center gap-3 shadow-xl">
                <UserPlus size={18} strokeWidth={3}/> Deploy Personnel
            </button>
            <select value={roleFilter} onChange={(e)=>setRoleFilter(e.target.value)} className="bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 text-[10px] font-black uppercase outline-none shadow-sm">
                <option value="ALL">All Levels</option>
                <option value="ADMIN">Admins</option>
                <option value="MANAGER">Managers</option>
                <option value="SELLER">Merchants</option>
                <option value="BUYER">Buyers</option>
            </select>
            <div className="relative flex-1 lg:w-80 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input placeholder="Search Record..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-xs font-bold outline-none focus:border-[#fbb03b] transition-all" />
            </div>
        </div>
      </div>

      {/* IDENTITY TABLE */}
      <div className="bg-white rounded-[50px] overflow-hidden border border-gray-100 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-950 text-white">
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-widest">Profile Instance</th>
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-widest">Authority Level</th>
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-widest">Network Status</th>
                <th className="px-10 py-6 text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-zinc-50 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-inner
                          ${u.role === 'ADMIN' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-zinc-900'}`}>
                          {u.full_name?.charAt(0) || "U"}
                      </div>
                      <div>
                          <p className="font-[900] text-sm text-zinc-900 leading-none mb-1">{u.full_name}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                     <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase border
                         ${u.role === 'ADMIN' ? 'bg-red-50 border-red-100 text-red-600' : 
                           u.role === 'SELLER' ? 'bg-[#fbb03b]/5 border-orange-100 text-orange-600' : 
                           'bg-zinc-50 border-zinc-100 text-zinc-400'}`}>
                         {u.role}
                     </span>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${u.is_active ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <span className="text-[10px] font-black uppercase text-zinc-800 tracking-widest">{u.is_active ? 'Online' : 'Restricted'}</span>
                     </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    {/* BUTTONS ALWAYS VISIBLE FOR PRESENTATION */}
                    <div className="flex justify-end gap-3">
                        <button title="Toggle Ban" onClick={() => handleToggleStatus(u.id, u.is_active)} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-black hover:shadow-md transition-all">
                             {u.is_active ? <Ban size={16}/> : <ShieldCheck size={16}/>}
                        </button>
                        <button title="Purge Record" onClick={() => handleDeleteUser(u.id)} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-600 hover:shadow-md transition-all">
                            <Trash2 size={16}/>
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DEPLOY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
            <div className="bg-white w-full max-w-xl rounded-[60px] p-12 relative shadow-2xl animate-in zoom-in-95 duration-300">
                <button onClick={() => setShowAddModal(false)} className="absolute top-10 right-10 text-gray-400 hover:text-black"><X size={32}/></button>
                <div className="mb-10">
                    <h2 className="text-4xl font-[900]  uppercase tracking-tighter">Deploy <span className="text-[#fbb03b]">Staff</span></h2>
                    <p className="text-gray-400 text-[10px] font-black uppercase mt-2 tracking-widest">Assign internal protocol permissions</p>
                </div>
                
                <form onSubmit={handleAddStaff} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <input required className="modal-input" placeholder="Name" onChange={(e)=>setNewStaff({...newStaff, full_name: e.target.value})} />
                        <select className="modal-input" onChange={(e)=>setNewStaff({...newStaff, role: e.target.value})}>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <input type="email" required className="modal-input" placeholder="Email" onChange={(e)=>setNewStaff({...newStaff, email: e.target.value})} />
                    <input type="password" required className="modal-input" placeholder="Access Key" onChange={(e)=>setNewStaff({...newStaff, password: e.target.value})} />
                    <button disabled={isSubmitting} type="submit" className="w-full bg-zinc-950 text-[#fbb03b] py-6 rounded-[30px] font-[900] uppercase tracking-[0.2em] flex justify-center shadow-2xl">
                        {isSubmitting ? <Loader2 className="animate-spin"/> : "AUTHORIZE DEPLOYMENT"}
                    </button>
                </form>
            </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .modal-input { width: 100%; background: #f9fafb; border: 2px solid #f3f4f6; padding: 1.25rem; border-radius: 2rem; font-size: 13px; font-weight: 800; outline: none; transition: all 0.3s ease; }
        .modal-input:focus { border-color: #fbb03b; background: white; }
      `}} />
    </div>
  );
};

export default UserManagement;