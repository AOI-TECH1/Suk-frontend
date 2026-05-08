import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a1111] text-white pt-16 mt-auto relative overflow-hidden">
      {/* Background Cart Image Decoration (Optional - subtle overlay) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex justify-center items-center">
         <img 
          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" 
          alt="cart-bg" 
          className="w-1/2 rotate-12"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo and Social Column */}
          <div className="flex flex-col items-start space-y-6">
            <div className="bg-black p-3 rounded-full border border-gray-800 shadow-xl">
              {/* Replace with your actual logo img */}
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-orange-400 font-bold text-2xl italic">
                SuK
              </div>
            </div>
            <div className="flex space-x-5">
              <a href="#" className="hover:text-orange-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-orange-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-orange-400 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-orange-400 transition-colors"><Linkedin size={20} /></a>
            </div>
            
            <div className="pt-4">
               <p className="text-sm font-semibold mb-4">Download App</p>
               <div className="flex space-x-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 cursor-pointer" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 cursor-pointer" />
               </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Delivery Information</a></li>
              <li><a href="#" className="hover:text-white transition">Goods & Services</a></li>
              <li><a href="#" className="hover:text-white transition">Shopping & Refund</a></li>
              <li><a href="#" className="hover:text-white transition text-sm">All Products e.g Home Appliances & more.</a></li>
            </ul>
          </div>

          {/* Account Column */}
          <div>
            <h3 className="text-xl font-bold mb-6">Account</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition">My Account</a></li>
              <li><a href="#" className="hover:text-white transition">Login / Register</a></li>
              <li><a href="#" className="hover:text-white transition">Cart</a></li>
              <li><a href="#" className="hover:text-white transition">Wishlist</a></li>
              <li><a href="#" className="hover:text-white transition">Shop</a></li>
            </ul>
          </div>

          {/* Quick Links & Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 italic">SuK</h3>
            <h4 className="text-lg font-semibold mb-6">Subscribe</h4>
            <p className="text-sm text-gray-400 mb-4">To Our Newsletter daily</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border border-gray-600 rounded-md py-3 px-4 pr-12 focus:outline-none focus:border-orange-400 transition"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <Send size={20} />
              </button>
            </div>
            
            <ul className="mt-8 space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms Of Use</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Orange Bottom Bar */}
      <div className="bg-[#fbb03b] py-4 text-black text-center font-medium">
        <p className="flex items-center justify-center gap-2">
          <span className="text-lg">©</span> Copyright Aol Tech 2022. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;