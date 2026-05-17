import React from 'react';
import { Users, Store, ShoppingCart, BarChart3, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans">
      <div className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-zinc-900">Admin Command Center</h1>
        <p className="text-gray-500 font-medium">Global marketplace overview and system health.</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatBlock title="Total Users" value="1,284" icon={<Users size={20}/>} trend="+12%" color="bg-blue-500" />
        <StatBlock title="Total Stores" value="156" icon={<Store size={20}/>} trend="+5%" color="bg-[#fbb03b]" />
        <StatBlock title="Total Orders" value="4,829" icon={<ShoppingCart size={20}/>} trend="+18%" color="bg-green-500" />
        <StatBlock title="Revenue" value="₦2.4M" icon={<BarChart3 size={20}/>} trend="+22%" color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT ACTIVITY TABLE */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl">
           <h3 className="font-black text-xl mb-6 uppercase italic">Recent System Logs</h3>
           <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                   <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight">New Merchant Registered</p>
                        <p className="text-xs text-gray-400 font-medium">Aliko Gadget Store joined the network</p>
                      </div>
                   </div>
                   <span className="text-[10px] font-black text-gray-300 uppercase">2 mins ago</span>
                </div>
              ))}
           </div>
        </div>

        {/* NOTIFICATIONS / ALERTS */}
        <div className="bg-zinc-900 text-white rounded-[32px] p-8 shadow-2xl">
           <div className="flex items-center gap-2 mb-8 text-[#fbb03b]">
              <AlertCircle size={20} />
              <h3 className="font-black text-lg uppercase italic">Action Required</h3>
           </div>
           <div className="space-y-6">
              <p className="text-xs font-bold text-gray-400 leading-relaxed">There are <span className="text-white">14 pending store verifications</span> that need your approval.</p>
              <button className="w-full bg-[#fbb03b] text-black font-black py-4 rounded-2xl text-xs uppercase tracking-widest hover:bg-white transition-all">
                Review Requests
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatBlock = ({ title, value, icon, trend, color }) => (
  <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] -mr-8 -mt-8 rounded-full group-hover:scale-110 transition-transform duration-500`}></div>
    <div className="flex items-center gap-3 text-gray-400 mb-4">
       <span className={`${color} text-white p-2 rounded-xl`}>{icon}</span>
       <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
    </div>
    <div className="flex items-end justify-between">
       <h3 className="text-3xl font-black text-zinc-900">{value}</h3>
       <span className="text-xs font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg">{trend}</span>
    </div>
  </div>
);

export default AdminDashboard;