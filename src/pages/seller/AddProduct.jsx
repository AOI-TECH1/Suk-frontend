import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, addProduct } from '../../api/sellerApi';
import { useAuth } from '../../context/AuthContext'; // 1. Ensure this is imported
import toast from 'react-hot-toast';
import { Upload, Package, Info, Loader2, X, Image as ImageIcon } from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  
  // 2. FIXED: Added 'user' to the destructuring here
  const { user, loading: authLoading } = useAuth(); 
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Image States
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discounted_price: '',
    stock_quantity: 1,
    description: '',
    short_description: '',
    category: '', 
    status: 'ACTIVE'
  });

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getCategories();
        const data = res.data.results || res.data;
        setCategories(data);
      } catch (err) {
        toast.error("Could not load categories.");
      }
    };
    fetchCats();
  }, []);

  // 3. Safety Check: If auth is loading, wait.
  if (authLoading) return <div className="pt-40 text-center font-black italic uppercase">Verifying Access...</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setMainPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages((prev) => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) return toast.error("Please select a category.");
    if (!mainImage) return toast.error("Main image is required.");

    setLoading(true);
    const data = new FormData();
    
    // Slug Logic
    const slug = formData.name.toLowerCase().trim().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    
    data.append('slug', slug);
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('stock_quantity', formData.stock_quantity);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('status', formData.status);
    
    if (formData.short_description) data.append('short_description', formData.short_description);
    if (formData.discounted_price) data.append('discounted_price', formData.discounted_price);
    
    data.append('main_image', mainImage);

    // Additional Gallery Images
    galleryImages.forEach((file) => {
        data.append('additional_images_files', file); 
    });

    try {
      await addProduct(data);
      toast.success("Product Live on SuK!");
      navigate('/seller/dashboard');
    } catch (err) {
      const serverErrors = err.response?.data;
      if (serverErrors) {
          const firstMsg = Object.values(serverErrors)[0];
          toast.error(`${firstMsg}`);
      } else {
          toast.error("Upload failed. Verify merchant status.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-6 font-sans bg-[#fcfcfc]">
      <div className="bg-white p-8 md:p-14 rounded-[50px] shadow-2xl border border-gray-100">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-5">
                <div className="bg-[#fbb03b] p-4 rounded-[24px] shadow-lg shadow-orange-100">
                    <Package className="text-black" size={32} />
                </div>
                <div>
                    <h2 className="text-4xl font-[900] italic uppercase tracking-tighter text-zinc-900">List New Product</h2>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Merchant Inventory Portal</p>
                </div>
            </div>
            
            <div className="bg-zinc-50 px-6 py-3 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black uppercase text-gray-400">Merchant Active</p>
                {/* 4. FIXED: Using optional chaining on user */}
                <p className="text-xs font-black text-green-600 uppercase">{user?.email || "Authenticated"}</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Product Title</label>
                    <input name="name" required className="setup-input text-2xl font-bold" placeholder="e.g. Vintage Leather Jacket" onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Category</label>
                    <select name="category" required className="setup-input font-bold" onChange={handleChange}>
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Base Price (₦)</label>
                    <input name="price" type="number" required className="setup-input" placeholder="0.00" onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-[#fbb03b] tracking-widest ml-1">Discount Price (Optional)</label>
                    <input name="discounted_price" type="number" className="setup-input" placeholder="0.00" onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Stock Units</label>
                    <input name="stock_quantity" type="number" required className="setup-input" defaultValue={1} onChange={handleChange} />
                </div>
            </div>

          <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Product Tagline (Short)</label>
                <input name="short_description" maxLength="300" className="setup-input" placeholder="Briefly highlight the best feature..." onChange={handleChange} />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Detailed Description</label>
                <textarea name="description" required className="setup-input h-32 resize-none" placeholder="Specifications, sizing, condition..." onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Primary Cover Image</label>
                <div className="relative border-2 border-dashed border-gray-200 rounded-[40px] p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-white hover:border-[#fbb03b] transition-all cursor-pointer h-64">
                   {mainPreview ? (
                       <img src={mainPreview} className="h-full w-full object-contain rounded-2xl" alt="Preview" />
                   ) : (
                       <p className="text-[9px] font-black uppercase text-gray-400">Click to upload Main Image</p>
                   )}
                   <input type="file" required accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleMainImageChange} />
                </div>
             </div>

             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Gallery</label>
                <div className="grid grid-cols-3 gap-3 h-64">
                    {galleryPreviews.map((src, index) => (
                        <div key={index} className="relative rounded-2xl overflow-hidden border border-gray-100">
                            <img src={src} className="w-full h-full object-cover" />
                        </div>
                    ))}
                    {galleryPreviews.length < 6 && (
                        <div className="relative border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center bg-gray-50/30 hover:border-[#fbb03b] transition-all cursor-pointer">
                            <ImageIcon size={24} className="text-gray-300" />
                            <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleGalleryChange} />
                        </div>
                    )}
                </div>
             </div>
          </div>

          <button 
            disabled={loading} 
            className="w-full bg-black text-white font-black py-6 rounded-[24px] shadow-2xl hover:bg-[#fbb03b] hover:text-black transition-all flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-70 group"
          >
            {loading ? <Loader2 className="animate-spin" /> : "PUBLISH TO MARKETPLACE"}
          </button>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .setup-input {
          width: 100%;
          border-bottom: 2px solid #f3f4f6;
          padding: 0.8rem 0.2rem;
          background: transparent;
          font-weight: 800;
          outline: none;
        }
        .setup-input:focus { border-color: #fbb03b; }
      `}} />
    </div>
  );
};

export default AddProduct;