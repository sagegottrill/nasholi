import React, { useState, useEffect } from 'react';
import { Hero } from './landing/Hero';
import { Problem } from './landing/Problem';
import { Solution } from './landing/Solution';
import { HowItWorks } from './landing/HowItWorks';
import { Services } from './landing/Services'; // This is now Product Categories
import { Contact } from './landing/Contact';
import { ArrowUp, Menu, X, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';
import UserDashboard from '@/components/UserDashboard';

const LandingPage = () => {
    const {
        user,
        profile,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateProfile,
        getOrders,
        getPaymentMethods,
        addPaymentMethod,
        deletePaymentMethod,
        setDefaultPaymentMethod
    } = useAuth();

    const [isScrolled, setIsScrolled] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen font-sans bg-[hsl(var(--cream-bg))] text-[hsl(var(--foreground))]">

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[hsl(var(--cream-bg))]/95 backdrop-blur-md shadow-sm py-4' : 'bg-[hsl(var(--cream-bg))] py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center relative">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img
                            src="/Nash.png"
                            alt="Nasholi Logo"
                            className="h-12 w-auto object-contain"
                        />
                    </div>

                    {/* Desk Menu */}
                    <div className={`hidden md:flex items-center gap-8 text-[hsl(var(--dark-green))]`}>
                        <button onClick={() => scrollToSection('problem')} className="hover:text-[hsl(var(--accent-orange))] transition-colors font-medium">The Problem</button>
                        <button onClick={() => scrollToSection('solution')} className="hover:text-[hsl(var(--accent-orange))] transition-colors font-medium">Our Solution</button>
                        <button onClick={() => scrollToSection('products')} className="hover:text-[hsl(var(--accent-orange))] transition-colors font-medium">Products</button>
                        {user && (
                            <button className="hover:text-[hsl(var(--accent-orange))] transition-colors font-medium">History</button>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
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
                                className={`px-5 py-2 rounded-full font-semibold transition-all bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))]/90`}
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
                        <button onClick={() => scrollToSection('problem')} className="text-left py-2 border-b">The Problem</button>
                        <button onClick={() => scrollToSection('solution')} className="text-left py-2 border-b">Our Solution</button>
                        <button onClick={() => scrollToSection('products')} className="text-left py-2 border-b">Products</button>
                        <button onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false); }} className="text-left py-2 text-[hsl(var(--primary))] font-bold">Sign In</button>
                    </div>
                )}
            </nav>

            {/* Components Layering */}
            <main>
                <Hero onShopClick={() => scrollToSection('products')} />

                <div id="problem">
                    <Problem />
                </div>

                <div id="solution">
                    <Solution />
                </div>

                <div id="how-it-works">
                    <HowItWorks />
                </div>

                <div id="products">
                    <Services onOpenContact={() => scrollToSection('contact')} />
                </div>

                <div id="contact">
                    <Contact />
                </div>
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
