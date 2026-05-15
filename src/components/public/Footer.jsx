import React from 'react';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, 
  FaGooglePlay, FaApple 
} from "react-icons/fa";
import { MdOutlineLocalShipping, MdOutlineHeadsetMic, MdVerifiedUser } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { BsShieldCheck } from "react-icons/bs";
import suk_logo from "../../assets/logos/logo-suuk.png";
import play from "../../assets/google-play.png"
import app_store from "../../assets/app-store.png"

const Footer = () => {
  return (
    <footer className="w-full font-sans bg-[#0a0c0c] ">
      
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
        
        {/* Background Decorative Cart (Fixed size so it doesn't scatter) */}
        <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none">
            <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" className="w-96 rotate-12 invert" alt="" />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* COL 1: LOGO */}
            <div className="lg:col-span-1">
              <img src={suk_logo} alt="SuK" className="h-12 mb-6 object-contain" />
              <div className="flex gap-4">
                <SocialLink icon={<FaFacebookF />} />
                <SocialLink icon={<FaTwitter />} />
                <SocialLink icon={<FaInstagram />} />
                <SocialLink icon={<FaLinkedinIn />} />
              </div>
            </div>

            {/* COL 2: SERVICES */}
            <div>
              <h4 className="footer-title">Our Services</h4>
              <ul className="footer-list">
                <li><a href="#">Delivery Info</a></li>
                <li><a href="#">Goods & Services</a></li>
                <li><a href="#">Refund Policy</a></li>
              </ul>
            </div>

            {/* COL 3: QUICK LINKS */}
            <div>
              <h4 className="footer-title">Account</h4>
              <ul className="footer-list">
                <li><a href="#">Login / Register</a></li>
                <li><a href="#">Cart</a></li>
                <li><a href="#">Wishlist</a></li>
              </ul>
              <div className="mt-6">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-3">Download App</p>
                <div className="flex gap-2">
                 <div> <img src={play} alt="" width="100%" /></div>
                  <div><img src={app_store} alt="" width="100%" /></div>
                </div>
              </div>
            </div>

            {/* COL 4: QUICK LINKS */}
            <div>
              <h4 className="footer-title">Quick Link</h4>
              <ul className="footer-list">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms Of Use</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>

            {/* COL 5: SUBSCRIBE */}
            <div>
        
              <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">Subscribe to get latest updates.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="w-full bg-white/5 border border-white/20 rounded-md py-2 px-3 text-xs focus:border-[#fbb03b] outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#fbb03b]">
                  <IoSendSharp />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- SECTION 3: COPYRIGHT --- */}
      <div className="bg-[#fba834] py-2 text-center flex items-center justify-content-center">
        <p className="text-black text-[10px] font-black uppercase tracking-widest">
            © Copyright Aol Tech 2026. All right reserved
        </p>
      </div>

      {/* Custom Styles to prevent scattering if tailwind is slow */}
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-title { color: #fbb03b; font-weight: 900; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.1em; margin-bottom: 1.5rem; }
        .footer-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
        .footer-list a { color: #9ca3af; text-decoration: none; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; transition: color 0.2s; }
        .footer-list a:hover { color: white; }
      `}} />
    </footer>
  );
};

// Sub-components to keep code clean
const Feature = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4 transition-colors hover:bg-[#fbb03b]">
      {icon}
    </div>
    <h3 className="text-[11px] font-black uppercase text-black">{title}</h3>
    <p className="text-[10px] text-gray-500">{desc}</p>
  </div>
);

const SocialLink = ({ icon }) => (
  <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#fbb03b] hover:border-[#fbb03b] transition-all">
    {icon}
  </a>
);

const DownloadBtn = ({ icon, top, bottom }) => (
  <button className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 rounded-lg hover:bg-white/10 transition-all w-32">
    <span className="text-[#fbb03b]">{icon}</span>
    <div className="text-left leading-none">
      <p className="text-[7px] text-gray-500 uppercase">{top}</p>
      <p className="text-[10px] font-bold">{bottom}</p>
    </div>
  </button>
);

export default Footer;