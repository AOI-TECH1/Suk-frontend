import React from 'react';
import { PlusCircle, Package, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black italic uppercase">Merchant Center</h1>
          <p className="text-gray-500 font-medium mt-1">Manage your business and track sales.</p>
        </div>
        <Link to="/seller/add-product" className="bg-[#fbb03b] text-black font-black px-8 py-4 rounded-2xl flex items-center gap-2 shadow-lg hover:bg-orange-500 transition-all">
          <PlusCircle size={20} /> ADD PRODUCT
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard title="Total Sales" value="₦450,000" icon={<DollarSign />} color="text-green-600" />
        <StatCard title="Active Products" value="12" icon={<Package />} color="text-blue-600" />
        <Link to="/seller/products" className="bg-black text-white p-8 rounded-[32px] flex flex-col justify-center items-center gap-4 text-center">
             <h3 className="font-black text-xl">MANAGE INVENTORY</h3>
             <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">View all products</p>
        </Link>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-gray-50 ${color}`}>
      {icon}
    </div>
    <p className="text-xs text-gray-400 font-black uppercase tracking-widest">{title}</p>
    <h3 className="text-3xl font-black mt-1">{value}</h3>
  </div>
);

export default SellerDashboard;