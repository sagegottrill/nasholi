import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Microscope, 
  Sun, 
  Sprout, 
  CheckCircle, 
  Leaf, 
  FlaskConical,
  Mail, 
  Phone, 
  MapPin,
  Menu,
  X,
  ChevronRight,
  Shield,
  Truck,
  ArrowRight,
  Play,
  User,
  LogIn
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';
import UserDashboard from '@/components/UserDashboard';

// Image URLs
const HERO_IMAGE = "https://d64gsuwffb70l.cloudfront.net/694ea68745fe3a9aa1890d75_1766762202777_46671b2d.jpg";
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

interface Product {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  specs: { label: string; value: string }[];
  price: number;
  priceUnit: string;
  image: string;
}

const AppLayout: React.FC = () => {
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

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // Products data
  const products: Product[] = [
    {
      id: 1,
      tag: "Ready for Dispatch",
      tagColor: "bg-emerald-500",
      title: "Cavendish Banana (G9)",
      specs: [
        { label: "Height", value: "15-20cm" },
        { label: "Age", value: "Hardened 4 weeks" },
        { label: "Tray Size", value: "50/tray" }
      ],
      price: 2.50,
      priceUnit: "/plant",
      image: PRODUCT_IMAGES.banana
    },
    {
      id: 2,
      tag: "Limited Stock",
      tagColor: "bg-amber-500",
      title: "Aloe Vera Offshoots",
      specs: [
        { label: "Height", value: "10-15cm" },
        { label: "Age", value: "Hardened 6 weeks" },
        { label: "Tray Size", value: "72/tray" }
      ],
      price: 1.75,
      priceUnit: "/plant",
      image: PRODUCT_IMAGES.aloe
    },
    {
      id: 3,
      tag: "New Arrival",
      tagColor: "bg-lime-500",
      title: "Strawberry Runners",
      specs: [
        { label: "Height", value: "8-12cm" },
        { label: "Age", value: "Hardened 3 weeks" },
        { label: "Tray Size", value: "100/tray" }
      ],
      price: 0.95,
      priceUnit: "/plant",
      image: PRODUCT_IMAGES.strawberry
    }
  ];

  // Process steps
  const processSteps = [
    {
      icon: FlaskConical,
      title: "Tissue Culture Lab",
      description: "Sterile propagation from disease-free mother stock"
    },
    {
      icon: Sun,
      title: "Hardening Phase",
      description: "Gradual acclimatization to outdoor conditions"
    },
    {
      icon: Sprout,
      title: "Field Ready",
      description: "Robust plants ready for commercial planting"
    }
  ];

  // Tech specs
  const techSpecs = [
    {
      icon: Microscope,
      title: "Virus-Free Certified",
      description: "Every batch tested via ELISA & PCR protocols"
    },
    {
      icon: Shield,
      title: "98% Survival Rate",
      description: "Industry-leading establishment success"
    },
    {
      icon: Sprout,
      title: "Uniform Growth",
      description: "Consistent genetics for predictable yields"
    }
  ];

  // Scroll handler for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load cart from database when user logs in
  useEffect(() => {
    if (user) {
      loadCart().then((savedCart) => {
        if (savedCart.length > 0) {
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

  // Add to cart function
  const addToCart = (product: Product) => {
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
    setTimeout(() => setAddedToCart(null), 1500);
  };

  // Remove from cart
  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  // Cart total
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Newsletter submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setNewsletterSubmitted(true);
      setEmail('');
      setTimeout(() => setNewsletterSubmitted(false), 3000);
    }
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
        signUp={signUp}
        signIn={signIn}
        resetPassword={resetPassword}
      />

      {/* User Dashboard */}
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

      {/* Sticky Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Nasholi
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('varieties')}
                className={`text-sm font-medium transition-colors hover:text-emerald-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                Varieties
              </button>
              <button 
                onClick={() => scrollToSection('process')}
                className={`text-sm font-medium transition-colors hover:text-emerald-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                Lab Protocols
              </button>
              <button 
                onClick={() => scrollToSection('shop')}
                className={`text-sm font-medium transition-colors hover:text-emerald-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                Shop
              </button>
            </div>

            {/* Cart, Auth & Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Auth Button */}
              {authLoading ? (
                <div className={`w-10 h-10 rounded-xl animate-pulse ${isScrolled ? 'bg-gray-200' : 'bg-white/20'}`} />
              ) : user ? (
                <button
                  onClick={() => setShowDashboard(true)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                    isScrolled 
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">
                    {profile?.full_name?.split(' ')[0] || 'Account'}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isScrolled 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign In</span>
                </button>
              )}

              {/* Cart Button */}
              <div className="relative">
                <button
                  onClick={() => setShowCartDropdown(!showCartDropdown)}
                  className={`relative p-2 rounded-xl transition-all ${
                    isScrolled 
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Cart Dropdown */}
                {showCartDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900">Your Cart</h3>
                    </div>
                    {cartItems.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Your cart is empty</p>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-64 overflow-y-auto">
                          {cartItems.map(item => (
                            <div key={item.id} className="p-4 flex items-center gap-3 border-b border-gray-50">
                              <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                                >
                                  -
                                </button>
                                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 bg-gray-50">
                          <div className="flex justify-between mb-3">
                            <span className="text-gray-600">Total</span>
                            <span className="font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
                          </div>
                          {user ? (
                            <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors">
                              Checkout
                            </button>
                          ) : (
                            <button 
                              onClick={() => { setShowCartDropdown(false); setShowAuthModal(true); }}
                              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors"
                            >
                              Sign In to Checkout
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-xl ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => scrollToSection('varieties')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl"
              >
                Varieties
              </button>
              <button
                onClick={() => scrollToSection('process')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl"
              >
                Lab Protocols
              </button>
              <button
                onClick={() => scrollToSection('shop')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl"
              >
                Shop
              </button>
              {!user && (
                <button
                  onClick={() => { setMobileMenuOpen(false); setShowAuthModal(true); }}
                  className="block w-full text-left px-4 py-3 text-emerald-600 hover:bg-emerald-50 rounded-xl font-medium"
                >
                  Sign In / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={HERO_IMAGE} 
            alt="Tissue culture laboratory" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-300 text-sm font-medium">Now Shipping Nationwide</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Genetically Superior
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">
                Plant Stock.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl">
              Virus-indexed, hardened sucklings ready for field planting. 
              Lab-tested genetics for commercial growers who demand the best.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('shop')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/25"
              >
                Browse Cultivars
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('process')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm border border-white/20 transition-all"
              >
                <Play className="w-5 h-5" />
                Watch Our Process
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-white">2M+</p>
                <p className="text-gray-400 text-sm mt-1">Plants Delivered</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-white">98%</p>
                <p className="text-gray-400 text-sm mt-1">Survival Rate</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-white">50+</p>
                <p className="text-gray-400 text-sm mt-1">Varieties</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Tech Specs Section */}
      <section id="varieties" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Science-Backed Quality
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every plant leaves our facility with documented test results and guaranteed genetics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {techSpecs.map((spec, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <spec.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{spec.title}</h3>
                <p className="text-gray-600">{spec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Nursery - Commerce Section */}
      <section id="shop" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wider">The Nursery</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                Premium Plant Stock
              </h2>
              <p className="text-gray-600 mt-2 max-w-xl">
                Browse our selection of lab-tested, field-ready cultivars.
              </p>
            </div>
            <button className="mt-4 sm:mt-0 text-emerald-600 font-medium hover:text-emerald-700 inline-flex items-center gap-1">
              View All Varieties
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Tag */}
                  <span className={`absolute top-4 left-4 px-3 py-1 ${product.tagColor} text-white text-xs font-semibold rounded-full`}>
                    {product.tag}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{product.title}</h3>
                  
                  {/* Specs */}
                  <div className="space-y-2 mb-6">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-500">{spec.label}</span>
                        <span className="text-gray-900 font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      <span className="text-gray-500 text-sm">{product.priceUnit}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                        addedToCart === product.id
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/25'
                      }`}
                    >
                      {addedToCart === product.id ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Added!
                        </span>
                      ) : (
                        'Add Tray to Cart'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Banner */}
          <div className="mt-12 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Free Shipping on Orders Over $500</h3>
                <p className="text-white/80 text-sm">Temperature-controlled delivery to ensure plant health</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              From Lab to Field
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              A rigorous three-stage process ensures every plant meets our exacting standards.
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-lime-500 to-emerald-500 -translate-y-1/2" />
            
            <div className="grid lg:grid-cols-3 gap-8 relative">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gray-800 rounded-2xl p-8 text-center hover:bg-gray-750 transition-colors border border-gray-700">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-emerald-500 text-white font-bold rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-lime-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-2">
                      <step.icon className="w-8 h-8 text-emerald-400" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/25">
              Download Lab Protocols
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-lime-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Harvest Tips & Updates
            </h2>
            <p className="text-gray-600 mb-8">
              Get expert cultivation advice, new variety announcements, and exclusive offers delivered to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {newsletterSubmitted && (
              <div className="mt-4 flex items-center justify-center gap-2 text-emerald-600">
                <CheckCircle className="w-5 h-5" />
                <span>Thanks for subscribing!</span>
              </div>
            )}

            <p className="text-gray-500 text-sm mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Nasholi</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Premium tissue culture plants for commercial growers. Science-backed genetics, field-ready results.
              </p>
              <div className="flex gap-3">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-emerald-500 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <span className="text-gray-400 hover:text-white text-xs uppercase">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['All Varieties', 'New Arrivals', 'Best Sellers', 'Bulk Orders'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Our Lab', 'Careers', 'Press Kit'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  hello@nasholi.com
                </li>
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span>123 Greenhouse Lane<br />Agritech Valley, CA 94025</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Nasholi Agritech. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Shipping Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Click outside to close cart dropdown */}
      {showCartDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowCartDropdown(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;
