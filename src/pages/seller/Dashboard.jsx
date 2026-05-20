import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, Package, DollarSign, ShoppingCart, 
  TrendingUp, Settings, ExternalLink, AlertCircle,
  ChevronRight, ArrowUpRight, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStoreDetails } from '../../api/authApi';
import { getSellerProducts } from '../../api/sellerApi';
import { useAuth } from '../../context/AuthContext';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [storeRes, productsRes] = await Promise.all([
            getStoreDetails(),
            getSellerProducts()
        ]);
        setStore(storeRes.data);
        setProducts(productsRes.data.results || productsRes.data);
      } catch (err) {
        console.error("Dashboard Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-[#fbb03b]" size={40} />
            <p className="font-black uppercase italic text-xs tracking-widest text-gray-400">Loading Command Center...</p>
        </div>
    </div>
  );

  const activeProductCount = products.length;
  const productLimit = store?.subscription_plan === 'PRO' ? 100 : 10;
  const usagePercentage = Math.min((activeProductCount / productLimit) * 100, 100);

  const recentOrders = [
    { id: '#SK-9921', customer: 'Amaka J.', total: '₦45,000', status: 'Pending' },
    { id: '#SK-9918', customer: 'Ibrahim K.', total: '₦12,200', status: 'Shipped' },
  ];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans bg-[#fcfcfc]">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl md:text-5xl font-[900] italic uppercase tracking-tighter text-zinc-900">
              Merchant <span className="text-[#fbb03b]">Center</span>
            </h1>
            <span className="bg-[#fbb03b] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {store?.subscription_plan || 'FREE TIER'}
            </span>
          </div>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">
            Store: <span className="text-zinc-900">{store?.store_name || "Official Merchant"}</span>
          </p>
        </div>

        <div className="flex gap-3">
            {/* FIXED LINK: Point to seller settings */}
            <Link to="/seller/settings" className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all">
                <Settings size={20} className="text-gray-400" />
            </Link>
            <Link to="/seller/add-product" className="bg-black text-white font-black px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl hover:bg-[#fbb03b] hover:text-black transition-all group">
                <PlusCircle size={20} /> 
                <span className="uppercase tracking-widest text-[10px]">Add Product</span>
            </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Revenue" value="₦0.00" trend="0%" icon={<DollarSign />} color="bg-green-500" />
        <StatCard title="Active Items" value={activeProductCount} trend="Live" icon={<Package />} color="bg-blue-500" />
        <StatCard title="Views" value="0" trend="0%" icon={<TrendingUp />} color="bg-orange-500" />
        <StatCard title="Orders" value="0" trend="New" icon={<ShoppingCart />} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-950 p-10 rounded-[45px] text-white relative overflow-hidden border border-white/5">
                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Inventory Usage</h3>
                            <p className="text-gray-500 text-[10px] font-black mt-1 uppercase tracking-widest">
                                Tier Limit: {productLimit} Products
                            </p>
                        </div>
                        <p className="text-3xl font-black text-[#fbb03b] leading-none">
                            {activeProductCount} <span className="text-white text-sm">/ {productLimit}</span>
                        </p>
                    </div>
                    <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#fbb03b] transition-all duration-1000 ease-out" 
                          style={{ width: `${usagePercentage}%` }}
                        ></div>
                    </div>
                    <Link to="/pricing" className="inline-block mt-8 text-[9px] font-black uppercase text-[#fbb03b] border-b-2 border-[#fbb03b]/20 pb-1 hover:border-[#fbb03b] transition-all tracking-[0.2em]">
                        Upgrade Tier for unlimited uploads →
                    </Link>
                </div>
                <Package className="absolute -right-12 -bottom-12 text-white/5 w-60 h-60 rotate-12" />
            </div>

            <div className="bg-white border border-gray-100 rounded-[45px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-black text-lg uppercase italic tracking-tighter text-zinc-900">Incoming Orders</h3>
                    {/* FIXED LINK */}
                    <Link to="/buyer/orders" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">Manage All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-zinc-50">
                                <th className="px-8 py-4 text-[10px] font-black uppercase text-gray-400">Order ID</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase text-gray-400">Customer</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase text-gray-400">Status</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase text-gray-400"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentOrders.length > 0 ? recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6 font-black text-sm">{order.id}</td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-bold">{order.customer}</td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${
                                            order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <ArrowUpRight size={18} className="text-gray-300" />
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-10 text-gray-300 font-bold italic">No active orders yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            <div className="bg-white border border-gray-100 p-10 rounded-[50px] shadow-sm">
                <h3 className="font-black text-lg uppercase italic tracking-tighter mb-8 border-b border-gray-50 pb-4">Store Overview</h3>
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden">
                         {store?.logo ? (
                            <img src={store.logo} className="w-full h-full object-contain" />
                         ) : (
                            <ImageIcon className="text-gray-200" size={32} />
                         )}
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase text-zinc-900 leading-tight">{store?.store_name || "Merchant"}</p>
                        <p className="text-[9px] font-black text-green-600 uppercase tracking-widest mt-1">Verified SuK Vendor</p>
                    </div>
                </div>
                <div className="space-y-3">
                    {/* FIXED LINKS */}
                    <QuickLink label="Manage Products" to="/seller/products" />
                    <QuickLink label="Payout Settings" to="/seller/settings" />
                    {/* CRITICAL FIXED LINK: Points to your new public storefront mini-site */}
                    <QuickLink label="Public Storefront" to={`/store/${store?.store_name}`} />
                </div>
            </div>

            <div className="bg-gradient-to-br from-[#fbb03b] to-orange-500 p-10 rounded-[50px] text-black shadow-xl shadow-orange-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <AlertCircle size={24} strokeWidth={3} />
                    <h3 className="font-black text-xs uppercase tracking-widest">Growth Tip</h3>
                </div>
                <p className="text-xs font-bold leading-relaxed opacity-80 uppercase tracking-wider">
                    Add clear <span className="font-black text-black underline">Specifications</span> to your products to help buyers find them via search filters.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

// HELPER COMPONENTS (Keep these as they are)
const StatCard = ({ title, value, trend, icon, color }) => (
  <div className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg ${color}`}>
      {icon}
    </div>
    <div className="flex justify-between items-end">
        <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-3xl font-[900] text-zinc-900 leading-none">{value}</h3>
        </div>
        <div className="text-right">
            <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg leading-none">
                {trend}
            </span>
        </div>
    </div>
  </div>
);

const QuickLink = ({ label, to }) => (
    <Link to={to} className="flex justify-between items-center p-4 rounded-2xl hover:bg-zinc-50 transition-all group border border-transparent hover:border-zinc-100">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-black">{label}</span>
        <ChevronRight size={14} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
    </Link>
);

const ImageIcon = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
);

export default SellerDashboard;