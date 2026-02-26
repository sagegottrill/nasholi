import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Impact = () => {
    return (
        <section className="py-14 md:py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
                    {/* Image Column */}
                    <div className="w-full md:w-1/2 relative">
                        {/* Decorative Background blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[hsl(var(--primary))]/10 rounded-full blur-3xl -z-10" />

                        <div className="relative rounded-2xl overflow-visible shadow-2xl border-2 border-white">
                            <img
                                src="/nashor.jpeg"
                                alt="Farmer using Nasholi Smart Controller for Solar Irrigation"
                                className="w-full h-auto object-cover rounded-2xl transform hover:scale-[1.02] transition-transform duration-700"
                            />
                            {/* Overlay Badge */}
                            <div className="absolute -bottom-4 left-5 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-[hsl(var(--primary))]/20 flex items-center gap-3">
                                <div className="w-10 h-10 bg-[hsl(var(--accent-orange))] rounded-full flex items-center justify-center text-white shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Increased Yield</p>
                                    <p className="text-lg font-bold text-[hsl(var(--dark-green))]">Up to 60%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full md:w-1/2 space-y-6 mt-6 md:mt-0">
                        <div>
                            <span className="text-[hsl(var(--accent-orange))] font-bold uppercase tracking-wider text-xs">Real Impact</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--dark-green))] mt-2 mb-4 font-serif leading-tight">
                                Smart Irrigation That Works For You
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Our solar-powered smart controllers take the guesswork out of farming. By delivering the exact amount of water and nutrients your crops need, when they need it, we help you maximize yields while conserving vital resources.
                            </p>
                        </div>

                        <ul className="space-y-3">
                            {[
                                "Automated climate-resilient watering schedules",
                                "Solar-powered for continuous reliable operation",
                                "Reduces water waste and fertilizer runoff",
                                "Easy-to-use interface built for everyday farmers"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                                    <span className="text-gray-700 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-2">
                            <button className="group px-6 py-3 bg-[hsl(var(--dark-green))] text-white font-semibold rounded-full hover:bg-[hsl(var(--primary))] transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-sm">
                                See It In Action
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
