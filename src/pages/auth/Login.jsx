import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser, getUserData } from '../../api/authApi'; // Added getUserData
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import Img from '../../assets/sign-in.jpg'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * --- GOOGLE LOGIN ---
   */
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await api.post('/auth/google/', { 
          access_token: tokenResponse.access_token 
        });

        const jwtToken = res.data.access || res.data.token;
        if (jwtToken) {
          localStorage.setItem('token', jwtToken);
          
          // FETCH USER DETAILS after getting token
          const userRes = await getUserData();
          setUser(userRes.data);
          
          toast.success("Google Login Successful!");
          navigate(`/${userRes.data.role.toLowerCase()}/dashboard`);
        }
      } catch (error) {
        console.error("Google Error:", error.response?.data);
        toast.error("Google authentication failed on SuK server.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => toast.error("Google Login Cancelled"),
  });

  /**
   * --- TRADITIONAL LOGIN ---
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Get the token
      const res = await loginUser(formData);
      const jwtToken = res.data.access || res.data.token;

      if (jwtToken) {
        // 2. Save token
        localStorage.setItem('token', jwtToken);

        // 3. GET USER DETAILS (Fixes the "Dash Name" and "Navbar not updating" issue)
        const userRes = await getUserData();
        const userData = userRes.data;

        // 4. Update Context
        setUser(userData); 
        
        toast.success(`Welcome back, ${userData.full_name || 'User'}`);
        
        // 5. Redirect
        const role = userData.role.toLowerCase();
        navigate(`/${role}/dashboard`);
      }
    } catch (error) {
        console.error("Login error", error.response?.data);
        toast.error(error.response?.data?.detail || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 font-sans">
      
      {/* 1. HEADER BANNER */}
      <div className="relative w-full h-48 md:h-64 bg-zinc-900 overflow-hidden flex items-center z-10">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" alt="Banner" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white">
            <nav className="flex text-[10px] text-gray-300 font-black mb-3 uppercase tracking-[0.2em]">
                <Link to="/" className="hover:text-[#fbb03b] transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-[#fbb03b]">Login</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">My <span className="text-[#fbb03b]">Account</span></h1>
        </div>
      </div>

      {/* 2. LOGIN CARD */}
      <div className="flex items-center justify-center px-4 -mt-16 relative z-30">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl items-center border border-gray-100">
          
          <div className="p-2 space-y-8">
            <div>
              <h2 className="text-3xl font-black text-black tracking-tight">Log in to SuK</h2>
              <p className="text-gray-500 mt-2 font-medium text-sm">Enter your credentials to access your dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                <input type="email" name="email" placeholder="name@example.com" required className="w-full border-b-2 border-gray-100 py-3 px-1 focus:outline-none focus:border-[#fbb03b] transition-colors bg-transparent font-bold" onChange={handleChange} />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
                <input type="password" name="password" placeholder="••••••••" required className="w-full border-b-2 border-gray-100 py-3 px-1 focus:outline-none focus:border-[#fbb03b] transition-colors bg-transparent font-bold" onChange={handleChange} />
              </div>

              <div className="flex flex-col gap-4 pt-2">
                <button disabled={loading} type="submit" className="w-full bg-[#fbb03b] text-black font-black py-4 rounded-2xl hover:bg-orange-500 transition-all shadow-lg uppercase text-sm">
                  {loading ? "AUTHENTICATING..." : "SIGN IN"}
                </button>

                <button type="button" onClick={() => handleGoogleLogin()} disabled={loading} className="w-full flex items-center justify-center gap-3 border-2 border-gray-100 py-4 rounded-2xl font-black hover:bg-gray-50 transition text-[10px] uppercase tracking-widest">
                  <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="google" />
                  Continue with Google
                </button>
              </div>

              <div className="flex justify-between items-center text-[10px] pt-5 border-t border-gray-50 mt-6 font-black uppercase tracking-widest">
                <Link to="/forgot-password" size="sm" className="text-red-500 hover:underline">Forgot Password?</Link>
                <p className="text-gray-400">New user? <Link to="/register" className="text-[#fbb03b] hover:underline">Create Account</Link></p>
              </div>
            </form>
          </div>

          <div className="hidden md:flex justify-center bg-gray-50 rounded-[40px] p-8 h-full items-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbb03b]/10 blur-3xl rounded-full"></div>
            <img src={Img} alt="SuK Experience" className="w-full h-auto object-contain rounded-2xl transform group-hover:scale-105 transition-transform duration-1000 z-10" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;