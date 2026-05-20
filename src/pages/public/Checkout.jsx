import React, { useState } from 'react';
import { MapPin, CreditCard, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { PaystackButton } from "react-paystack";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; 

const Checkout = () => {
  const { user, cart, clearCart } = useAuth();
  const navigate = useNavigate();

  // 1. BILLING FORM STATE
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    address: user?.address || '',
    city: '',
    phone: user?.phone_number || '',
    email: user?.email || '',
  });

  // 2. LOGISTICS / SHIPPING STATE
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  const shippingOptions = {
    standard: { label: 'Standard Door Delivery', price: 2500 },
    express: { label: 'Express (Same Day)', price: 5500 },
    pickup: { label: 'Pickup Station', price: 0 },
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => {
      const price = item.final_price || item.price || 0;
      return acc + (price * item.quantity);
  }, 0);

  const deliveryPrice = shippingOptions[shippingMethod].price;
  const total = subtotal + deliveryPrice;

  // Paystack Config
  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email || "customer@example.com",
    amount: Math.round(total * 100), 
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY, 
  };

  const handleSuccess = async (ref) => {
    // Validate Form
    if (!formData.address || !formData.phone) {
        toast.error("Please fill in delivery details");
        return;
    }

    try {
      await api.post('/orders/create/', {
        delivery_address: `${formData.address}, ${formData.city}`,
        phone_number: formData.phone,
        paystack_reference: ref.reference,
        shipping_method: shippingOptions[shippingMethod].label,
        total_amount: total
      });

      toast.success("Order Placed Successfully!");
      clearCart();
      navigate('/buyer/orders');
    } catch (err) {
      toast.error("Payment successful, but failed to save order.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center bg-white">
        <h2 className="text-xl font-black uppercase italic">Your bag is empty</h2>
        <button onClick={() => navigate('/shop')} className="mt-4 text-[#fbb03b] font-bold underline uppercase tracking-widest text-xs">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans bg-white">
      <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-10 text-black">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT SIDE: Billing & Logistics */}
        <div className="lg:col-span-2 space-y-8 text-black">
           
           {/* 1. BILLING DETAILS FORM */}
           <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-[#fbb03b]/10 rounded-lg"><MapPin className="text-[#fbb03b]" size={20} /></div>
                 <h3 className="font-black text-lg uppercase italic">Billing Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase mb-2 block ml-1">First Name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl p-4 text-xs font-bold outline-none focus:ring-2 focus:ring-[#fbb03b]" placeholder="John" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase mb-2 block ml-1">Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl p-4 text-xs font-bold outline-none focus:ring-2 focus:ring-[#fbb03b]" placeholder="Doe" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase mb-2 block ml-1">Street Address</label>
                  <input name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl p-4 text-xs font-bold outline-none focus:ring-2 focus:ring-[#fbb03b]" placeholder="House No, Street Name" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase mb-2 block ml-1">Town / City</label>
                  <input name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl p-4 text-xs font-bold outline-none focus:ring-2 focus:ring-[#fbb03b]" placeholder="Lagos" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase mb-2 block ml-1">Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl p-4 text-xs font-bold outline-none focus:ring-2 focus:ring-[#fbb03b]" placeholder="080XXXXXXXX" />
                </div>
              </div>
           </section>

           {/* 2. LOGISTICS TYPE SELECTION */}
           <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-[#fbb03b]/10 rounded-lg"><Truck className="text-[#fbb03b]" size={20} /></div>
                 <h3 className="font-black text-lg uppercase italic">Logistics Method</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(shippingOptions).map(([key, value]) => (
                  <div 
                    key={key}
                    onClick={() => setShippingMethod(key)}
                    className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${shippingMethod === key ? 'border-[#fbb03b] bg-[#fbb03b]/5' : 'border-gray-50 bg-gray-50'}`}
                  >
                    <p className="font-black text-[10px] uppercase italic mb-1">{value.label}</p>
                    <p className="font-black text-sm text-[#fbb03b]">₦{value.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
           </section>

           {/* 3. ORDER REVIEW */}
           <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                 <ShoppingBag className="text-[#fbb03b]" /><h3 className="font-black text-lg uppercase italic">Review Order</h3>
              </div>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <img src={item.main_image || item.image} alt="" className="w-10 h-10 object-cover rounded-lg" />
                      <p className="text-[10px] font-bold uppercase">{item.name} <span className="text-[#fbb03b] ml-2">x{item.quantity}</span></p>
                    </div>
                    <p className="font-black text-xs">₦{((item.final_price || item.price) * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
           </section>
        </div>

        {/* RIGHT SIDE: SUMMARY */}
        <div className="bg-zinc-900 text-white p-8 rounded-[40px] shadow-2xl h-fit sticky top-32">
           <h3 className="text-lg font-black mb-6 uppercase tracking-widest border-b border-white/10 pb-4 text-[#fbb03b]">Summary</h3>
           
           <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400 font-bold uppercase text-[9px]">
                <span>Subtotal</span> 
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-bold uppercase text-[9px]">
                <span>Logistics ({shippingOptions[shippingMethod].label})</span> 
                <span>₦{deliveryPrice.toLocaleString()}</span>
              </div>
              <div className="pt-5 border-t border-white/10 flex justify-between text-xl font-black italic">
                 <span>TOTAL</span> <span className="text-[#fbb03b]">₦{total.toLocaleString()}</span>
              </div>
           </div>
           
           <PaystackButton 
              {...config}
              text="AUTHORIZE PAYMENT"
              onSuccess={handleSuccess}
              onClose={() => toast.error("Payment Cancelled")}
              className="w-full bg-[#fbb03b] text-black font-black py-4 rounded-2xl flex items-center justify-center hover:bg-white transition-all shadow-xl text-[10px] uppercase tracking-widest"
           />

           <div className="flex items-center justify-center gap-2 text-gray-500 mt-4">
              <ShieldCheck size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">Secure & Verified Checkout</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;