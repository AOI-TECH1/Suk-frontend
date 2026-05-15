import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn 
} from "react-icons/fa";
import { MdOutlineLocalShipping, MdOutlineHeadsetMic, MdVerifiedUser } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { BsShieldCheck } from "react-icons/bs";

// Asset Imports
import suk_logo from "../../assets/logos/logo-suuk.png";
import play from "../../assets/google-play.png";
import app_store from "../../assets/app-store.png";

const Footer = () => {
  return (
    <footer className="w-full font-sans bg-[#0a0c0c]">
      
      {/* --- SECTION 1: FEATURES (White Bar) --- */}
      <div className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature icon={<MdOutlineLocalShipping size={24}/>} title="Free and Fast Delivery" desc="Orders over $140" />
            <Feature icon={<MdOutlineHeadsetMic size={24}/>} title="24/7 Service" desc="Friendly customer support" />
            <Feature icon={<MdVerifiedUser size={24}/>} title="Money Back" desc="Return within 30 days" />
            <Feature icon={<BsShieldCheck size={24}/>} title="Quality" desc="Certified sellers" />
          </div>
        </div>
      </div>

      {/* --- SECTION 2: MAIN FOOTER (Dark Bar) --- */}
      <div className="bg-[#0a0c0c] text-white pt-16 pb-12 relative overflow-hidden">
        
        {/* Background Decorative Cart */}
        <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none">
            <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" className="w-96 rotate-12 invert" alt="" />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* COL 1: LOGO & SOCIALS */}
            <div className="lg:col-span-1">
              <img src={suk_logo} alt="SuK" className="h-12 mb-6 object-contain" />
              <div className="flex gap-4">
                <SocialLink icon={<FaFacebookF />} link="https://facebook.com" />
                <SocialLink icon={<FaTwitter />} link="https://twitter.com" />
                <SocialLink icon={<FaInstagram />} link="https://instagram.com" />
                <SocialLink icon={<FaLinkedinIn />} link="https://linkedin.com" />
              </div>
            </div>

            {/* COL 2: SERVICES */}
            <div>
              <h4 className="footer-title">Our Services</h4>
              <ul className="footer-list">
                {/* Use Link to instead of a href */}
                <li><Link to="/delivery-info">Delivery Info</Link></li>
                <li><Link to="/services">Goods & Services</Link></li>
                <li><Link to="/refund-policy">Refund Policy</Link></li>
              </ul>
            </div>

            {/* COL 3: ACCOUNT */}
            <div>
              <h4 className="footer-title">Account</h4>
              <ul className="footer-list">
                <li><Link to="/login">Login / Register</Link></li>
                <li><Link to="/cart">Cart <span className="text-orange-500">✔</span></Link></li>
                <li><Link to="/wishlist">Wishlist</Link></li>
              </ul>
              <div className="mt-6">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-3">Download App</p>
                <div className="flex gap-2">
                  <a href="#" className="w-24"><img src={play} alt="Google Play" className="w-full" /></a>
                  <a href="#" className="w-24"><img src={app_store} alt="App Store" className="w-full" /></a>
                </div>
              </div>
            </div>

            {/* COL 4: QUICK LINKS */}
            <div>
              <h4 className="footer-title">Quick Link</h4>
              <ul className="footer-list">
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms Of Use</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>

            {/* COL 5: SUBSCRIBE */}
            <div>
              <h4 className="footer-title">Newsletter</h4>
              <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">Subscribe to get latest updates.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="w-full bg-white/5 border border-white/20 rounded-md py-2 px-3 text-xs focus:border-[#fbb03b] outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#fbb03b] hover:text-white transition-colors">
                  <IoSendSharp />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- SECTION 3: COPYRIGHT --- */}
      <div className="bg-[#fbb03b] py-3 text-center flex items-center justify-center">
        <p className="text-black text-[10px] font-black uppercase tracking-widest">
            © Copyright Aol Tech {new Date().getFullYear()}. All right reserved
        </p>
      </div>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-title { color: #fbb03b; font-weight: 900; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.1em; margin-bottom: 1.5rem; }
        .footer-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
        .footer-list a { color: #9ca3af; text-decoration: none; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; transition: color 0.2s; cursor: pointer; }
        .footer-list a:hover { color: white; }
      `}} />
    </footer>
  );
};

// Sub-components
const Feature = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4 transition-all group-hover:bg-[#fbb03b] group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-[11px] font-black uppercase text-black">{title}</h3>
    <p className="text-[10px] text-gray-500">{desc}</p>
  </div>
);

const SocialLink = ({ icon, link }) => (
  <a href={link} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#fbb03b] hover:border-[#fbb03b] transition-all">
    {icon}
  </a>
);

export default Footer;