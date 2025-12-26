import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
    return (
        <section className="relative min-h-[90vh] bg-[hsl(var(--dark-green))] text-[hsl(var(--cream-bg))] overflow-hidden flex items-center">
            <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-6">
                    {/* Badge Removed */}

                    <h1 className="text-4xl md:text-7xl font-bold leading-tight font-sans">
                        Garde Agriculture <br />
                        <span className="text-[hsl(var(--accent-orange))]">for your allforms</span>
                    </h1>

                    <p className="text-base md:text-xl text-gray-300 max-w-lg leading-relaxed">
                        Premium genetically superior plant stock for commercial growers.
                        Virus-indexed, hardened, and field-ready.
                    </p>

                    <button
                        onClick={onShopClick}
                        className="group px-6 py-3 md:px-8 md:py-4 bg-[hsl(var(--accent-orange))] text-white font-semibold rounded-full hover:bg-[hsl(var(--accent-orange))]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 text-sm md:text-base"
                    >
                        Explore Varieties
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Hero Image */}
                <div className="relative h-[600px] hidden md:block">
                    {/* Abstract shape background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[hsl(var(--primary))]/20 rounded-full blur-3xl" />

                    <img
                        src="/hero-lab.png"
                        alt="Nigerian Scientists in Tissue Culture Lab"
                        className="relative w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-[hsl(var(--primary))]/30"
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 0% 100%)' }} // Custom shape style
                    />
                </div>
            </div>

            {/* Curve Separator */}
            <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] fill-[hsl(var(--cream-bg))]">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
                </svg>
            </div>
        </section>
    );
};
