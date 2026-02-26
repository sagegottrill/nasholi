import React from 'react';
import { AlertTriangle, Sprout, TestTubes, Users } from 'lucide-react';

export const Problem = () => {
    return (
        <section className="py-14 md:py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--dark-green))] mb-4 font-serif">
                        The Productivity Gap Holding African Agriculture Back
                    </h2>
                    <p className="text-gray-600 text-base">
                        Despite hard work, smallholder farmers face systemic barriers that limit their potential and threaten food security.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-white border border-[hsl(var(--dark-green))]/10 hover:border-[hsl(var(--accent-orange))] transition-colors group">
                        <div className="w-11 h-11 bg-[hsl(var(--cream-bg))] rounded-full flex items-center justify-center mb-5 text-[hsl(var(--dark-green))] group-hover:bg-[hsl(var(--accent-orange))] group-hover:text-white transition-colors">
                            <Sprout size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-[hsl(var(--dark-green))] mb-2">
                            Infected Planting Materials
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Most smallholder farmers rely on traditional, infected seeds or suckers, leading to disease spread and yields up to 60% below potential.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[hsl(var(--dark-green))]/10 hover:border-[hsl(var(--accent-orange))] transition-colors group">
                        <div className="w-11 h-11 bg-[hsl(var(--cream-bg))] rounded-full flex items-center justify-center mb-5 text-[hsl(var(--dark-green))] group-hover:bg-[hsl(var(--accent-orange))] group-hover:text-white transition-colors">
                            <TestTubes size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-[hsl(var(--dark-green))] mb-2">
                            Blind Farming (No Soil Data)
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Soil health is rarely tested. Farmers apply wrong fertilizers, wasting money and degrading land without achieving desired growth.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[hsl(var(--dark-green))]/10 hover:border-[hsl(var(--accent-orange))] transition-colors group">
                        <div className="w-11 h-11 bg-[hsl(var(--cream-bg))] rounded-full flex items-center justify-center mb-5 text-[hsl(var(--dark-green))] group-hover:bg-[hsl(var(--accent-orange))] group-hover:text-white transition-colors">
                            <Users size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-[hsl(var(--dark-green))] mb-2">
                            Lack of Expert Advisory
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Professional agronomy support is inaccessible or unaffordable. Farmers lack trust in complex agritech tools that don't speak their language.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
