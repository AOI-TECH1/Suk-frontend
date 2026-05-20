import React, { useState, useEffect } from 'react';
import { Plus, Image as ImageIcon, Trash2, X, Loader2, Globe, ArrowLeft } from 'lucide-react';
import { getAllAds, createAd, deleteAd } from '../../api/adApi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdManagement = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', link: '', is_active: true });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => { fetchAds(); }, []);

  const fetchAds = async () => {
    try {
      const res = await getAllAds();
      // Handle Django pagination results
      const data = res.data.results ? res.data.results : (Array.isArray(res.data) ? res.data : []);
      setAds(data);
    } catch (err) { 
        console.error(err);
        toast.error("Ad database sync failed."); 
    } finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!imageFile) return toast.error("Campaign visual required");
    
    setIsSubmitting(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('image', imageFile);
    data.append('link', formData.link); // Mapped to link_url in serializer
    data.append('is_active', formData.is_active);

    try {
      await createAd(data);
      toast.success("Campaign Deployed!");
      setShowModal(false);
      // Reset form
      setFormData({ title: '', link: '', is_active: true });
      setImageFile(null);
      fetchAds(); // This will now work without 404
    } catch (err) { 
        console.error("Create Error:", err.response?.data);
        toast.error("Deployment failed. Check image size."); 
    } finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("CRITICAL: Decommission this campaign?")) {
        try {
            await deleteAd(id);
            setAds(ads.filter(a => a.id !== id));
            toast.success("Identity Purged");
        } catch (err) { toast.error("Action restricted"); }
    }
  };

  if (loading) return <div className="pt-40 text-center"><Loader2 className="animate-spin mx-auto text-[#fbb03b]" /></div>;

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans bg-[#fcfcfc]">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-12">
        <div>
           <Link to="/staff/dashboard" className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase mb-4 tracking-widest hover:text-black"><ArrowLeft size={14}/> Command Center</Link>
           <h1 className="text-5xl font-[900] italic uppercase tracking-tighter text-zinc-900 leading-none">Marketing <span className="text-[#fbb03b]">& Ads</span></h1>
           <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mt-4">Global Deployment Hub • {ads.length} Node(s)</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-black text-[#fbb03b] font-[900] px-10 py-5 rounded-3xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-orange-500/10 text-[10px] uppercase tracking-widest">
          <Plus size={20} strokeWidth={3}/> New Campaign
        </button>
      </div>

      {/* AD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {ads.map(ad => (
          <div key={ad.id} className="group bg-white rounded-[50px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700">
             <div className="aspect-[21/9] bg-gray-50 relative overflow-hidden">
                <img src={ad.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                <div className={`absolute top-6 left-6 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg ${ad.is_active ? 'bg-green-500' : 'bg-red-500'}`}>
                    {ad.is_active ? 'Online' : 'Restricted'}
                </div>
             </div>
             <div className="p-10 flex justify-between items-center">
                <div>
                   <h3 className="font-[900] text-2xl uppercase italic text-zinc-900 leading-none">{ad.title}</h3>
                   <div className="flex items-center gap-2 mt-3 text-gray-400">
                      <Globe size={12}/>
                      <p className="text-[10px] font-bold uppercase tracking-widest">{ad.link || 'Internal Route'}</p>
                   </div>
                </div>
                <button onClick={() => handleDelete(ad.id)} className="text-gray-300 hover:text-red-600 transition-all p-4 bg-gray-50 rounded-2xl">
                   <Trash2 size={20} />
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-zinc-950/90 backdrop-blur-md">
            <div className="bg-white w-full max-w-xl rounded-[60px] p-12 relative shadow-2xl animate-in zoom-in-95">
                <button onClick={() => setShowModal(false)} className="absolute top-10 right-10 text-gray-400 hover:text-black transition-colors"><X size={32}/></button>
                <h2 className="text-4xl font-[900] italic uppercase tracking-tighter mb-10">Deploy <span className="text-[#fbb03b]">Campaign</span></h2>
                
                <form onSubmit={handleCreate} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-gray-400 ml-4 tracking-widest">Campaign Identity</label>
                        <input required className="modal-input" placeholder="e.g. Black Friday 2024" onChange={(e)=>setFormData({...formData, title: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-gray-400 ml-4 tracking-widest">Target URL</label>
                        <input className="modal-input" placeholder="e.g. /shop or https://..." onChange={(e)=>setFormData({...formData, link: e.target.value})} />
                    </div>
                    
                    <div className="relative border-2 border-dashed border-gray-100 rounded-[32px] p-10 text-center bg-gray-50/50 hover:bg-white hover:border-[#fbb03b] transition-all cursor-pointer">
                        {imageFile ? <p className="text-xs font-black text-green-600 uppercase">File Node Ready: {imageFile.name}</p> : 
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                             <ImageIcon size={32} strokeWidth={1.5}/>
                             <p className="text-[10px] font-black uppercase tracking-widest">Upload Banner (21:9 Recommended)</p>
                        </div>}
                        <input type="file" required accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e)=>setImageFile(e.target.files[0])} />
                    </div>

                    <button disabled={isSubmitting} type="submit" className="w-full bg-black text-[#fbb03b] py-6 rounded-[30px] font-[900] uppercase tracking-[0.2em] flex justify-center shadow-2xl transition-all active:scale-95">
                        {isSubmitting ? <Loader2 className="animate-spin"/> : "AUTHORIZE DEPLOYMENT"}
                    </button>
                </form>
            </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `.modal-input { width: 100%; background: #f9fafb; border: 2px solid #f3f4f6; padding: 1.25rem; border-radius: 2rem; font-size: 13px; font-weight: 800; outline: none; transition: all 0.3s; } .modal-input:focus { border-color: #fbb03b; background: white; }`}} />
    </div>
  );
};

export default AdManagement;