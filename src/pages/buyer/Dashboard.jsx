import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Heart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const BuyerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <h1 className="text-4xl font-black mb-2 italic uppercase">My Account</h1>
      <p className="text-gray-500 font-medium mb-12">Hello, {user?.full_name}! Welcome to your personal shopper dashboard.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <DashboardCard title="Orders" icon={<ShoppingBag />} link="/buyer/orders" count="2" />
        <DashboardCard title="Wishlist" icon={<Heart />} link="/wishlist" count="5" />
        <DashboardCard title="Settings" icon={<Settings />} link="/buyer/settings" />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, icon, link, count }) => (
  <Link to={link} className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all group">
    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#fbb03b] group-hover:text-white transition-colors">
      {icon}
    </div>
    <div className="flex justify-between items-end">
      <div>
        <h3 className="text-xl font-black uppercase tracking-tight">{title}</h3>
        <p className="text-xs text-gray-400 font-bold uppercase mt-1">Manage {title}</p>
      </div>
      {count && <span className="text-3xl font-black text-gray-100 group-hover:text-[#fbb03b] transition-colors">{count}</span>}
    </div>
  </Link>
);

export default BuyerDashboard;