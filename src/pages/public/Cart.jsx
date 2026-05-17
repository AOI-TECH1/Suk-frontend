import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus, ChevronRight, CreditCard } from 'lucide-react';

const Cart = () => {
  const { cart, cartCount, removeFromCart, updateQuantity } = useAuth();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = cart.length > 0 ? 2500 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 font-sans">
      
      {/* --- 1. HERO IMAGE BANNER --- */}
      <div className="relative w-full h-48 md:h-64 bg-zinc-900 overflow-hidden flex items-center z-10">
        <img 
          src="https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2070&auto=format&fit=crop" 
          alt="Shopping Cart Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white">
            <nav className="flex items-center text-[10px] text-gray-300 font-black mb-3 uppercase tracking-[0.2em]">
                <Link to="/" className="hover:text-[#fbb03b] transition-colors">Home</Link>
                <ChevronRight size={10} className="mx-2 text-gray-500" />
                <span className="text-[#fbb03b]">My Bag</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
                Shopping <span className="text-[#fbb03b]">Cart</span>
            </h1>
        </div>
      </div>

      {/* --- 2. MAIN CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        
        {cart.length === 0 ? (
          /* --- EMPTY STATE --- */
          <div className="bg-white rounded-[40px] p-20 text-center shadow-2xl border border-gray-100 flex flex-col items-center">
            <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-[#fbb03b]" />
            </div>
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-zinc-900 mb-4">Your bag is empty</h2>
            <p className="text-gray-400 font-medium mb-10 max-w-sm">
              Looks like you haven't picked anything yet. Start exploring our verified SuK inventory!
            </p>
            <Link to="/shop" className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#fbb03b] hover:text-black transition-all shadow-xl active:scale-95 inline-flex items-center gap-3">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>
        ) : (
          /* --- CART GRID --- */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left: Items List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between px-8">
                 <p className="text-xs font-black uppercase tracking-widest text-gray-400">Items in your bag ({cartCount})</p>
                 <button onClick={() => navigate('/shop')} className="text-[10px] font-black uppercase text-[#fbb03b] hover:underline">Add more items</button>
              </div>

              {cart.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-[32px] flex flex-col sm:flex-row items-center gap-8 shadow-sm border border-gray-100 group transition-all hover:shadow-xl">
                  {/* Product Image */}
                  <div className="w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.main_image} alt={item.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-grow text-center sm:text-left">
                    <p className="text-[10px] text-[#fbb03b] font-black uppercase tracking-widest mb-1">{item.category?.name || "Premium Good"}</p>
                    <h3 className="font-black text-xl text-zinc-900 mb-2 leading-tight uppercase italic">{item.name}</h3>
                    <p className="text-[#4dbb5e] font-black text-xl">₦{Number(item.price).toLocaleString()}</p>
                    
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 mt-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-gray-50 rounded-xl p-1.5 border border-gray-100">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:text-[#fbb03b] transition-all"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-12 text-center font-black text-lg">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:text-[#fbb03b] transition-all"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Summary Box */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900 text-white p-10 rounded-[40px] shadow-2xl sticky top-32 border border-white/5">
                <h3 className="text-xl font-black mb-8 uppercase italic tracking-widest border-b border-white/10 pb-4 text-[#fbb03b]">Order Summary</h3>
                
                <div className="space-y-5 mb-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subtotal</span>
                    <span className="font-black text-lg">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delivery Fee</span>
                    <span className="text-[#4dbb5e] font-black">₦{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-[#fbb03b]">Total Amount</span>
                    <span className="text-3xl font-[900] italic">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[#fbb03b] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl active:scale-95 uppercase tracking-widest text-sm mb-6"
                >
                  Checkout Now <ChevronRight size={20} strokeWidth={3} />
                </button>
                
                <div className="flex items-center justify-center gap-3 text-gray-500">
                  <CreditCard size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Secure Paystack Checkout</span>
                </div>
              </div>

              {/* Assistance Card */}
              <div className="mt-6 p-6 bg-orange-50 rounded-3xl border border-orange-100">
                 <p className="text-[10px] font-black text-orange-900 uppercase mb-2">Need Help?</p>
                 <p className="text-xs text-orange-700 leading-relaxed font-medium">
                    Questions about your order? Call our support team at <strong>+234 812 345 678</strong>
                 </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;