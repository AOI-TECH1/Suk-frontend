import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/authApi';
import toast from 'react-hot-toast';
import Img from '../../assets/Frame.png';

const BuyerRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'BUYER' // Hardcoded for this page
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      await registerUser(formData);
      toast.success("Buyer account created! Welcome to SuK.");
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* LEFT SIDE: FORM */}
        <div className="p-8 md:p-12 space-y-6">
          <Link to="/" className="text-orange-500 font-bold text-xl italic">SuK</Link>
          <div>
            <h2 className="text-3xl font-black text-gray-900">Create Buyer Account</h2>
            <p className="text-gray-500 mt-2">Start shopping the best deals today.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <input type="text" name="full_name" placeholder="Full Name" required className="w-full border-b-2 border-gray-100 py-3 focus:outline-none focus:border-orange-400" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email address" required className="w-full border-b-2 border-gray-100 py-3 focus:outline-none focus:border-orange-400" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required className="w-full border-b-2 border-gray-100 py-3 focus:outline-none focus:border-orange-400" onChange={handleChange} />
            <input type="password" name="confirm_password" placeholder="Confirm Password" required className="w-full border-b-2 border-gray-100 py-3 focus:outline-none focus:border-orange-400" onChange={handleChange} />

            <button disabled={loading} type="submit" className="w-full bg-[#fbb03b] text-black font-bold py-4 rounded-xl hover:bg-orange-500 transition-all shadow-lg mt-4">
              {loading ? "Joining..." : "Join as Buyer"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Want to sell products? <Link to="/register-seller" className="text-orange-500 font-bold">Register as Seller</Link>
          </p>
        </div>

        {/* RIGHT SIDE: VISUAL */}
        <div className="hidden md:flex flex-col justify-center bg-orange-400 p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Shop the Best.</h2>
            <p className="opacity-90">Access thousands of products from verified sellers across the country.</p>
            <img src={Img} alt="Buyer" className="w-full mt-10 transform -rotate-6" />
        </div>
      </div>
    </div>
  );
};

export default BuyerRegister;