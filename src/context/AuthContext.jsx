import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    
    // Global Cart State (Initialized from LocalStorage)
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('suk_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('suk_cart', JSON.stringify(cart));
    }, [cart]);

    // Derived State: Total items in cart
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const checkUserStatus = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }
        try {
            // Ensure this matches your Django path (usually /api/auth/user/)
            const res = await api.get('/auth/user/'); 
            setUser(res.data);
        } catch (error) {
            console.error("Session expired");
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { checkUserStatus(); }, []);

    // --- CART ACTIONS ---

    // 1. Add new product to cart
    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                toast.success(`Updated ${product.name} quantity`);
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            toast.success("Added to bag!");
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // 2. Remove product completely
    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
        toast.error("Item removed");
    };

    // 3. Update quantity (+ or -) - REQUIRED FOR NAVBAR BUTTONS
    const updateQuantity = (productId, amount) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };

    // 4. Wipe cart
    const clearCart = () => setCart([]);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        clearCart();
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ 
            user, setUser, logout, loading, 
            cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart 
        }}>
            {!loading ? children : (
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-[#fbb03b] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Syncing SuK...</p>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);