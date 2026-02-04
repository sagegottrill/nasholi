import React from 'react';
import { AlertTriangle, Sprout, TestTubes, Users } from 'lucide-react';

export const Problem = () => {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--dark-green))] mb-6 font-serif">
                        The Productivity Gap Holding African Agriculture Back
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Despite hard work, smallholder farmers face systemic barriers that limit their potential and threaten food security.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-white border border-[hsl(var(--dark-green))]/10 hover:border-[hsl(var(--accent-orange))] transition-colors group">
                        <div className="w-12 h-12 bg-[hsl(var(--cream-bg))] rounded-full flex items-center justify-center mb-6 text-[hsl(var(--dark-green))] group-hover:bg-[hsl(var(--accent-orange))] group-hover:text-white transition-colors">
                            <Sprout size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-[hsl(var(--dark-green))] mb-3">
                            Infected Planting Materials
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Most smallholder farmers rely on traditional, infected seeds or suckers, leading to disease spread and yields up to 60% below potential.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-white border border-[hsl(var(--dark-green))]/10 hover:border-[hsl(var(--accent-orange))] transition-colors group">
                        <div className="w-12 h-12 bg-[hsl(var(--cream-bg))] rounded-full flex items-center justify-center mb-6 text-[hsl(var(--dark-green))] group-hover:bg-[hsl(var(--accent-orange))] group-hover:text-white transition-colors">
                            <TestTubes size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-[hsl(var(--dark-green))] mb-3">
                            Blind Farming (No Soil Data)
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Soil health is rarely tested. Farmers apply wrong fertilizers, wasting money and degrading land without achieving desired growth.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-white border border-[hsl(var(--dark-green))]/10 hover:border-[hsl(var(--accent-orange))] transition-colors group">
                        <div className="w-12 h-12 bg-[hsl(var(--cream-bg))] rounded-full flex items-center justify-center mb-6 text-[hsl(var(--dark-green))] group-hover:bg-[hsl(var(--accent-orange))] group-hover:text-white transition-colors">
                            <Users size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-[hsl(var(--dark-green))] mb-3">
                            Lack of Expert Advisory
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Professional agronomy support is inaccessible or unaffordable. Farmers lack trust in complex agritech tools that don't speak their language.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
