import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import ProductCard from '../../components/public/ProductCard';
import { 
  ShieldCheck, MapPin, Package, Star, 
  Info, Loader2, ArrowLeft, Globe, AlertTriangle
} from 'lucide-react';

const PublicStore = () => {
  const { storeName } = useParams(); 
  const [products, setProducts] = useState([]);
  const [sellerInfo, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreData = async () => {
      setLoading(true);
      try {
        /**
         * Fetching products filtered by the store name.
         * The backend serializer nested objects provide the profile details.
         */
        const res = await api.get(`/products/?seller__seller_profile__store_name=${storeName}`);
        const data = res.data.results || res.data;
        setProducts(data);

        // Extract Seller and Profile info from the first product in the list
        if (data.length > 0) {
            setSeller(data[0].seller);
        } else {
            /** 
             * FALLBACK: If store has 0 products, we attempt to fetch 
             * the profile directly so the page isn't blank.
             */
            try {
                const profileRes = await api.get(`/auth/seller/profile-by-name/${storeName}/`);
                setSeller(profileRes.data);
            } catch (e) {
                setSeller(null);
            }
        }
      } catch (err) {
        console.error("Store Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [storeName]);

  // 1. LOADING STATE
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#fbb03b] mb-4" size={40} />
        <p className="font-black uppercase italic text-[10px] tracking-widest text-gray-400">Syncing Storefront...</p>
    </div>
  );

  // 2. 404 STATE (Store does not exist)
  if (!sellerInfo && products.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc] px-6 text-center">
        <AlertTriangle size={64} className="text-gray-200 mb-6" />
        <h2 className="text-4xl font-[900] italic uppercase tracking-tighter text-zinc-900">Store Not Found</h2>
        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-2 max-w-xs">The merchant terminal you are looking for does not exist or has been decommissioned.</p>
        <Link to="/shop" className="mt-10 bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#fbb03b] hover:text-black transition-all">Return to Marketplace</Link>
    </div>
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans">
      
      {/* --- 1. DYNAMIC BRAND HERO --- */}
      <section className="relative h-[480px] bg-zinc-950 flex items-end overflow-hidden">
        {/* Visual FX */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fbb03b 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#fbb03b]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 w-full pb-16 z-10">
            <Link to="/shop" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#fbb03b] text-[10px] font-black uppercase tracking-[0.3em] mb-12 transition-all">
                <ArrowLeft size={14} strokeWidth={3} /> Marketplace
            </Link>

            <div className="flex flex-col md:flex-row items-center md:items-end gap-12">
                {/* Dynamic Logo */}
                <div className="w-48 h-48 bg-white rounded-[60px] shadow-2xl border-[8px] border-zinc-900 overflow-hidden flex items-center justify-center flex-shrink-0 group">
                    {sellerInfo?.seller_profile?.logo ? (
                        <img src={sellerInfo.seller_profile.logo} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" alt={storeName} />
                    ) : (
                        <Globe size={64} className="text-zinc-100" />
                    )}
                </div>

                {/* Dynamic Identity */}
                <div className="text-center md:text-left mb-4">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <h1 className="text-5xl md:text-8xl font-[900] italic uppercase text-white tracking-tighter leading-none">
                            {storeName}
                        </h1>
                        <ShieldCheck className="text-[#fbb03b] hidden lg:block" size={40} strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 text-gray-500 text-[10px] font-black uppercase tracking-[0.25em]">
                        <span className="flex items-center gap-2 text-[#fbb03b]">
                            <Star size={14} fill="currentColor" /> Verified Merchant
                        </span>
                        <span className="flex items-center gap-2">
                            <MapPin size={14} /> Base: {sellerInfo?.state || 'Global'}
                        </span>
                        <span className="flex items-center gap-2 text-white border-l border-zinc-800 pl-8">
                            <Package size={14} /> {products.length} Active Listings
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- 2. DYNAMIC BIO & PRODUCT GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
            
            {/* Sidebar: Merchant Metadata */}
            <div className="lg:col-span-1 space-y-12">
                <div className="bg-white border border-gray-100 p-10 rounded-[50px] shadow-sm">
                    <h3 className="font-black uppercase italic text-xs tracking-[0.2em] mb-8 flex items-center gap-3 text-zinc-900">
                        <Info size={18} className="text-[#fbb03b]" /> About Vendor
                    </h3>
                    
                    <p className="text-sm font-bold leading-relaxed text-gray-400 mb-10 italic">
                        "{sellerInfo?.seller_profile?.store_description || `${storeName} is a verified merchant on the SuK platform, committed to quality and speed.`}"
                    </p>
                    
                    <div className="pt-8 border-t border-gray-50 space-y-6">
                        <div>
                            <p className="text-[9px] font-black uppercase text-gray-300 tracking-widest mb-1">Fulfillment Node</p>
                            <p className="text-xs font-black text-zinc-900 uppercase tracking-wider">{sellerInfo?.seller_profile?.business_address || "Dispatch location verified"}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase text-gray-300 tracking-widest mb-1">Onboarding Date</p>
                            <p className="text-xs font-black text-zinc-900 uppercase tracking-wider">
                                {sellerInfo?.date_joined ? new Date(sellerInfo.date_joined).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : "Recently Joined"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Trust Card */}
                <div className="bg-zinc-900 p-10 rounded-[50px] shadow-2xl text-white relative overflow-hidden">
                    <ShieldCheck size={100} className="absolute -right-8 -bottom-8 opacity-5 text-white" />
                    <h4 className="font-black text-lg uppercase italic leading-none mb-3">Authentic Gear</h4>
                    <p className="text-[10px] font-bold text-gray-500 leading-relaxed uppercase tracking-widest">
                        Every listing from this store has been verified for quality and serial consistency.
                    </p>
                </div>
            </div>

            {/* Main Content: Dynamic Grid */}
            <div className="lg:col-span-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
                    <div>
                        <h2 className="text-3xl font-[900] italic uppercase tracking-tighter text-zinc-900">
                            Merchant <span className="text-[#fbb03b]">Vault</span>
                        </h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">Authorized Listings Only</p>
                    </div>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="py-40 text-center bg-white rounded-[60px] border-2 border-dashed border-gray-100">
                        <Package size={56} className="mx-auto text-gray-100 mb-6" />
                        <h3 className="text-xl font-black uppercase italic text-gray-300 tracking-widest">Vault is currently empty</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-2">Check back later for new inventory</p>
                    </div>
                )}
            </div>

        </div>
      </section>

      {/* Futuristic Watermark */}
      <div className="pb-32 text-center opacity-[0.04] pointer-events-none select-none">
           <h2 className="text-[12rem] font-black italic uppercase tracking-tighter text-zinc-950 leading-none">
             {storeName.split(' ')[0]}
           </h2>
      </div>

    </div>
  );
};

export default PublicStore;