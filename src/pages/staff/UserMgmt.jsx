import React from 'react';
import { Search, MoreVertical, ShieldCheck, ShieldAlert } from 'lucide-react';

const UserManagement = () => {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
           <h1 className="text-4xl font-black italic uppercase tracking-tighter">User Management</h1>
           <p className="text-gray-500 font-medium">Control permissions and monitor community members.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <input className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#fbb03b] font-bold" placeholder="Search by email or name..." />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
              <th className="px-8 py-6">Member</th>
              <th className="px-8 py-6">Role</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Settings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map(user => (
              <tr key={user} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#fbb03b] font-black">A</div>
                      <div>
                        <p className="text-sm font-black text-zinc-900">Azeez Sodiq</p>
                        <p className="text-xs text-gray-400 font-medium">azeezsodiq18@gmail.com</p>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Merchant</span>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2 text-green-600">
                      <ShieldCheck size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                   </div>
                </td>
                <td className="px-8 py-6 text-right">
                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><MoreVertical size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;