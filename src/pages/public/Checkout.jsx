import React from 'react';
import { MapPin, CreditCard, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { PaystackButton } from "react-paystack";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user, cart, clearCart } = useAuth();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = 2500;
  const total = subtotal + delivery;

  // Paystack Config
  const config = {
    reference: (new Date()).getTime().toString(),
    email: user?.email || "guest@example.com",
    amount: total * 100, // Amount in Kobo
    publicKey: 'pk_test_your_real_key_here',
  };

  const handleSuccess = (ref) => {
    toast.success("Payment Successful!");
    clearCart();
    navigate('/buyer/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-xl font-black uppercase italic">Your bag is empty</h2>
        <button onClick={() => navigate('/shop')} className="mt-4 text-orange-500 font-bold underline">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 font-sans">
      <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-10">Secure Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
           <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                 <MapPin className="text-[#fbb03b]" /><h3 className="font-black text-lg uppercase italic">Shipping Address</h3>
              </div>
              <div className="p-5 bg-gray-50 rounded-2xl border-2 border-[#fbb03b]/20">
                 <p className="font-black text-sm mb-1">{user?.full_name || 'Guest User'}</p>
                 <p className="text-xs text-gray-500 font-medium leading-relaxed">{user?.address || 'Lagos, Nigeria'}</p>
              </div>
           </section>

           <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                 <CreditCard className="text-[#fbb03b]" /><h3 className="font-black text-lg uppercase italic">Payment Method</h3>
              </div>
              <div className="p-4 border-2 border-black rounded-2xl flex items-center justify-between">
                 <span className="font-black text-[10px] uppercase tracking-widest">Paystack Online</span>
                 <div className="w-3 h-3 rounded-full border-4 border-black"></div>
              </div>
           </section>
        </div>

        <div className="bg-zinc-900 text-white p-8 rounded-[40px] shadow-2xl h-fit sticky top-32">
           <h3 className="text-lg font-black mb-6 uppercase tracking-widest border-b border-white/10 pb-4 text-[#fbb03b]">Summary</h3>
           <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400 font-bold uppercase text-[9px]"><span>Subtotal</span> <span>₦{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-400 font-bold uppercase text-[9px]"><span>Delivery</span> <span>₦{delivery.toLocaleString()}</span></div>
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
           <div className="flex items-center justify-center gap-2 text-gray-500 mt-4"><ShieldCheck size={12} /><span className="text-[9px] font-black uppercase tracking-widest">Secure Payment</span></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;