import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/authApi';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import Img from '../../assets/Frame.png'; 

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // 1. Updated State to include all fields required by your Django CustomUser model
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'BUYER',
    country: 'Nigeria', // Defaulting to Nigeria as per your model
    state: '',
    Area: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- GOOGLE SIGN UP ---
  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await api.post('/auth/google/', { 
          access_token: tokenResponse.access_token 
        });
        localStorage.setItem('token', res.data.access);
        toast.success("Joined SuK via Google!");
        navigate('/buyer/dashboard');
      } catch (error) {
        toast.error("Google registration failed.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => toast.error("Google Sign-up failed."),
  });

  // --- EMAIL SIGN UP LOGIC ---
  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic Validations
    if (formData.password !== formData.confirm_password) {
      return toast.error("Passwords do not match!");
    }
    if (formData.password.length < 6) {
      return toast.error("Password is too short (min 6 characters)");
    }

    setLoading(true);
    try {
      // 2. Send the full formData to your backend
      await registerUser(formData);
      toast.success("Account created! Welcome to SuK.");
      navigate('/login');
    } catch (error) {
      // 3. Specific error handling for existing users
      const errorData = error.response?.data;
      if (errorData?.email) {
        toast.error("An account with this email already exists.");
      } else {
        toast.error(errorData?.detail || "Registration failed. Please check all fields.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20">
      
      {/* --- HERO BANNER --- */}
      <div className="relative w-full h-48 md:h-64 bg-zinc-900 overflow-hidden flex items-center z-10">
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
          alt="Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white">
            <nav className="flex text-[10px] font-black uppercase tracking-widest mb-3">
                <Link to="/" className="hover:text-[#fbb03b]">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-[#fbb03b]">Register</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight ">
                Create <span className="text-[#fbb03b]">Account</span>
            </h1>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 -mt-16 relative z-30">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
          
          <div className="p-8 md:p-12 space-y-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Join SuK</h2>
              <p className="text-gray-500 mt-2 font-medium text-sm">Become a shopper and enjoy exclusive deals.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                  <input type="text" name="full_name" placeholder="Full Name" required className="register-input" onChange={handleChange} />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                  <input type="email" name="email" placeholder="email@example.com" required className="register-input" onChange={handleChange} />
                </div>

                {/* New Fields: State and Area (Required by your model) */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">State</label>
                      <input type="text" name="state" placeholder="Lagos" required className="register-input" onChange={handleChange} />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Area</label>
                      <input type="text" name="Area" placeholder="Ikeja" required className="register-input" onChange={handleChange} />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <input type="password" name="password" placeholder="Password" required className="register-input" onChange={handleChange} />
                   <input type="password" name="confirm_password" placeholder="Confirm" required className="register-input" onChange={handleChange} />
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <button disabled={loading} type="submit" className="w-full bg-[#fbb03b] text-black font-black py-4 rounded-2xl hover:bg-orange-500 shadow-lg shadow-orange-100 uppercase tracking-widest text-sm">
                  {loading ? "JOINING..." : "CREATE ACCOUNT"}
                </button>

                <button
                  type="button"
                  onClick={() => handleGoogleSignUp()}
                  className="w-full flex items-center justify-center gap-3 border-2 border-gray-100 py-4 rounded-2xl font-black hover:bg-gray-50 transition text-[10px] uppercase tracking-widest"
                >
                  <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="google" />
                  Sign up with Google
                </button>
              </div>
            </form>

            <div className="pt-6 space-y-4 text-center border-t border-gray-100">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                  Already a member? <Link to="/login" className="text-black font-black hover:underline underline-offset-4">LOG IN</Link>
                </p>
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center justify-between">
                   <p className="text-[10px] text-orange-800 font-black uppercase tracking-widest">Business Owner?</p>
                   <Link to="/setup-store" className="text-[10px] font-black text-orange-600 underline">
                     SELL ON SUK
                   </Link>
                </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col justify-center items-center bg-[#fbb03b] p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-5xl font-black text-black mb-4 ">Join the <br />Community.</h2>
                <p className="text-black/60 font-medium max-w-xs mx-auto text-sm">Create an account to track orders, save items, and receive personalized deals.</p>
                <img src={Img} alt="User Illustration" className="w-full max-w-[280px] drop-shadow-2xl mx-auto mt-12" />
              </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .register-input {
          width: 100%;
          border-bottom: 2px solid #f3f4f6;
          padding: 0.75rem 0.2rem;
          background: transparent;
          font-weight: 600;
          outline: none;
          transition: border-color 0.3s;
        }
        .register-input:focus {
          border-color: #fbb03b;
        }
      `}} />
    </div>
  );
};

export default Register;