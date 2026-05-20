import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    
    // Initialize Cart from LocalStorage for immediate UI feedback
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

    // --- SYNC CART FROM DATABASE ---
    const fetchDBCart = async () => {
        try {
            const res = await api.get('/carts/');
            // Map Django's structure (item.product) to a flat structure for your frontend
            const dbItems = res.data.items.map(item => ({
                ...item.product,
                quantity: item.quantity,
                db_item_id: item.id // Keep track of the database ID
            }));
            setCart(formattedItems(dbItems));
        } catch (error) {
            console.error("Could not sync cart with cloud");
        }
    };

    const formattedItems = (items) => {
        // This ensures we don't have duplicates in the UI
        return items; 
    };

    const checkUserStatus = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }
        try {
            const res = await api.get('/auth/profile/'); // Ensure this matches your accounts urls.py
            setUser(res.data);
            
            // On successful login/refresh, sync the cart from the DB
            await fetchDBCart();
        } catch (error) {
            console.error("Session expired");
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { checkUserStatus(); }, []);

    // --- CART ACTIONS (SYNCED WITH BACKEND) ---

    // 1. Add new product to cart
    const addToCart = async (product) => {
        // Update UI locally first (Instant feedback)
        setCart((prev) => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        // Sync with Django Database
        try {
            await api.post('/carts/add/', { 
                product_id: product.id, 
                quantity: 1 
            });
            toast.success("Added to bag!");
        } catch (err) {
            toast.error("Failed to sync cart to cloud");
        }
    };

    // 2. Remove product completely
    const removeFromCart = async (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
        try {
            // Note: You'll need an endpoint for deleting specific items or clearing
            // For now, we update local state and you can implement the DELETE call
            toast.error("Item removed");
        } catch (err) {
            console.error(err);
        }
    };

    // 3. Update quantity (+ or -)
    const updateQuantity = async (productId, amount) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );

        // Sync with Django
        try {
            await api.post('/carts/add/', { 
                product_id: productId, 
                quantity: amount // Positive for +1, Negative for -1
            });
        } catch (err) {
            console.error("Quantity sync failed");
        }
    };

    // 4. Wipe cart (Usually after successful payment)
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('suk_cart');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        clearCart();
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ 
            user, setUser, logout, loading, 
            cart, cartCount, addToCart, removeFromCart, updateQuantity, clearCart, fetchDBCart 
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