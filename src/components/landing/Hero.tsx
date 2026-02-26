import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
    return (
        <section className="relative min-h-[85vh] bg-[hsl(var(--dark-green))] text-[hsl(var(--cream-bg))] overflow-hidden flex items-center pt-20">
            <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-10 items-center">
                {/* Text Content */}
                <div className="space-y-5">
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight font-serif">
                        Empowering Farmers with <span className="text-[hsl(var(--accent-orange))]">Disease-Free Planting Materials</span> & Smart Advisory
                    </h1>

                    <p className="text-sm md:text-base text-gray-300 max-w-lg leading-relaxed">
                        Nasholi combines biotechnology, soil intelligence, and simple farmer advisory to help smallholder farmers increase yields, reduce losses, and build sustainable livelihoods.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            onClick={onShopClick}
                            className="group px-6 py-3 bg-[hsl(var(--accent-orange))] text-white font-semibold rounded-full hover:bg-[hsl(var(--accent-orange))]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
                        >
                            Partner with Us
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all text-sm">
                            Join the Farming Community
                        </button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative h-[450px] md:h-[520px] hidden md:block">
                    {/* Abstract shape background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[hsl(var(--primary))]/20 rounded-full blur-3xl" />

                    <img
                        src="/hero-lab.png"
                        alt="Nigerian Scientists in Tissue Culture Lab"
                        className="relative w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-[hsl(var(--primary))]/30"
                    />
                </div>
            </div>
        </section>
    );
};
