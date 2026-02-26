import React from 'react';
import { Microscope, Activity, HeartHandshake } from 'lucide-react';

export const Solution = () => {
    return (
        <section className="py-14 md:py-20 bg-[hsl(var(--cream-bg))]">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <span className="text-[hsl(var(--accent-orange))] font-bold uppercase tracking-wider text-xs">Our Solution</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--dark-green))] mt-2 mb-4 font-serif">
                        A Simple, Integrated Solution Built for Farmers
                    </h2>
                    <p className="text-gray-600 text-base max-w-2xl mx-auto">
                        We don't just sell seeds; we provide a complete ecosystem for success.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Pillar 1 */}
                    <div className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                        <div className="w-14 h-14 bg-[hsl(var(--dark-green))] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                            <Microscope size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-[hsl(var(--dark-green))] mb-3">
                            Disease-Free, Climate-Resilient Seedlings
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Quality planting materials produced under controlled sterile conditions to ensure high survival rates and maximum yield.
                        </p>
                    </div>

                    {/* Pillar 2 */}
                    <div className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                        <div className="w-14 h-14 bg-[hsl(var(--dark-green))] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                            <Activity size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-[hsl(var(--dark-green))] mb-3">
                            Affordable Soil Intelligence
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Practical soil diagnostics translated into clear, actionable advice. We tell farmers exactly what their soil needs.
                        </p>
                    </div>

                    {/* Pillar 3 */}
                    <div className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                        <div className="w-14 h-14 bg-[hsl(var(--dark-green))] rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                            <HeartHandshake size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-[hsl(var(--dark-green))] mb-3">
                            Accessible Farmer Advisory
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Guidance via SMS, voice, and trained field agents. No barriers—just simple, timely advice throughout the season.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[hsl(var(--dark-green))] font-medium border border-[hsl(var(--dark-green))]/20 text-sm">
                        <span className="font-bold">The Result:</span>
                        <span>Higher yield, lower risk, less waste.</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
