import React, { useState, useEffect } from 'react';
import { Hero } from './landing/Hero';
import { Features } from './landing/Features';
import { Services } from './landing/Services';
import { Contact } from './landing/Contact';
import { CartDropdown } from './landing/CartDropdown';
import { ArrowUp, ShoppingCart, User, Menu, X, Leaf } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';
import UserDashboard from '@/components/UserDashboard';

// Images
const PRODUCT_IMAGES = {
    banana: "https://d64gsuwffb70l.cloudfront.net/694ea68745fe3a9aa1890d75_1766762219829_8777ea65.png",
    aloe: "https://d64gsuwffb70l.cloudfront.net/694ea68745fe3a9aa1890d75_1766762234013_c4d72bab.jpg",
    strawberry: "https://d64gsuwffb70l.cloudfront.net/694ea68745fe3a9aa1890d75_1766762251297_bd9768ae.png"
};

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

const LandingPage = () => {
    const {
        user,
        profile,
        loading: authLoading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateProfile,
        getOrders,
        getPaymentMethods,
        addPaymentMethod,
        deletePaymentMethod,
        setDefaultPaymentMethod,
        saveCart,
        loadCart
    } = useAuth();

    // Products Data
    const products = [
        {
            id: 1,
            tag: "Ready for Dispatch",
            tagColor: "bg-emerald-500",
            title: "Cavendish Banana (G9)",
            price: 1500,
            image: PRODUCT_IMAGES.banana
        },
        {
            id: 2,
            tag: "Limited Stock",
            tagColor: "bg-amber-500",
            title: "Aloe Vera Offshoots",
            price: 750,
            image: PRODUCT_IMAGES.aloe
        },
        {
            id: 3,
            tag: "New Arrival",
            tagColor: "bg-lime-500",
            title: "Strawberry Runners",
            price: 1200,
            image: PRODUCT_IMAGES.strawberry
        }
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const [addedToCart, setAddedToCart] = useState<number | null>(null);

    // Load cart from database when user logs in
    useEffect(() => {
        if (user) {
            loadCart().then((savedCart) => {
                if (savedCart && savedCart.length > 0) {
                    setCartItems(savedCart);
                }
            });
        }
    }, [user]);

    // Save cart to database when it changes (for logged-in users)
    useEffect(() => {
        if (user && cartItems.length > 0) {
            saveCart(cartItems);
        }
    }, [cartItems, user]);

    // Scroll Handler
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToShop = () => {
        const element = document.getElementById('shop-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Cart Functions
    const addToCart = (product: any) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.image
            }];
        });
        setAddedToCart(product.id);
        setShowCartDropdown(true);
        setTimeout(() => setAddedToCart(null), 1500);
    };

    const removeFromCart = (productId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen font-sans bg-[hsl(var(--cream-bg))] text-[hsl(var(--foreground))]">

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}>
                <div className="container mx-auto px-6 flex justify-between items-center relative">
                    {/* Logo */}
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img
                            src="/white%20logo.png"
                            alt="Nasholi Logo"
                            className="h-20 w-auto object-contain"
                        />
                    </div>

                    {/* Desk Menu */}
                    <div className={`hidden md:flex items-center gap-8 ${isScrolled ? 'text-[hsl(var(--dark-green))]' : 'text-[hsl(var(--cream-bg))]'}`}>
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[hsl(var(--accent-orange))] transition-colors font-medium">Home</button>
                        <button onClick={scrollToShop} className="hover:text-[hsl(var(--accent-orange))] transition-colors font-medium">Varieties</button>
                        <button className="hover:text-[hsl(var(--accent-orange))] transition-colors font-medium">Process</button>
                        {user && (
                            <button className="hover:text-[hsl(var(--accent-orange))] transition-colors font-medium">History</button>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setShowCartDropdown(!showCartDropdown)}
                                className={`p-2 rounded-full transition-colors relative ${isScrolled ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'}`}
                            >
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[hsl(var(--accent-orange))] text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* Cart Dropdown */}
                            {showCartDropdown && (
                                <CartDropdown
                                    cartItems={cartItems}
                                    user={user}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeFromCart}
                                    onCheckout={() => console.log('Checkout')}
                                    onSignIn={() => { setShowCartDropdown(false); setShowAuthModal(true); }}
                                />
                            )}
                        </div>

                        {user ? (
                            <button
                                onClick={() => setShowDashboard(true)}
                                className="w-10 h-10 rounded-full bg-[hsl(var(--accent-orange))] text-white flex items-center justify-center font-bold"
                            >
                                {profile?.full_name?.[0] || <User size={18} />}
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className={`px-5 py-2 rounded-full font-semibold transition-all ${isScrolled
                                    ? 'bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))]/90'
                                    : 'bg-[hsl(var(--cream-bg))] text-[hsl(var(--dark-green))] hover:bg-white'
                                    }`}
                            >
                                Get Started
                            </button>
                        )}

                        <button
                            className="md:hidden text-gray-500"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg p-6 flex flex-col gap-4 md:hidden border-t">
                        <button className="text-left py-2 border-b">Home</button>
                        <button onClick={() => { scrollToShop(); setMobileMenuOpen(false); }} className="text-left py-2 border-b">Varieties</button>
                        <button className="text-left py-2 border-b">Process</button>
                        <button onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false); }} className="text-left py-2 text-[hsl(var(--primary))] font-bold">Sign In</button>
                    </div>
                )}
            </nav>

            {/* Components Layering */}
            <main>
                <Hero onShopClick={scrollToShop} />
                <Features />
                <div id="shop-section">
                    <Services products={products} onAddToCart={addToCart} />
                </div>
                <Contact />
            </main>

            {/* Footer mockup */}
            <footer className="bg-[hsl(var(--dark-green))] text-[hsl(var(--cream-bg))] py-12 text-center">
                <div className="flex justify-center mb-6">
                    <img
                        src="/white%20logo.png"
                        alt="Nasholi Logo"
                        className="h-16 w-auto object-contain opacity-90"
                    />
                </div>
                <p>&copy; 2024 Nasholi Agriculture. All rights reserved.</p>
            </footer>

            {/* Scroll to Top */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 w-12 h-12 bg-[hsl(var(--accent-orange))] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-40 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <ArrowUp size={20} />
            </button>

            {/* Modals */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={() => setShowAuthModal(false)}
                signUp={signUp}
                signIn={signIn}
                resetPassword={resetPassword}
            />

            <UserDashboard
                isOpen={showDashboard}
                onClose={() => setShowDashboard(false)}
                profile={profile}
                updateProfile={updateProfile}
                getOrders={getOrders}
                getPaymentMethods={getPaymentMethods}
                addPaymentMethod={addPaymentMethod}
                deletePaymentMethod={deletePaymentMethod}
                setDefaultPaymentMethod={setDefaultPaymentMethod}
                signOut={signOut}
            />
        </div>
    );
};

export default LandingPage;
