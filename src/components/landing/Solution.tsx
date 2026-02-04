import React from 'react';
import { Microscope, Activity, HeartHandshake } from 'lucide-react';

export const Solution = () => {
    return (
        <section className="py-16 md:py-24 bg-[hsl(var(--cream-bg))]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-[hsl(var(--accent-orange))] font-bold uppercase tracking-wider text-sm">Our Solution</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-[hsl(var(--dark-green))] mt-3 mb-6 font-serif">
                        A Simple, Integrated Solution Built for Farmers
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        We don't just sell seeds; we provide a complete ecosystem for success.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Pillar 1 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                        <div className="w-16 h-16 bg-[hsl(var(--dark-green))] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                            <Microscope size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-[hsl(var(--dark-green))] mb-4">
                            Disease-Free, Climate-Resilient Seedlings
                        </h3>
                        <p className="text-gray-600">
                            Quality planting materials produced under controlled sterile conditions to ensure high survival rates and maximum yield.
                        </p>
                    </div>

                    {/* Pillar 2 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                        <div className="w-16 h-16 bg-[hsl(var(--dark-green))] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                            <Activity size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-[hsl(var(--dark-green))] mb-4">
                            Affordable Soil Intelligence
                        </h3>
                        <p className="text-gray-600">
                            Practical soil diagnostics translated into clear, actionable advice. We tell farmers exactly what their soil needs.
                        </p>
                    </div>

                    {/* Pillar 3 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                        <div className="w-16 h-16 bg-[hsl(var(--dark-green))] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                            <HeartHandshake size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-[hsl(var(--dark-green))] mb-4">
                            Accessible Farmer Advisory
                        </h3>
                        <p className="text-gray-600">
                            Guidance via SMS, voice, and trained field agents. No barriers—just simple, timely advice throughout the season.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[hsl(var(--dark-green))] font-medium border border-[hsl(var(--dark-green))]/20">
                        <span className="font-bold">The Result:</span>
                        <span>Higher yield, lower risk, less waste.</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
