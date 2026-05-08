import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, cartCount } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="max-w-7xl mx-auto px-4 pt-6">
      <nav className="bg-black rounded-full py-4 px-8 flex items-center justify-between text-white shadow-2xl">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
           <span className="font-bold text-2xl italic">SuK</span>
        </Link>

        {/* Dynamic Links */}
        <div className="hidden lg:flex items-center space-x-8 text-sm">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          
          {/* Only show Login/Register if NO user is logged in */}
          {!user ? (
            <>
              <Link to="/register">Sign Up</Link>
              <Link to="/login" className="bg-white text-black px-4 py-2 rounded-full font-bold">Log In</Link>
            </>
          ) : (
            <div className="relative">
              {/* User Icon when Logged In */}
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition"
              >
                <User size={18} />
                <span className="font-medium text-xs">My Account</span>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-bottom border-gray-100 mb-2">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Logged in as</p>
                    <p className="text-xs font-bold truncate">{user.email}</p>
                  </div>
                  
                  {/* Dashboard Link changes based on role (Buyer/Seller/Staff) */}
                  <Link to={`/${user.role.toLowerCase()}/dashboard`} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  
                  <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 text-sm">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-6">
          <div className="relative hidden md:block">
            <input type="text" placeholder="Search..." className="bg-white text-black text-xs rounded-lg py-2 px-4 w-48" />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <Link to="/cart" className="relative group">
            <ShoppingCart size={24} className="group-hover:text-orange-400 transition" />
            {/* Dynamic Cart Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-black text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-black">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;