import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../api/authApi';
import toast from 'react-hot-toast';
import Img from '../../assets/Frame.png'; // Your student's image

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(formData);
      // Save token to local storage
      localStorage.setItem('token', res.data.access);
      
      // Update the Context (Brain) with user data
      setUser(res.data.user); 
      
      toast.success(`Welcome back, ${res.data.user.email}`);
      
      // Redirect based on role
      const role = res.data.user.role.toLowerCase();
      navigate(`/${role}/dashboard`);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Login failed. Check your details.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // This will trigger the Google Auth flow
    toast('Google login coming soon!', { icon: '🚀' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-xl items-center">
        
        {/* LEFT SIDE: FORM */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-black text-black tracking-tight">Log in to SuK</h2>
            <p className="text-gray-500 mt-2 font-medium">Enter your details below</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-orange-400 transition-colors"
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-orange-400 transition-colors"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-[#fbb03b] text-black font-bold py-4 rounded-xl hover:bg-orange-500 transition-all shadow-lg shadow-orange-100 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Log In"}
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border-2 border-gray-100 py-4 rounded-xl font-bold hover:bg-gray-50 transition"
              >
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="google" />
                Login with Google
              </button>
            </div>

            <div className="flex justify-between items-center text-sm">
              <Link to="/forgot-password" size="sm" className="text-red-500 font-bold hover:underline">
                Forgot Password?
              </Link>
              <p className="text-gray-500">
                New user? <Link to="/register" className="text-orange-500 font-bold hover:underline">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE: IMAGE */}
        <div className="hidden md:flex justify-center bg-orange-50 rounded-[40px] p-10 h-full items-center">
          <img 
            src={Img} 
            alt="SuK Shopping" 
            className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500" 
          />
        </div>

      </div>
    </div>
  );
};

export default Login;