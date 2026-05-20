import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { ShoppingCart, Eye, Clock, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/'); // Assuming platform-wide order endpoint
      setOrders(res.data.results || res.data);
    } catch (err) { toast.error("Order database offline"); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="pt-40 text-center"><Loader2 className="animate-spin mx-auto text-[#fbb03b]" /></div>;

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans">
      <Link to="/staff/dashboard" className="inline-flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase mb-10"><ArrowLeft size={14}/> Dashboard</Link>
      <h1 className="text-4xl font-[900] italic uppercase tracking-tighter mb-12">Global <span className="text-[#fbb03b]">Logistics</span></h1>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-950 text-white">
            <tr className="text-[9px] font-black uppercase tracking-widest">
              <th className="px-10 py-5">Order ID</th>
              <th className="px-10 py-5">Customer</th>
              <th className="px-10 py-5">Total</th>
              <th className="px-10 py-5">Status</th>
              <th className="px-10 py-5 text-right">Ops</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-10 py-6 font-black text-sm">#SK-{order.id}</td>
                <td className="px-10 py-6">
                  <p className="font-bold text-xs text-zinc-900">{order.user?.full_name}</p>
                </td>
                <td className="px-10 py-6 font-black text-sm">₦{parseFloat(order.total_amount).toLocaleString()}</td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase px-2 py-1 rounded bg-zinc-100 text-zinc-500 w-fit">
                    <Clock size={10} /> {order.status}
                  </div>
                </td>
                <td className="px-10 py-6 text-right">
                  <button className="p-2 bg-gray-50 rounded-lg hover:bg-[#fbb03b] transition-all"><Eye size={14}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;