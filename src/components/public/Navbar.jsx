<<<<<<< Updated upstream
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Search, Heart, ShoppingCart, User, 
  LogOut, ChevronDown, ShoppingBag, UserCircle, Trash2, Plus, Minus 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import suk_logo from "../../assets/logos/logo-suuk.png";

const Navbar = () => {
  const { user, logout, cartCount, cart, removeFromCart, updateQuantity } = useAuth(); 
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutClick = () => {
    setShowCartDropdown(false);
    navigate('/checkout');
  };

  return (
    <header className="fixed top-0 inset-x-0 z-[100] px-4 pt-4 flex justify-center pointer-events-none font-sans">
      <nav className="bg-black/90 backdrop-blur-md rounded-full py-2 px-8 md:px-10 flex items-center justify-between text-white shadow-2xl border border-white/10 w-full max-w-6xl pointer-events-auto">
        
        <Link to="/" className="shrink-0">
          <img src={suk_logo} alt="SuK" className='h-8 w-auto object-contain' />
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-[#fbb03b]" : "text-gray-300"}>Home</NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? "text-[#fbb03b]" : "text-gray-300"}>Shop</NavLink>
          <Link to="/contact" className="text-gray-300">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input type="text" placeholder="Search..." className="bg-white/5 text-white text-[9px] rounded-full py-1.5 pl-3 pr-8 w-28 focus:w-40 transition-all outline-none border border-white/10" />
            <Search size={10} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <div className="flex items-center gap-3">
            {/* ACCOUNT */}
            <div className="relative" onMouseEnter={() => setShowAccountDropdown(true)} onMouseLeave={() => setShowAccountDropdown(false)}>
              <button className="flex items-center gap-1 text-gray-300 py-2 outline-none"><User size={18} /><ChevronDown size={10} /></button>
              {showAccountDropdown && (
                <div className="absolute right-0 top-full w-48 bg-white text-black rounded-2xl shadow-2xl py-2 z-[110] border border-gray-100">
                  {!user ? (
                    <div className="px-3 pb-2 border-b border-gray-50">
                      <Link to="/login" className="w-full bg-[#fbb03b] text-white font-black text-[9px] uppercase py-2 rounded-lg flex items-center justify-center">Sign In</Link>
                    </div>
                  ) : (
                    <div className="px-4 py-2 border-b border-gray-50 mb-1 font-black text-[10px] truncate uppercase">{user.full_name || user.email}</div>
                  )}
                  <Link to={user ? `/${user.role.toLowerCase()}/dashboard` : "/login"} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-[10px] font-bold"><UserCircle size={14} /> Profile</Link>
                  {user && <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-red-500 text-[10px] font-bold w-full text-left border-t border-gray-50 mt-1 pt-2"><LogOut size={14} /> Logout</button>}
                </div>
              )}
            </div>

            {/* CART */}
            <div className="relative" onMouseEnter={() => setShowCartDropdown(true)} onMouseLeave={() => setShowCartDropdown(false)}>
              <Link to="/cart" className="relative text-gray-300 flex items-center py-2">
                <ShoppingCart size={18} />
                {cartCount > 0 && <span className="absolute -top-1 -right-1.5 bg-[#fbb03b] text-black text-[7px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center border border-black">{cartCount}</span>}
              </Link>

              {showCartDropdown && (
                <div className="absolute right-0 top-full w-72 bg-white text-black rounded-[24px] shadow-2xl p-4 z-[110] border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex justify-between items-center mb-3 border-b pb-2 border-gray-50">
                    <h3 className="font-black text-[10px] uppercase tracking-tighter">Your Bag ({cartCount})</h3>
                    <Link to="/cart" className="text-[9px] font-bold text-orange-500 underline">View Full</Link>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {cart.length > 0 ? (
                      cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                          <img src={item.main_image} className="w-10 h-10 rounded-lg object-cover bg-white shrink-0" alt="" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] font-black truncate uppercase leading-none mb-1">{item.name}</p>
                            <p className="text-[10px] font-bold text-[#4dbb5e]">₦{Number(item.price).toLocaleString()}</p>
                          </div>
                          {/* QUANTITY CONTROLS */}
                          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-1.5 py-0.5">
                            <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-orange-500"><Minus size={10}/></button>
                            <span className="text-[9px] font-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-orange-500"><Plus size={10}/></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={12} /></button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-6 text-[9px] font-bold text-gray-400 uppercase">Empty</p>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-black text-gray-400 uppercase">Subtotal</span>
                        <span className="font-black text-xs">₦{subtotal.toLocaleString()}</span>
                      </div>
                      <button onClick={handleCheckoutClick} className="w-full bg-black text-[#fbb03b] font-black text-[10px] uppercase py-3 rounded-xl hover:bg-zinc-800 transition active:scale-95 shadow-lg shadow-orange-100/50">Proceed to Checkout</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

=======
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Search, Heart, ShoppingCart, User, 
  LogOut, ChevronDown, ShoppingBag, UserCircle, Trash2, Plus, Minus 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import suk_logo from "../../assets/logos/logo-suuk.png";

const Navbar = () => {
  const { user, logout, cartCount, cart, removeFromCart, updateQuantity } = useAuth(); 
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutClick = () => {
    setShowCartDropdown(false);
    navigate('/checkout');
  };

  return (
    <header className="fixed top-0 inset-x-0 z-[100] px-4 pt-4 flex justify-center pointer-events-none font-sans">
      <nav className="bg-black/90 backdrop-blur-md rounded-full py-2 px-8 md:px-10 flex items-center justify-between text-white shadow-2xl border border-white/10 w-full max-w-6xl pointer-events-auto">
        
        <Link to="/" className="shrink-0">
          <img src={suk_logo} alt="SuK" className='h-15 w-auto object-contain' />
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-[#fbb03b]" : "text-gray-300"}>Home</NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? "text-[#fbb03b]" : "text-gray-300"}>Shop</NavLink>
          <Link to="/contact" className="text-gray-300">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input type="text" placeholder="Search..." className="bg-white/5 text-white text-[9px] rounded-full py-1.5 pl-3 pr-8 w-28 focus:w-40 transition-all outline-none border border-white/10" />
            <Search size={10} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <div className="flex items-center gap-3">
            {/* ACCOUNT */}
            <div className="relative" onMouseEnter={() => setShowAccountDropdown(true)} onMouseLeave={() => setShowAccountDropdown(false)}>
              <button className="flex items-center gap-1 text-gray-300 py-2 outline-none"><User size={18} /><ChevronDown size={10} /></button>
              {showAccountDropdown && (
                <div className="absolute right-0 top-full w-48 bg-white text-black rounded-2xl shadow-2xl py-2 z-[110] border border-gray-100">
                  {!user ? (
                    <div className="px-3 pb-2 border-b border-gray-50">
                      <Link to="/login" className="w-full bg-[#fbb03b] text-white font-black text-[9px] uppercase py-2 rounded-lg flex items-center justify-center">Sign In</Link>
                    </div>
                  ) : (
                    <div className="px-4 py-2 border-b border-gray-50 mb-1 font-black text-[10px] truncate uppercase">{user.full_name || user.email}</div>
                  )}
                  <Link to={user ? `/${user.role.toLowerCase()}/dashboard` : "/login"} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-[10px] font-bold"><UserCircle size={14} /> Profile</Link>
                  {user && <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-red-500 text-[10px] font-bold w-full text-left border-t border-gray-50 mt-1 pt-2"><LogOut size={14} /> Logout</button>}
                </div>
              )}
            </div>

            {/* CART */}
            <div className="relative" onMouseEnter={() => setShowCartDropdown(true)} onMouseLeave={() => setShowCartDropdown(false)}>
              <Link to="/cart" className="relative text-gray-300 flex items-center py-2">
                <ShoppingCart size={18} />
                {cartCount > 0 && <span className="absolute -top-1 -right-1.5 bg-[#fbb03b] text-black text-[7px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center border border-black">{cartCount}</span>}
              </Link>

              {showCartDropdown && (
                <div className="absolute right-0 top-full w-72 bg-white text-black rounded-[24px] shadow-2xl p-4 z-[110] border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex justify-between items-center mb-3 border-b pb-2 border-gray-50">
                    <h3 className="font-black text-[10px] uppercase tracking-tighter">Your Bag ({cartCount})</h3>
                    <Link to="/cart" className="text-[9px] font-bold text-orange-500 underline">View Full</Link>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {cart.length > 0 ? (
                      cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
                          <img src={item.main_image} className="w-10 h-10 rounded-lg object-cover bg-white shrink-0" alt="" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] font-black truncate uppercase leading-none mb-1">{item.name}</p>
                            <p className="text-[10px] font-bold text-[#4dbb5e]">₦{Number(item.price).toLocaleString()}</p>
                          </div>
                          {/* QUANTITY CONTROLS */}
                          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-1.5 py-0.5">
                            <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-orange-500"><Minus size={10}/></button>
                            <span className="text-[9px] font-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-orange-500"><Plus size={10}/></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={12} /></button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-6 text-[9px] font-bold text-gray-400 uppercase">Empty</p>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-black text-gray-400 uppercase">Subtotal</span>
                        <span className="font-black text-xs">₦{subtotal.toLocaleString()}</span>
                      </div>
                      <button onClick={handleCheckoutClick} className="w-full bg-black text-[#fbb03b] font-black text-[10px] uppercase py-3 rounded-xl hover:bg-zinc-800 transition active:scale-95 shadow-lg shadow-orange-100/50">Proceed to Checkout</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

>>>>>>> Stashed changes
export default Navbar;