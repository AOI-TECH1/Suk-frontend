import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Search, Heart, ShoppingCart, User, 
  LogOut, LayoutDashboard, ChevronDown, 
  ShoppingBag, UserCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import suk_logo from "../../assets/logos/logo-suuk.png";

const Navbar = () => {
  const { user, logout, cartCount } = useAuth();
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-[100] px-4 pt-4 flex justify-center pointer-events-none">
      <nav className="bg-black/90 backdrop-blur-md rounded-full py-2.5 px-8 md:px-12 flex items-center justify-between text-white shadow-2xl border border-white/10 w-full max-w-6xl pointer-events-auto">
        
        {/* 1. LOGO */}
        <Link to="/" className="flex items-center group shrink-0">
          <img src={suk_logo} alt="SuK" className='h-9 w-auto object-contain' />
        </Link>

        {/* 2. CENTER LINKS */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest">
          <NavLink to="/" className={({ isActive }) => 
            isActive ? "text-[#fbb03b]" : "text-gray-300 hover:text-[#fbb03b] transition-colors"
          }>Home</NavLink>
          <Link to="/contact" className="text-gray-300 hover:text-[#fbb03b] transition-colors">Contact</Link>
          <Link to="/about" className="text-gray-300 hover:text-[#fbb03b] transition-colors">About</Link>
        </div>

        {/* 3. RIGHT ACTIONS (Search + Icons) */}
        <div className="flex items-center gap-6">
          
          {/* Compact Search */}
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-white/5 text-white text-[11px] rounded-full py-2 pl-4 pr-10 w-36 focus:w-48 focus:bg-white focus:text-black transition-all outline-none border border-white/10" 
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <div className="flex items-center gap-5">
            {/* ACCOUNT DROPDOWN (Replaces Log In/Sign Up links) */}
            <div className="relative" onMouseEnter={() => setShowAccountDropdown(true)} onMouseLeave={() => setShowAccountDropdown(false)}>
              <button className="flex items-center gap-1 text-gray-300 hover:text-[#fbb03b] transition py-2">
                <User size={22} strokeWidth={2} />
                <ChevronDown size={14} className={`transition-transform ${showAccountDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* THE JUMIA-STYLE DROPDOWN */}
              {showAccountDropdown && (
                <div className="absolute right-0 top-full mt-0 w-60 bg-white text-black rounded-2xl shadow-2xl py-4 z-[110] border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  {/* Part 1: Sign In Button (Only if not logged in) */}
                  {!user ? (
                    <div className="px-4 pb-4 border-b border-gray-100">
                      <Link 
                        to="/login" 
                        className="w-full bg-[#fbb03b] text-white font-bold py-3 rounded-xl flex items-center justify-center shadow-lg shadow-orange-100 hover:bg-orange-500 transition active:scale-95"
                      >
                        Sign In
                      </Link>
                    </div>
                  ) : (
                    <div className="px-5 py-3 border-b border-gray-100 mb-2">
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Welcome back</p>
                       <p className="text-sm font-black truncate">{user.full_name || user.email}</p>
                    </div>
                  )}

                  {/* Part 2: Menu Links */}
                  <div className="flex flex-col py-2 font-medium">
                    <Link to={user ? `/${user.role.toLowerCase()}/dashboard` : "/login"} className="flex items-center gap-4 px-5 py-2.5 hover:bg-gray-50 transition-colors">
                      <UserCircle size={18} className="text-gray-400" />
                      <span className="text-sm">My Account</span>
                    </Link>
                    
                    <Link to="/buyer/orders" className="flex items-center gap-4 px-5 py-2.5 hover:bg-gray-50 transition-colors">
                      <ShoppingBag size={18} className="text-gray-400" />
                      <span className="text-sm">Orders</span>
                    </Link>
                    
                    <Link to="/wishlist" className="flex items-center gap-4 px-5 py-2.5 hover:bg-gray-50 transition-colors">
                      <Heart size={18} className="text-gray-400" />
                      <span className="text-sm">Wishlist</span>
                    </Link>

                    {/* Part 3: Logout (Only if logged in) */}
                    {user && (
                      <button 
                        onClick={logout}
                        className="flex items-center gap-4 px-5 py-2.5 mt-2 text-red-500 hover:bg-red-50 border-t border-gray-50 transition-colors"
                      >
                        <LogOut size={18} />
                        <span className="text-sm font-bold">Logout</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* WISHLIST ICON (External) */}
            <Link to="/wishlist" className="text-gray-300 hover:text-[#fbb03b] transition hidden sm:block">
              <Heart size={22} strokeWidth={2} />
            </Link>

            {/* CART ICON */}
            <Link to="/cart" className="relative text-gray-300 hover:text-[#fbb03b] transition group">
              <ShoppingCart size={22} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#fbb03b] text-black text-[8px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-black group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;