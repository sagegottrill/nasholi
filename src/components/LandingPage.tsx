import React, { useState, useEffect } from 'react';
import { Hero } from './landing/Hero';
import { Problem } from './landing/Problem';
import { Solution } from './landing/Solution';
import { HowItWorks } from './landing/HowItWorks';
import { Impact } from './landing/Impact';
import { Services } from './landing/Services'; // This is now Product Categories
import { Contact } from './landing/Contact';
import { ArrowUp, Menu, X, User, Mail, Phone, MapPin } from 'lucide-react';
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
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[hsl(var(--cream-bg))]/95 backdrop-blur-md shadow-sm py-2' : 'bg-[hsl(var(--cream-bg))] py-3'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center relative">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img
                            src="/Nash.png"
                            alt="Nasholi Logo"
                            className="h-10 md:h-14 w-auto object-contain"
                        />
                    </div>

                    {/* Desk Menu */}
                    <div className={`hidden md:flex items-center gap-6 text-[hsl(var(--dark-green))]`}>
                        <button onClick={() => scrollToSection('problem')} className="text-sm hover:text-[hsl(var(--accent-orange))] transition-colors font-semibold">The Problem</button>
                        <button onClick={() => scrollToSection('solution')} className="text-sm hover:text-[hsl(var(--accent-orange))] transition-colors font-semibold">Our Solution</button>
                        <button onClick={() => scrollToSection('impact')} className="text-sm hover:text-[hsl(var(--accent-orange))] transition-colors font-semibold">Impact</button>
                        <button onClick={() => scrollToSection('products')} className="text-sm hover:text-[hsl(var(--accent-orange))] transition-colors font-semibold">Products</button>
                        <button onClick={() => scrollToSection('contact')} className="text-sm hover:text-[hsl(var(--accent-orange))] transition-colors font-semibold">Contact</button>
                        {user && (
                            <button className="text-sm hover:text-[hsl(var(--accent-orange))] transition-colors font-semibold">History</button>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <button
                                onClick={() => setShowDashboard(true)}
                                className="w-9 h-9 rounded-full bg-[hsl(var(--accent-orange))] text-white flex items-center justify-center font-bold text-sm"
                            >
                                {profile?.full_name?.[0] || <User size={16} />}
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))]/90`}
                            >
                                Get Started
                            </button>
                        )}

                        <button
                            className="md:hidden text-gray-500"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg p-5 flex flex-col gap-3 md:hidden border-t">
                        <button onClick={() => scrollToSection('problem')} className="text-left py-2 text-sm font-medium border-b">The Problem</button>
                        <button onClick={() => scrollToSection('solution')} className="text-left py-2 text-sm font-medium border-b">Our Solution</button>
                        <button onClick={() => scrollToSection('impact')} className="text-left py-2 text-sm font-medium border-b">Impact</button>
                        <button onClick={() => scrollToSection('products')} className="text-left py-2 text-sm font-medium border-b">Products</button>
                        <button onClick={() => scrollToSection('contact')} className="text-left py-2 text-sm font-medium border-b">Contact</button>
                        <button onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false); }} className="text-left py-2 text-sm text-[hsl(var(--primary))] font-bold">Sign In</button>
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

                <div id="impact">
                    <Impact />
                </div>

                <div id="products">
                    <Services onOpenContact={() => scrollToSection('contact')} />
                </div>

                <div id="contact">
                    <Contact />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[hsl(var(--dark-green))] text-[hsl(var(--cream-bg))]">
                <div className="container mx-auto px-6 py-14">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <img
                                src="/white%20logo.png"
                                alt="Nasholi Logo"
                                className="h-12 w-auto object-contain mb-4"
                            />
                            <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
                                Empowering smallholder farmers with disease-free planting materials, soil intelligence, and smart advisory.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[hsl(var(--accent-orange))]">Navigate</h4>
                            <ul className="space-y-2.5">
                                <li><button onClick={() => scrollToSection('problem')} className="text-sm text-gray-300 hover:text-white transition-colors">The Problem</button></li>
                                <li><button onClick={() => scrollToSection('solution')} className="text-sm text-gray-300 hover:text-white transition-colors">Our Solution</button></li>
                                <li><button onClick={() => scrollToSection('impact')} className="text-sm text-gray-300 hover:text-white transition-colors">Impact</button></li>
                                <li><button onClick={() => scrollToSection('products')} className="text-sm text-gray-300 hover:text-white transition-colors">Products</button></li>
                                <li><button onClick={() => scrollToSection('contact')} className="text-sm text-gray-300 hover:text-white transition-colors">Contact</button></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[hsl(var(--accent-orange))]">Contact</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2.5 text-sm text-gray-300">
                                    <MapPin size={16} className="mt-0.5 shrink-0 text-[hsl(var(--accent-orange))]" />
                                    <span>Km 12, Lagos-Ibadan Expressway,<br />Ogun State, Nigeria</span>
                                </li>
                                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                                    <Phone size={16} className="shrink-0 text-[hsl(var(--accent-orange))]" />
                                    <span>+234 800 NASHOLI</span>
                                </li>
                                <li className="flex items-center gap-2.5 text-sm text-gray-300">
                                    <Mail size={16} className="shrink-0 text-[hsl(var(--accent-orange))]" />
                                    <span>info@nasholi.com</span>
                                </li>
                            </ul>
                        </div>

                        {/* Social / CTA */}
                        <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[hsl(var(--accent-orange))]">Stay Connected</h4>
                            <p className="text-sm text-gray-300 mb-4">Follow us for tips, news, and farm updates.</p>
                            <div className="flex gap-3">
                                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[hsl(var(--accent-orange))] flex items-center justify-center transition-colors" aria-label="Twitter / X">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[hsl(var(--accent-orange))] flex items-center justify-center transition-colors" aria-label="LinkedIn">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[hsl(var(--accent-orange))] flex items-center justify-center transition-colors" aria-label="Facebook">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[hsl(var(--accent-orange))] flex items-center justify-center transition-colors" aria-label="Instagram">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                        <p className="text-xs text-gray-400">&copy; 2024 Nasholi Agriculture. All rights reserved.</p>
                        <div className="flex gap-5">
                            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Scroll to Top */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 w-10 h-10 bg-[hsl(var(--accent-orange))] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                    }`}
            >
                <ArrowUp size={18} />
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
