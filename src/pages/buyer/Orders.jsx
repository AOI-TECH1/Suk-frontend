import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // api.get('/orders/my-orders/').then(res => setOrders(res.data));
  }, []);

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans">
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-10">Order History</h1>

      <div className="space-y-6">
        {/* Sample Order Item */}
        {[1, 2].map((order) => (
          <div key={order} className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-zinc-400">
                    <Package size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Order #SK-20942</p>
                    <h3 className="text-lg font-black italic uppercase">May 15, 2026</h3>
                    <p className="text-sm font-medium text-gray-500">2 Items • ₦92,500</p>
                  </div>
               </div>

               <div className="flex flex-col md:items-end gap-2">
                  <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full">
                    <Truck size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">In Transit</span>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest border-b border-black pb-0.5 hover:text-[#fbb03b] hover:border-[#fbb03b] transition-all">
                    View Details
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerOrders;