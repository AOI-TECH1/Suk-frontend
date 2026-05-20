import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2, Users, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

// API & Context
import { loginUser, getUserData } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';

const StaffLogin = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    // 1. AUTO-REDIRECT if already logged in (Checks on mount)
    useEffect(() => {
        if (user && (user.role === 'ADMIN' || user.role === 'MANAGER')) {
            console.log("Staff session active, redirecting...");
            navigate('/staff/dashboard'); // Use /staff/dashboard
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Step A: Auth call
            const res = await loginUser(credentials);
            const { access, refresh } = res.data;

            // Set tokens first so subsequent calls are authorized
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);

            // Step B: Get Profile Data immediately
            const userRes = await getUserData();
            const staffUser = userRes.data;

            // Step C: Role Gate
            if (staffUser.role === 'ADMIN' || staffUser.role === 'MANAGER') {
                // Update Context
                setUser(staffUser);
                
                toast.success(`Access Authorized: Terminal ${staffUser.role} Active`);
                
                // CRITICAL: Navigate to the route defined in your App.jsx
                // Use a short timeout to ensure state has settled
                setTimeout(() => {
                    navigate('/staff/dashboard');
                }, 100);
            } else {
                localStorage.clear();
                toast.error("Access Denied: Personnel authorization failed.");
            }
        } catch (error) {
            console.error("Auth Failure:", error);
            const message = error.response?.data?.detail || "System Access Denied";
            toast.error(message);
            localStorage.clear(); // Cleanup on failure
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 font-sans relative overflow-hidden">
            {/* Visual background elements - no changes needed here */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#fbb03b]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="w-full max-w-md relative z-10">
                <header className="text-center mb-10">
                    <div className="relative inline-block mb-6 group">
                        <div className="absolute inset-0 bg-[#fbb03b] blur-2xl opacity-10 group-hover:opacity-30 transition-opacity animate-pulse"></div>
                        <div className="relative p-5 bg-[#fbb03b] rounded-[32px] shadow-2xl">
                            <ShieldCheck size={44} className="text-black" strokeWidth={2.5} />
                        </div>
                    </div>
                    <h1 className="text-4xl font-[900] text-white italic uppercase tracking-tighter leading-none">
                        SuK <span className="text-[#fbb03b]">Staff</span>
                    </h1>
                </header>

                <main className="bg-white rounded-[50px] p-10 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-7">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Staff Identifier</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#fbb03b]" size={18} />
                                <input type="email" name="email" required value={credentials.email} onChange={handleChange} placeholder="name@suk.com" className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:bg-white focus:border-[#fbb03b] transition-all outline-none" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Access Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#fbb03b]" size={18} />
                                <input type="password" name="password" required value={credentials.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:bg-white focus:border-[#fbb03b] transition-all outline-none" />
                            </div>
                        </div>

                        <button disabled={loading} type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#fbb03b] hover:text-black transition-all shadow-xl active:scale-95 disabled:opacity-70 group">
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Log into Terminal <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1" /></>}
                        </button>
                    </form>

                    <footer className="mt-8 pt-8 border-t border-gray-100 text-center">
                        <Link to="/" className="text-[#fbb03b] font-black text-[10px] uppercase underline tracking-widest">Marketplace Exit</Link>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default StaffLogin;