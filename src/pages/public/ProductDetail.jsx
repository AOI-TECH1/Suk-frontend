import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Truck, RotateCcw, Star, Minus, Plus } from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('white');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}/`);
        setProduct(res.data);
        setSelectedImage(res.data.main_image || res.data.image);
      } catch (err) {
        toast.error("Product not found");
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="h-screen flex items-center justify-center animate-pulse text-gray-400 font-black uppercase italic tracking-widest">Loading SuK Item...</div>;

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    toast.success("Proceeding to checkout...");
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans">
      
      {/* BREADCRUMBS */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-12">
        <Link to="/" className="hover:text-black">Account</Link> / 
        <Link to="/shop" className="hover:text-black">Gaming</Link> / 
        <span className="text-black font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: THUMBNAILS (2 cols) */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {[product.main_image, ...(product.additional_images || [])].slice(0, 4).map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedImage(img)}
              className={`aspect-square bg-gray-100 rounded-lg cursor-pointer border-2 transition-all ${selectedImage === img ? 'border-[#fbb03b]' : 'border-transparent'}`}
            >
              <img src={img} className="w-full h-full object-contain p-2" alt="" />
            </div>
          ))}
        </div>

        {/* CENTER: MAIN IMAGE (5 cols) */}
        <div className="lg:col-span-5 bg-gray-100 rounded-xl flex items-center justify-center p-10 h-[500px]">
          <img src={selectedImage} className="max-w-full max-h-full object-contain mix-blend-multiply" alt={product.name} />
        </div>

        {/* RIGHT: DETAILS (6 cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <h1 className="text-2xl font-bold text-black mb-3">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex text-[#fbb03b]">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "" : "text-gray-300"} />)}
            </div>
            <span className="text-gray-400 text-xs">(150 Reviews)</span>
            <span className="text-gray-300">|</span>
            <span className="text-[#4dbb5e] text-xs font-medium">In Stock</span>
          </div>

          <div className="text-2xl font-medium mb-6">₦{Number(product.final_price || product.price).toLocaleString()}</div>

          <p className="text-sm text-gray-600 leading-relaxed mb-8 border-b border-gray-200 pb-8">
            {product.description || "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."}
          </p>

          {/* VARIATIONS */}
          <div className="space-y-6 mb-8">
            {/* COLORS */}
            <div className="flex items-center gap-6">
              <span className="text-lg font-medium">Colours:</span>
              <div className="flex gap-2">
                {['white', 'black'].map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-5 h-5 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                    style={{ backgroundColor: color === 'white' ? '#A0BCE0' : '#000' }}
                  />
                ))}
              </div>
            </div>

            {/* SIZES */}
            <div className="flex items-center gap-6">
              <span className="text-lg font-medium">Size:</span>
              <div className="flex gap-3">
                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-8 h-8 rounded-md border text-xs font-bold transition-all ${selectedSize === size ? 'bg-[#4dbb5e] border-[#4dbb5e] text-white' : 'border-gray-300 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ADD TO CART SECTION */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center border border-gray-400 rounded-md">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100"><Minus size={16}/></button>
              <span className="w-12 text-center font-bold border-x border-gray-400 py-2">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className={`px-3 py-2 bg-[#fbb03b] text-white hover:bg-orange-500`}><Plus size={16}/></button>
            </div>
            
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-[#fbb03b] text-black font-bold py-3 rounded-md hover:bg-orange-500 transition-all uppercase tracking-wide"
            >
              Buy Now
            </button>
            
            <button className="p-2.5 border border-gray-400 rounded-md hover:bg-gray-50 transition">
              <Heart size={20} />
            </button>
          </div>

          {/* DELIVERY INFO BOX */}
          <div className="border border-gray-400 rounded-md overflow-hidden">
            <div className="flex items-center gap-4 p-4 border-b border-gray-400">
              <Truck className="text-black" size={24} />
              <div>
                <p className="text-sm font-bold">Free Delivery</p>
                <button className="text-[10px] font-bold underline decoration-black">Enter your postal code for Delivery Availability</button>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <RotateCcw className="text-black" size={24} />
              <div>
                <p className="text-sm font-bold">Return Delivery</p>
                <p className="text-[10px] font-medium">Free 30 Days Delivery Returns. <button className="underline">Details</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;