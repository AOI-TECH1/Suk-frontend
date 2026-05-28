import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, Search, Edit3, Trash2, ExternalLink, 
  Package, Loader2, Download, Zap, ChevronRight 
} from 'lucide-react';
import { getSellerProducts, deleteProduct, getStoreDetails } from '../../api/sellerApi';
import toast from 'react-hot-toast';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [prodRes, storeRes] = await Promise.all([
        getSellerProducts(),
        getStoreDetails()
      ]);
      setProducts(prodRes.data.results || prodRes.data);
      setStore(storeRes.data);
    } catch (err) {
      toast.error("Inventory sync failed.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * CSV EXPORT ENGINE
   * Converts product JSON to CSV and triggers download
   */
  const handleExportCSV = () => {
    if (products.length === 0) return toast.error("No data to export");

    const headers = ["ID", "Name", "Price", "Stock", "Status", "Category"];
    const rows = products.map(p => [
      p.id,
      `"${p.name}"`,
      p.price,
      p.stock_quantity,
      p.status,
      p.category_detail?.name || "N/A"
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `SuK_Inventory_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Inventory Report Generated");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanent Action: Remove this product?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
        toast.success("SKU Deleted");
      } catch (err) {
        toast.error("Delete failed.");
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
      <Loader2 className="animate-spin text-[#fbb03b]" size={40} />
    </div>
  );

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <Package className="text-[#fbb03b]" size={28} />
              <h1 className="text-4xl font-[900]  uppercase tracking-tighter text-zinc-900">Inventory</h1>
           </div>
           <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
             Manage {products.length} live listings on <span className="text-black">{store?.subscription_plan} TIER</span>
           </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#fbb03b] transition-colors" size={18} />
                <input 
                    placeholder="Search inventory..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold outline-none focus:border-[#fbb03b] transition-all shadow-sm"
                />
            </div>
            <Link to="/seller/add-product" className="bg-[#fbb03b] text-black p-4 rounded-2xl shadow-xl hover:scale-110 transition-all">
                <PlusCircle size={24} strokeWidth={2.5} />
            </Link>
        </div>
      </div>

      {/* 2. TABLE */}
      <div className="bg-white border border-gray-100 rounded-[50px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-950 text-white">
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.2em]">Product Details</th>
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.2em]">Tier/Category</th>
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.2em]">Price</th>
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.2em]">Units</th>
                <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0 p-1">
                            <img src={product.main_image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                            <p className="font-black text-sm text-zinc-900 leading-none mb-1.5">{product.name}</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">SKU: {product.slug.split('-')[0].toUpperCase()}</p>
                        </div>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-100 px-3 py-1.5 rounded-lg">
                        {product.category_detail?.name || 'GENERIC'}
                    </span>
                  </td>
                  <td className="px-10 py-7">
                    <p className="font-black text-sm text-zinc-900">₦{parseFloat(product.price).toLocaleString()}</p>
                  </td>
                  <td className="px-10 py-7">
                    <p className={`font-black text-sm ${product.stock_quantity < 5 ? 'text-red-500' : 'text-zinc-600'}`}>
                        {product.stock_quantity}
                    </p>
                  </td>
                  <td className="px-10 py-7">
                     <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${product.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                        <span className="text-[10px] font-black uppercase text-zinc-800">{product.status}</span>
                     </div>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/product/${product.slug}`} className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-black shadow-sm"><ExternalLink size={16}/></Link>
                        <button onClick={() => handleDelete(product.id)} className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-600 shadow-sm"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
            <div className="py-40 text-center">
                <Package size={60} className="mx-auto text-gray-100 mb-6" />
                <h3 className="text-2xl font-black  uppercase tracking-tighter text-gray-300">No Listings Found</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Adjust search or add new products</p>
            </div>
        )}
      </div>

      {/* 3. ACTION BOXES */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Subscription / Promotion Card */}
          <div className="bg-zinc-950 p-10 rounded-[50px] text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={120} fill="currentColor" />
             </div>
             <div className="relative z-10">
                <h3 className="font-black text-2xl uppercase  leading-none text-[#fbb03b]">Promotion Desk</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-3 max-w-xs">
                    Current Plan: <span className="text-white">{store?.subscription_plan || 'FREE'}</span>. 
                    Upgrade to PRO for unlimited listings and prioritized search.
                </p>
                <Link to="/pricing" className="mt-8 inline-flex items-center gap-3 bg-[#fbb03b] text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
                    Upgrade Subscription <ChevronRight size={14} />
                </Link>
             </div>
          </div>

          {/* CSV Export Card */}
          <div className="bg-white border border-gray-100 p-10 rounded-[50px] flex flex-col justify-between shadow-sm relative overflow-hidden">
             <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-black text-2xl uppercase  leading-none text-zinc-900">Reports</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-3">
                        Export your entire inventory to a professional CSV file.
                    </p>
                </div>
                <div className="bg-zinc-50 p-4 rounded-3xl text-zinc-300">
                    <Download size={32} />
                </div>
             </div>
             <button 
                onClick={handleExportCSV}
                className="mt-10 border-2 border-zinc-900 text-zinc-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all flex items-center justify-center gap-3"
             >
                Download Inventory (.csv)
             </button>
          </div>

      </div>
    </div>
  );
};

export default SellerProducts;