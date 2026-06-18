import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search, Heart, ShoppingCart, User,
  LogOut, ChevronDown, ShoppingBag, UserCircle, Trash2, Plus, Minus,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import suk_logo from "../../assets/logos/logo-suuk.png";

const Navbar = () => {
  const { user, logout, cartCount, cart, removeFromCart, updateQuantity } = useAuth();
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getDisplayName = () => {
    if (user?.full_name && user.full_name.trim() !== "" && user.full_name !== "-") {
      return user.full_name.split(" ")[0];
    }
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  const handleCheckoutClick = () => {
    setShowCartDropdown(false);
    navigate("/checkout");
  };

  // COLOR THEME DEFINITION
  const brandOrange = "#fbb03b"; // SuK Primary

  return (
    <header className="fixed top-0 inset-x-0 z-[100] px-4 pt-4 flex justify-center pointer-events-none font-sans">
      <nav className="bg-black/90 backdrop-blur-md rounded-full py-2 px-8 md:px-10 flex items-center justify-between text-white shadow-2xl border border-white/10 w-full max-w-6xl pointer-events-auto">
        
        {/* 1. LOGO */}
        <Link to="/" className="shrink-0">
          <img src={suk_logo} alt="SuK" className="h-15 w-auto object-contain transition-transform hover:scale-105" />
        </Link>

        {/* 2. CENTER NAVIGATION */}
<div className="hidden lg:flex items-center gap-8">
  {[
    { name: "Home", path: "/", end: true },
    { name: "Shop", path: "/shop", end: false },
    { name: "Contact", path: "/contact", end: false },
    { name: "About", path: "/about", end: false },
  ].map((link) => (
    <NavLink
      key={link.name}
      to={link.path}
      end={link.end}
      className={({ isActive }) =>
        `text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
          isActive 
            ? "!text-white underline underline-offset-4 decoration-[#fbb03b] decoration-2" 
            : "!text-[#fbb03b] hover:!text-white hover:scale-105" // Added ! to force Amber
        }`
      }
    >
      {link.name}
    </NavLink>
  ))}
</div>
        {/* 3. RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input type="text" placeholder="Search..." className="bg-white/5 text-white text-[9px] rounded-full py-1.5 pl-3 pr-8 w-28 focus:w-40 transition-all outline-none border border-white/10" />
            <Search size={10} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <div className="flex items-center gap-3">
            {/* ACCOUNT DROPDOWN */}
            <div className="relative" onMouseEnter={() => setShowAccountDropdown(true)} onMouseLeave={() => setShowAccountDropdown(false)}>
              <button className="flex items-center gap-2 py-2 outline-none group cursor-pointer">
                <User size={18} className="text-[#fbb03b] group-hover:text-white transition-colors" />
                <div className="hidden sm:flex flex-col items-start leading-none">
                  <span className="text-[9px] font-black uppercase text-[#fbb03b] group-hover:text-white transition-colors">
                    {user ? `Hi, ${getDisplayName()}` : "Sign In"}
                  </span>
                </div>
                <ChevronDown size={10} className={`text-[#fbb03b] transition-transform duration-300 ${showAccountDropdown ? "rotate-180" : ""}`} />
              </button>

              {showAccountDropdown && (
                <div className="absolute right-0 top-full w-48 bg-white text-black rounded-2xl shadow-2xl py-2 z-[110] border border-gray-100 animate-in fade-in slide-in-from-top-1">
                  {!user ? (
                    <div className="px-3 pb-2 border-b border-gray-50">
                      <Link to="/login" className="w-full bg-[#fbb03b] text-white font-black text-[9px] uppercase py-2 rounded-lg flex items-center justify-center hover:bg-orange-500 transition">Login to SuK</Link>
                    </div>
                  ) : (
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-[8px] text-orange-500 font-black uppercase tracking-widest">{user.role}</p>
                      <p className="text-[10px] font-black truncate text-zinc-900 uppercase">{user.full_name || user.email}</p>
                    </div>
                  )}
                  <div className="flex flex-col py-1">
                    <Link to={user ? `/${user.role.toLowerCase()}/dashboard` : "/login"} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-[10px] font-bold"><UserCircle size={14} className="text-gray-400" /> Profile</Link>
                    <Link to="/buyer/orders" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-[10px] font-bold"><ShoppingBag size={14} className="text-gray-400" /> Orders</Link>
                    {user && <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-red-500 text-[10px] font-black w-full text-left border-t border-gray-50 mt-1 pt-2 uppercase"><LogOut size={14} /> Logout</button>}
                  </div>
                </div>
              )}
            </div>

            {/* MINI CART DROPDOWN */}
            <div className="relative" onMouseEnter={() => setShowCartDropdown(true)} onMouseLeave={() => setShowCartDropdown(false)}>
              <Link to="/cart" className="relative text-gray-300 flex items-center py-2 group">
                <ShoppingCart size={18} className="text-[#fbb03b] group-hover:text-white transition-colors" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1.5 bg-[#fbb03b] text-black text-[7px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center border border-black group-hover:scale-110 transition-transform">{cartCount}</span>}
              </Link>

              {showCartDropdown && (
                <div className="absolute right-0 top-full w-72 bg-white text-black rounded-[24px] shadow-2xl p-4 z-[110] border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex justify-between items-center mb-3 border-b pb-2 border-gray-50">
                    <h3 className="font-black text-[10px] uppercase tracking-tighter">Your Bag ({cartCount})</h3>
                    <Link to="/cart" onClick={() => setShowCartDropdown(false)} className="text-[9px] font-bold text-orange-500 underline">View Full</Link>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {cart.length > 0 ? (
                      cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl group/item">
                          <img src={item.main_image} className="w-10 h-10 rounded-lg object-cover bg-white shrink-0 border border-gray-100" alt="" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] font-black truncate uppercase leading-none mb-1">{item.name}</p>
                            <p className="text-[10px] font-bold text-[#4dbb5e]">₦{Number(item.price).toLocaleString()}</p>
                          </div>
                          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-1.5 py-0.5">
                            <button onClick={(e) => {e.preventDefault(); updateQuantity(item.id, -1)}} className="text-gray-400 hover:text-orange-500"><Minus size={10}/></button>
                            <span className="text-[9px] font-black min-w-[10px] text-center">{item.quantity}</span>
                            <button onClick={(e) => {e.preventDefault(); updateQuantity(item.id, 1)}} className="text-gray-400 hover:text-orange-500"><Plus size={10}/></button>
                          </div>
                          <button onClick={(e) => {e.preventDefault(); removeFromCart(item.id)}} className="text-gray-300 hover:text-red-500"><Trash2 size={12} /></button>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest">Your bag is empty</div>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-3 px-1">
                        <span className="text-[9px] font-black text-gray-400 uppercase">Subtotal</span>
                        <span className="font-black text-xs text-zinc-900 ">₦{subtotal.toLocaleString()}</span>
                      </div>
                      <button onClick={handleCheckoutClick} className="w-full bg-black text-[#fbb03b] font-[900] text-[10px] uppercase py-3.5 rounded-xl hover:bg-zinc-800 transition active:scale-95 shadow-lg shadow-orange-100/20">Proceed to Checkout</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }` }} />
    </header>
  );
};

export default Navbar;