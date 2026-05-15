import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cartCount, setCartCount } = useAuth();

  // Temporary mock data (In the future, this will come from your cartApi.js)
  const cartItems = cartCount > 0 ? [
    {
      id: 1,
      name: "Canon EOS Camera",
      price: 25000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200"
    }
  ] : [];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
          <ShoppingBag className="text-orange-500" /> Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          /* --- EMPTY STATE --- */
          <div className="bg-white rounded-[40px] p-20 text-center shadow-sm border border-gray-100">
            <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is feeling a bit light!</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Looks like you haven't added anything to your cart yet. Explore our latest goods and services.
            </p>
            <Link to="/shop" className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-orange-500 transition-all inline-flex items-center gap-2">
              <ArrowLeft size={18} /> Start Shopping
            </Link>
          </div>
        ) : (
          /* --- CART ITEMS LIST --- */
          <div className="grid lg:grid-cols-3 gap-10">
            
            {/* Left: Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-3xl flex items-center gap-6 shadow-sm border border-gray-50">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl bg-gray-100" />
                  
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-orange-500 font-black text-xl">₦{item.price.toLocaleString()}</p>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border rounded-full px-3 py-1 gap-4">
                        <button className="text-gray-400 hover:text-black"><Minus size={16} /></button>
                        <span className="font-bold">{item.quantity}</span>
                        <button className="text-gray-400 hover:text-black"><Plus size={16} /></button>
                      </div>
                      <button className="text-red-500 hover:bg-red-50 p-2 rounded-full transition">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Summary Box */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-50 h-fit sticky top-10">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery Fee</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black text-orange-500">₦{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-orange-500 transition shadow-lg shadow-orange-100">
                Proceed to Checkout
              </button>
              
              <p className="text-center text-[10px] text-gray-400 uppercase mt-6 font-bold tracking-widest">
                Secure Payment via Paystack
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;