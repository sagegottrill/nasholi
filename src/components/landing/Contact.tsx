import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Contact = () => {
    return (
        <section className="py-12 md:py-20 bg-[hsl(var(--cream-bg))]">
            <div className="container mx-auto px-6">
                <h2 className="text-center text-3xl font-bold text-[hsl(var(--dark-green))] mb-12">Responsive Contact</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card 1: Image Left, Content Right */}
                    <div className="md:col-span-2 bg-white rounded-3xl p-2 flex overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-1/3 relative">
                            <img
                                src="/nigerian-agronomist.png"
                                alt="Nigerian Agronomy Team"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                        <div className="w-2/3 p-6 flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-[hsl(var(--dark-green))] mb-2">Grower Support</h3>
                            <p className="text-sm text-gray-500 mb-4">Our agronomy team in Lagos & Abuja is ready to assist with planting schedules and soil prep.</p>
                            <div className="flex items-center gap-2 text-[hsl(var(--primary))] font-medium cursor-pointer">
                                <Phone size={18} />
                                <span>+234 800 NASHOLI</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Vertical */}
                    <div className="bg-[hsl(var(--dark-green))] rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--primary))] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                <MapPin className="text-[hsl(var(--accent-orange))]" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Visit Our Farm</h3>
                            <p className="text-gray-300 text-sm mb-6">Km 12, Lagos-Ibadan Expressway, Ogun State.</p>
                            <button className="w-full py-3 bg-[hsl(var(--accent-orange))] rounded-xl font-semibold hover:bg-white hover:text-[hsl(var(--dark-green))] transition-all">
                                Get Directions
                            </button>
                        </div>
                    </div>

                    {/* Card 3: Testimonial/Large Image */}
                    <div className="md:col-span-3 bg-[hsl(var(--primary))] rounded-3xl p-4 flex overflow-hidden shadow-md mt-4">
                        <div className="flex flex-col md:flex-row items-center w-full">
                            <div className="md:w-2/3 p-6">
                                <h3 className="text-2xl font-serif font-bold mb-4 text-white">Trusted by Nigerian Farmers</h3>
                                <blockquote className="text-lg italic text-[hsl(var(--cream-bg))]/90 mb-6">
                                    "We switched to Nasholi's tissue culture plantlets last planting season. The survival rate was over 98%, and our harvest in Kano was significantly better than previous years. Truly world-class quality."
                                </blockquote>
                                <div className="flex items-center gap-4 text-white">
                                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--cream-bg))] flex items-center justify-center text-[hsl(var(--dark-green))] font-bold text-lg border-2 border-[hsl(var(--accent-orange))]">
                                        AM
                                    </div>
                                    <div>
                                        <p className="font-bold">Alhaji Musa Ibrahim</p>
                                        <p className="text-sm text-[hsl(var(--accent-orange))]">CEO, Green Belt Farms, Kano</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/3 relative h-64 md:h-full w-full">
                                <img
                                    src="/nigerian-harvest.png"
                                    alt="Farm field"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
