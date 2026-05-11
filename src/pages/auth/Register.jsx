import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, googleLogin } from '../../api/authApi';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import Img from '../../assets/Frame.png'; 

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'BUYER' // Automatically Buyer
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) return toast.error("Passwords do not match!");

    setLoading(true);
    try {
      await registerUser(formData);
      toast.success("Account created! Please login.");
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      // For Google signup, we send the token and the role 'BUYER'
      const res = await googleLogin(credentialResponse.credential, 'BUYER');
      localStorage.setItem('token', res.data.access);
      toast.success("Signed up with Google!");
      navigate('/buyer/dashboard');
    } catch (error) {
      toast.error("Google Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* FORM SIDE */}
        <div className="p-8 md:p-12 space-y-6">
          <h2 className="text-3xl font-black text-black">Join SuK</h2>
          <p className="text-gray-500">Create your buyer account to start shopping.</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input type="text" name="full_name" placeholder="Full Name" required className="w-full border-b-2 py-3 focus:outline-none focus:border-orange-400" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email address" required className="w-full border-b-2 py-3 focus:outline-none focus:border-orange-400" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required className="w-full border-b-2 py-3 focus:outline-none focus:border-orange-400" onChange={handleChange} />
            <input type="password" name="confirm_password" placeholder="Confirm Password" required className="w-full border-b-2 py-3 focus:outline-none focus:border-orange-400" onChange={handleChange} />

            <button disabled={loading} className="w-full bg-[#fbb03b] text-black font-bold py-4 rounded-xl hover:bg-orange-500 transition-all shadow-lg">
              {loading ? "Creating Account..." : "Create Buyer Account"}
            </button>

            <div className="flex justify-center py-2">
              <GoogleLogin onSuccess={handleGoogleSignup} text="signup_with" shape="pill" />
            </div>
          </form>

          <p className="text-center text-sm text-gray-500">
            Want to sell? <Link to="/register-seller" className="text-orange-500 font-bold">Register as Seller</Link>
          </p>
        </div>

        {/* IMAGE SIDE */}
        <div className="hidden md:flex flex-col justify-center bg-orange-50 p-12 text-center">
            <img src={Img} alt="Buyer" className="w-full object-contain" />
            <h3 className="text-2xl font-bold mt-6 text-orange-600">The Best Deals Await.</h3>
        </div>
      </div>
    </div>
  );
};

export default Register;