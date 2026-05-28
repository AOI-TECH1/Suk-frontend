import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram 
} from "react-icons/fa";
import { 
  MdOutlineEmail, 
  MdOutlinePhone, 
  MdOutlineLocationOn, 
  MdChevronRight,
  MdOutlineAccessTime 
} from "react-icons/md";
import { IoSend } from "react-icons/io5";
import toast from 'react-hot-toast';

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent! Our team will contact you shortly.");
      setLoading(false);
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-28 font-sans">
      
      {/* --- 1. HERO BANNER --- */}
      <div className="relative w-full h-64 md:h-80 bg-zinc-900 overflow-hidden flex items-center z-10">
        <img 
          src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop" 
          alt="Contact SuK" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 w-full text-white">
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">
                <Link to="/" className="hover:text-[#fbb03b] transition-colors">Home</Link>
                <MdChevronRight size={16} className="text-[#fbb03b]" />
                <span className="text-white">Contact Us</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-[900] uppercase  tracking-tighter leading-none text-balance">
                Get In <span className="text-[#fbb03b]">Touch.</span>
            </h1>
            <p className="mt-4 text-gray-300 font-medium max-w-md text-sm border-l-2 border-[#fbb03b] pl-4">
                Have questions about your order or want to sell on SuK? We are here to help 24/7.
            </p>
        </div>
      </div>

      {/* --- 2. CONTACT CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT SIDE: CONTACT INFO CARDS */}
          <div className="space-y-6">
            <ContactInfoCard 
              icon={<MdOutlinePhone size={24} className="text-[#fbb03b]" />} 
              title="Call Us" 
              detail="+234 812 345 6789" 
              subDetail="Mon-Sat, 8am - 8pm"
            />
            <ContactInfoCard 
              icon={<MdOutlineEmail size={24} className="text-[#fbb03b]" />} 
              title="Email Us" 
              detail="support@sukmarket.com.ng" 
              subDetail="Online support 24/7"
            />
            <ContactInfoCard 
              icon={<MdOutlineLocationOn size={24} className="text-[#fbb03b]" />} 
              title="Visit Us" 
              detail="12, Victoria Island, Lagos" 
              subDetail="SuK Headquarters, Nigeria"
            />

            {/* Social Links Box */}
            <div className="bg-black text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-[#fbb03b]/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
               <h4 className="font-black uppercase text-xs tracking-[0.2em] mb-6">Follow our growth</h4>
               <div className="flex gap-6">
                  <a href="https://www.facebook.com/profile.php?id=61590081508588" target="_blank" rel="noopener noreferrer" className="hover:text-[#fbb03b] transition-all transform hover:scale-125"><FaFacebookF size={20}/></a>
                  <a href="https://x.com/SukPlace21226" target="_blank" rel="noopener noreferrer" className="hover:text-[#fbb03b] transition-all transform hover:scale-125"><FaTwitter size={20}/></a>
                  <a href="https://www.instagram.com/suukmarketplace/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fbb03b] transition-all transform hover:scale-125"><FaInstagram size={20}/></a>
               </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTACT FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-100 -mt-20 relative z-30">
               <h3 className="text-3xl font-black text-zinc-900 uppercase  tracking-tight mb-2">Send a Message</h3>
               <p className="text-gray-400 text-sm font-medium mb-10">Use the form below to reach our management team.</p>
               
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Your Name</label>
                        <input type="text" required className="contact-input" placeholder="Azeez Sodiq" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                        <input type="email" required className="contact-input" placeholder="name@example.com" />
                     </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                    <select className="contact-input appearance-none bg-transparent cursor-pointer">
                        <option>General Inquiry</option>
                        <option>Order Support</option>
                        <option>Seller Verification</option>
                        <option>Technical Issue</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">How can we help?</label>
                    <textarea required className="contact-input h-32 resize-none pt-4" placeholder="Type your message here..."></textarea>
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full bg-black text-[#fbb03b] font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm"
                  >
                    {loading ? "SENDING..." : "SEND MESSAGE"}
                    <IoSend size={18} />
                  </button>
               </form>
            </div>
          </div>

        </div>
      </div>

      {/* --- 3. DYNAMIC INTERACTIVE MAP --- */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
         <div className="w-full h-[500px] bg-gray-100 rounded-[60px] overflow-hidden border border-gray-100 shadow-2xl relative group">
            <iframe 
                title="SuK Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.717646698696!2d3.4184650758455793!3d6.430292524249103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8ad78848d70b%3A0xc319163863412574!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1716194784964!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover:grayscale-0 transition-all duration-1000"
            ></iframe>
            
            {/* Elegant Floating Badge over Map */}
            <div className="absolute top-10 left-10 z-10 bg-black/90 backdrop-blur-md p-6 rounded-[32px] border border-white/10 shadow-2xl pointer-events-none transition-transform group-hover:-translate-y-2">
                <div className="flex items-center gap-4">
                    <div className="bg-[#fbb03b] p-3 rounded-2xl">
                        <MdOutlineLocationOn size={24} className="text-black" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Headquarters</p>
                        <p className="text-white font-black text-sm uppercase ">Victoria Island, Lagos</p>
                    </div>
                </div>
            </div>

            {/* Inner Border Frame (The High-End SuK Look) */}
            <div className="absolute inset-0 pointer-events-none border-[12px] md:border-[24px] border-white/40 rounded-[60px]"></div>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-input {
          width: 100%;
          border-bottom: 2px solid #f3f4f6;
          padding: 0.8rem 0.25rem;
          background: transparent;
          font-weight: 600;
          outline: none;
          transition: all 0.3s ease;
        }
        .contact-input:focus {
          border-color: #fbb03b;
          padding-left: 0.5rem;
        }
      `}} />

    </div>
  );
};

const ContactInfoCard = ({ icon, title, detail, subDetail }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-xl transition-all group cursor-default">
     <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-[#fbb03b] group-hover:text-white">
        {icon}
     </div>
     <div>
        <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 leading-none">{title}</h4>
        <p className="font-black text-zinc-900 text-sm mt-1.5">{detail}</p>
        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">{subDetail}</p>
     </div>
  </div>
);

export default Contact;