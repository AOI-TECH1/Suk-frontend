import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ShieldCheck, Lock } from 'lucide-react'; // Changed icons here
import api from '../../api/axios';
import toast from 'react-hot-toast';
import Img from '../../assets/sign-in.jpg'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/password/reset/', { email });
      setIsSent(true);
      toast.success("Reset link sent!");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Account not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 font-sans">
      
      {/* --- 1. HERO BANNER --- */}
      <div className="relative w-full h-48 md:h-64 bg-zinc-900 overflow-hidden flex items-center z-10">
        <img 
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop" 
          alt="Security" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white">
            <nav className="flex text-[10px] text-gray-300 font-black mb-3 uppercase tracking-[0.2em]">
                <Link to="/login" className="hover:text-[#fbb03b] transition-colors flex items-center gap-1">
                    <ArrowLeft size={12} /> Back to Login
                </Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter ">
                Recover <span className="text-[#fbb03b]">Access</span>
            </h1>
        </div>
      </div>

      {/* --- 2. RESET CARD --- */}
      <div className="flex items-center justify-center px-4 -mt-16 relative z-30">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl items-center border border-gray-100">
          
          <div className="p-2 space-y-8">
            {!isSent ? (
              <>
                <div>
                  <h2 className="text-3xl font-black text-black tracking-tight">Forgot Password?</h2>
                  <p className="text-gray-500 mt-2 font-medium text-sm">
                    Enter your email and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                    <div className="relative border-b-2 border-gray-100 focus-within:border-[#fbb03b] transition-colors">
                        <input
                            type="email"
                            required
                            placeholder="email@example.com"
                            className="w-full py-3 pl-8 bg-transparent outline-none font-bold"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Mail size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-black text-[#fbb03b] font-black py-5 rounded-2xl hover:bg-zinc-800 transition-all shadow-xl disabled:opacity-50 uppercase tracking-widest text-xs"
                  >
                    {loading ? "SENDING..." : "SEND RESET LINK"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-6 py-10">
                 <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck size={40} /> {/* Standard icon */}
                 </div>
                 <h2 className="text-3xl font-black text-black">Check Your Email</h2>
                 <p className="text-gray-500 font-medium">Link sent to <span className="text-black font-bold">{email}</span></p>
                 <button onClick={() => setIsSent(false)} className="text-xs font-black uppercase text-[#fbb03b] hover:underline">
                    Try another email
                 </button>
              </div>
            )}
          </div>

          <div className="hidden md:flex justify-center bg-gray-50 rounded-[40px] p-8 h-full items-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbb03b]/10 blur-3xl rounded-full"></div>
            <img src={Img} alt="Recovery" className="w-full h-auto object-contain rounded-2xl transform group-hover:scale-105 transition-transform duration-1000 z-10" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;