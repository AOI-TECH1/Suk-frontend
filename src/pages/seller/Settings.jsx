import React, { useState, useEffect } from 'react';
import { getStoreDetails, updateStoreDetails } from '../../api/sellerApi';
import { useAuth } from '../../context/AuthContext';
import { Store, Landmark, Upload, Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const SellerSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [formData, setFormData] = useState({
    store_name: '',
    store_description: '',
    business_address: '',
    bank_name: '',
    account_number: '',
    account_name: '',
  });
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = async () => {
    try {
      const res = await getStoreDetails();
      setFormData(res.data);
      if (res.data.logo) setLogoPreview(res.data.logo);
    } catch (err) {
      toast.error("Failed to load store data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (logoFile) data.append('logo', logoFile);

    try {
      await updateStoreDetails(data);
      toast.success("Store Profile Updated!");
    } catch (err) {
      toast.error("Update failed.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="pt-40 text-center"><Loader2 className="animate-spin mx-auto text-[#fbb03b]" /></div>;

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-6 font-sans">
      <div className="mb-12">
        <h1 className="text-4xl font-[900]  uppercase tracking-tighter text-zinc-900">Settings</h1>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Manage your brand and settlements</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT: Logo & Identity */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-gray-100 p-8 rounded-[45px] shadow-sm">
                <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-4">
                    <Store className="text-[#fbb03b]" size={20} />
                    <h3 className="font-black uppercase  text-sm tracking-widest">Store Identity</h3>
                </div>
                
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="relative group w-32 h-32 flex-shrink-0">
                        <div className="w-full h-full bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100 overflow-hidden flex items-center justify-center">
                            {logoPreview ? (
                                <img src={logoPreview} className="w-full h-full object-contain" />
                            ) : (
                                <Upload className="text-gray-300" />
                            )}
                        </div>
                        <input type="file" onChange={handleLogoChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <p className="text-[8px] text-center font-black uppercase mt-2 text-gray-400">Change Logo</p>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Store Name</label>
                            <input 
                                value={formData.store_name}
                                onChange={(e) => setFormData({...formData, store_name: e.target.value})}
                                className="w-full bg-zinc-50 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-[#fbb03b] outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Store Biography</label>
                            <textarea 
                                value={formData.store_description}
                                onChange={(e) => setFormData({...formData, store_description: e.target.value})}
                                className="w-full bg-zinc-50 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-[#fbb03b] outline-none h-24 resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button disabled={updating} type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#fbb03b] hover:text-black transition-all flex items-center justify-center gap-3">
               {updating ? <Loader2 className="animate-spin" /> : <><Save size={18}/> Commit Changes</>}
            </button>
        </div>

        {/* RIGHT: Payout Settings */}
        <div className="space-y-8">
            <div className="bg-white border border-gray-100 p-8 rounded-[45px] shadow-sm">
                <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-4">
                    <Landmark className="text-[#fbb03b]" size={20} />
                    <h3 className="font-black uppercase  text-sm tracking-widest">Settlements</h3>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Bank Name</label>
                        <input 
                            value={formData.bank_name}
                            onChange={(e) => setFormData({...formData, bank_name: e.target.value})}
                            placeholder="e.g. Access Bank"
                            className="w-full bg-zinc-50 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-[#fbb03b] outline-none"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Account Number</label>
                        <input 
                            value={formData.account_number}
                            onChange={(e) => setFormData({...formData, account_number: e.target.value})}
                            className="w-full bg-zinc-50 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-[#fbb03b] outline-none"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Account Name</label>
                        <input 
                            value={formData.account_name}
                            onChange={(e) => setFormData({...formData, account_name: e.target.value})}
                            className="w-full bg-zinc-50 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-[#fbb03b] outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-[#fbb03b]/5 border border-[#fbb03b]/10 p-6 rounded-[32px]">
                <p className="text-[10px] font-bold leading-relaxed text-zinc-600 ">
                    Funds are automatically settled to this account within 48 hours of successful delivery.
                </p>
            </div>
        </div>
      </form>
    </div>
  );
};

export default SellerSettings;